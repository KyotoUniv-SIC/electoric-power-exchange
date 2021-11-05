import { AuthErrorCodes } from '@angular/fire/auth';

export type SignUpError = {
  code:
    | typeof AuthErrorCodes.EMAIL_EXISTS
    | typeof AuthErrorCodes.INVALID_EMAIL
    | typeof AuthErrorCodes.OPERATION_NOT_ALLOWED
    | typeof AuthErrorCodes.WEAK_PASSWORD
    | typeof AuthErrorCodes.MISSING_AUTH_DOMAIN
    | typeof AuthErrorCodes.EXPIRED_POPUP_REQUEST
    | typeof AuthErrorCodes.OPERATION_NOT_ALLOWED
    | typeof AuthErrorCodes.OPERATION_NOT_SUPPORTED
    | typeof AuthErrorCodes.POPUP_BLOCKED
    | typeof AuthErrorCodes.POPUP_CLOSED_BY_USER
    | typeof AuthErrorCodes.UNAUTHORIZED_DOMAIN
    | 'ext/existing-user-signup';
};

export type SignInError = {
  code:
    | typeof AuthErrorCodes.INVALID_EMAIL
    | typeof AuthErrorCodes.USER_DISABLED
    | typeof AuthErrorCodes.USER_DELETED
    | typeof AuthErrorCodes.INVALID_EMAIL
    | typeof AuthErrorCodes.INVALID_PASSWORD
    | typeof AuthErrorCodes.EXPIRED_POPUP_REQUEST
    | typeof AuthErrorCodes.OPERATION_NOT_ALLOWED
    | typeof AuthErrorCodes.OPERATION_NOT_SUPPORTED
    | typeof AuthErrorCodes.POPUP_BLOCKED
    | typeof AuthErrorCodes.POPUP_CLOSED_BY_USER
    | typeof AuthErrorCodes.UNAUTHORIZED_DOMAIN
    | 'ext/user-not-found';
};

export type ResetPasswordError = {
  code:
    | typeof AuthErrorCodes.USER_DELETED
    | typeof AuthErrorCodes.INVALID_EMAIL
    | typeof AuthErrorCodes.INVALID_PASSWORD;
};

export type ChangeEmailError = {
  code:
    | typeof AuthErrorCodes.INVALID_EMAIL
    | typeof AuthErrorCodes.EMAIL_EXISTS
    | typeof AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN
};

export type ChangePasswordError = {
  code: typeof AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN;
};
