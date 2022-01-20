import { AccountInfrastructureService } from '../accounts/account.infrastructure.service';
import { AccountService } from '../accounts/account.service';
import { AutoId } from '../auto-id';
import { UserInfrastructureService } from '../users/user.infrastructure.service';
import { UserService } from '../users/user.service';
import { IAccount } from './i-account.model';
import { IUser } from './i-user.model';
import { UserRecord } from './user-record';
import { Injectable } from '@angular/core';
import {
  Auth,
  user,
  AuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Firestore, runTransaction, doc, serverTimestamp, Timestamp, arrayUnion } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Account, User } from '@local/common';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authorized$: Observable<boolean>;
  userID$: Observable<string | undefined>;
  currentUser$: Observable<User | undefined>;
  currentAccount$: Observable<Account | undefined>;

  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore,
    private readonly functions: Functions,
    private readonly userService: UserService,
    private readonly accountService: AccountService,
    private readonly userInfrastructure: UserInfrastructureService,
    private readonly accountInfrastructure: AccountInfrastructureService,
  ) {
    const _user = user(this.auth);
    this.authorized$ = _user.pipe(map((user) => user !== null));
    this.userID$ = _user.pipe(map((user) => user?.uid));
    this.currentUser$ = this.userID$.pipe(mergeMap((userID) => (userID ? this.userService.get$(userID) : of(undefined))));
    this.currentAccount$ = this.currentUser$.pipe(
      map((user) => user?.current_account_id),
      mergeMap((currentAccountID) => this.accountService.get$(currentAccountID || '')),
    );
  }

  /**
   * @param userConverter
   * @param accountConverter
   * @param provider
   * @returns `Promise<UserCredential>`
   * @throws SignUpError
   */
  async signUp(
    userConverter: (iuser: IUser) => Promise<User>,
    accountConverter: (iAccount: IAccount) => Promise<Account>,
    provider:
      | (AuthProvider & {
          email?: undefined;
          password?: undefined;
        })
      | { email: string; password: string; providerId?: undefined },
  ): Promise<UserCredential> {
    let credential: UserCredential;

    if (provider.providerId === undefined) {
      // Email and password
      credential = await createUserWithEmailAndPassword(this.auth, provider.email, provider.password);
    } else {
      // Popup
      credential = await signInWithPopup(this.auth, provider);
    }

    if (credential.operationType != 'signIn') {
      // If this is not a first sign in (= not a sign up)
      await this.signOut();
      throw { code: 'ext/existing-user-signup' };
    }

    await runTransaction(this.firestore, async (t) => {
      const userID = credential.user?.uid || '';
      const accountID = AutoId();

      // Create User document on firestore
      const iUser: IUser = {
        id: userID,
        current_account_id: accountID,
        account_ids_order: [accountID],
        created_at: serverTimestamp() as Timestamp,
        updated_at: serverTimestamp() as Timestamp,
      };
      t.set(this.userInfrastructure.document(userID), await userConverter(iUser));

      // Create Account document on firestore
      const iAccount: IAccount = {
        id: accountID,
        user_ids: [userID],
        admin_user_ids: [userID],
        name: '',
        image_url: '',
        created_at: serverTimestamp() as Timestamp,
        updated_at: serverTimestamp() as Timestamp,
      };
      t.set(this.accountInfrastructure.document(accountID), await accountConverter(iAccount));
    });

    return credential;
  }

  /**
   * @param provider
   * @returns `Promise<UserCredential>`
   * @throws SignInError
   */
  async signIn(
    provider:
      | (AuthProvider & {
          email?: undefined;
          password?: undefined;
        })
      | { email: string; password: string; providerId?: undefined },
  ): Promise<UserCredential> {
    let credential: UserCredential;

    if (provider.providerId === undefined) {
      // Email and password
      credential = await signInWithEmailAndPassword(this.auth, provider.email, provider.password);
    } else {
      // Popup
      credential = await signInWithPopup(this.auth, provider);
    }

    if (credential.operationType !== 'signIn') {
      // If this is a first sign in (= a sign up)
      await this.auth.currentUser?.delete();
      throw { code: 'ext/user-not-found' };
    }

    return credential;
  }

  /**
   *
   */
  async signOut() {
    await this.auth.signOut();
  }

  /**
   *
   * @param userID
   * @param accountConverter
   * @returns
   */
  async createNewAccountOfUser(userID: string, accountConverter: (iAccount: IAccount) => Promise<Account>) {
    const now = serverTimestamp() as Timestamp;
    await runTransaction(this.firestore, async (t) => {
      const accountID = AutoId();

      // Add the new account id to the account ids list which the user has on firestore
      t.update(this.userInfrastructure.document(userID), {
        account_ids_order: arrayUnion(accountID),
        updated_at: now,
      });

      // Create Account document on firestore
      const iAccount: IAccount = {
        id: accountID,
        user_ids: [userID],
        admin_user_ids: [userID],
        name: '',
        image_url: '',
        created_at: serverTimestamp() as Timestamp,
        updated_at: serverTimestamp() as Timestamp,
      };
      t.set(this.accountInfrastructure.document(accountID), await accountConverter(iAccount));
    });
  }

  /**
   *
   * @param accountID
   * @returns
   */
  async getUsersOfAccount(accountID: string) {
    return await httpsCallable<
      {
        account_id: string;
      },
      UserRecord[]
    >(
      this.functions,
      'account_get_users',
    )({
      account_id: accountID,
    }).then((result) => result.data);
  }

  /**
   *
   * @param accountID
   * @param userID
   * @returns
   */
  async removeUserOfAccount(accountID: string, userID: string) {
    return await httpsCallable<
      {
        account_id: string;
        user_id: string;
      },
      void
    >(
      this.functions,
      'account_remove_user',
    )({
      account_id: accountID,
      user_id: userID,
    }).then((result) => result.data);
  }

  /**
   *
   * @param accountIDsOrder
   * @returns
   */
  async updateAccountIDsOrderOfUser(accountIDsOrder: string[]) {
    return await httpsCallable<
      {
        account_ids_order: string[];
      },
      void
    >(
      this.functions,
      'user_update_order',
    )({
      account_ids_order: accountIDsOrder,
    }).then((result) => result.data);
  }

  /**
   *
   * @param accountID
   * @returns
   */
  async setCurrentAccountOfUser(accountID: string) {
    return await httpsCallable<
      {
        current_account_id: string;
      },
      void
    >(
      this.functions,
      'user_update_order',
    )({
      current_account_id: accountID,
    }).then((result) => result.data);
  }
}
