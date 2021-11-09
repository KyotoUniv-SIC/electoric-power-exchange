import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { account } from "../accounts";
import { user } from "../users";

/**
 *
 * @param accountID
 * @param userID
 * @param isAdmin
 */
export async function validateAuth(
  accountID: string,
  userID?: string,
  isAdmin?: boolean
) {
  if (!userID) {
    throw new functions.https.HttpsError("unauthenticated", "unauthenticated");
  }
  const account_ = await account.get(accountID);

  if (isAdmin) {
    if (!account_.admin_user_ids.find((userID_) => userID_ === userID)) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "user is not in account"
      );
    }
    return;
  }

  if (!account_.user_ids.find((userID_) => userID_ === userID)) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "user is not in account"
    );
  }
}

/**
 * `auth_get_users`
 */
export const getUsers = functions.https.onCall(
  async (
    data: {
      account_id: string;
    },
    context
  ) => {
    try {
      await account.validateAuth(
        data.account_id,
        context.auth && context.auth.uid
      );

      const account_ = await account.get(data.account_id);

      const users: admin.auth.UserRecord[] = [];
      for (const userID of account_.user_ids) {
        users.push(await admin.auth().getUser(userID));
      }

      return users;
    } catch (e) {
      if (e instanceof functions.https.HttpsError) {
        throw e;
      }
      console.error(e);
      throw new functions.https.HttpsError("unknown", e.toString(), e);
    }
  }
);

/**
 * `auth_remove_user`
 */
export const removeUser = functions.https.onCall(
  async (
    data: {
      account_id: string;
      user_id: string;
    },
    context
  ) => {
    try {
      await validateAuth(
        data.account_id,
        context.auth && context.auth.uid,
        true
      );

      await account.update(data.account_id, {
        user_ids: admin.firestore.FieldValue.arrayRemove(data.user_id) as any,
        admin_user_ids: admin.firestore.FieldValue.arrayRemove(
          data.user_id
        ) as any,
      });

      await user.update(data.user_id, {
        account_ids_order: admin.firestore.FieldValue.arrayRemove(
          data.account_id
        ) as any,
      });
    } catch (e) {
      if (e instanceof functions.https.HttpsError) {
        throw e;
      }
      console.error(e);
      throw new functions.https.HttpsError("unknown", e.toString(), e);
    }
  }
);
