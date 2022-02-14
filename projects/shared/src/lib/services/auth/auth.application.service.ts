import { ChangeEmailError, ChangePasswordError, ResetPasswordError, SignInError, SignUpError } from './auth.errors';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  updateProfile,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Account, User } from '@local/common';
import { LoadingDialogService } from 'ng-loading-dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthApplicationService {
  constructor(
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
    private auth: Auth,
    private authService: AuthService,
    private loadingDialog: LoadingDialogService,
  ) {}

  providerOption(option: 'google' | 'facebook') {
    switch (option) {
      case 'google':
        return new GoogleAuthProvider();
      case 'facebook':
        return new FacebookAuthProvider();
    }
  }

  async signup(
    data: { type: 'email'; name: string; email: string; password: string } | { type: 'google' } | { type: 'facebook' },
    name: string,
  ) {
    const firstDialogRef = this.loadingDialog.open('サインアップしています');

    try {
      await this.authService.signUp(
        async (iUser) =>
          new User(
            {
              ...iUser,
            },
            iUser.created_at,
            iUser.updated_at,
          ),
        async (iAccount) =>
          new Account(
            {
              ...iAccount,
              image_url: this.auth.currentUser?.photoURL || '',
              name: name,
            },
            iAccount.created_at,
            iAccount.updated_at,
          ),
        data.type == 'email'
          ? {
              email: data.email,
              password: data.password,
            }
          : this.providerOption(data.type),
      );
    } catch (error) {
      switch ((error as SignUpError).code) {
        case 'auth/popup-blocked':
        case 'auth/popup-closed-by-user':
          break;
        case 'ext/existing-user-signup':
          this.snackBar.open('すでに登録しています。サインアップではなくサインインしてください。', undefined, { duration: 6000 });
          break;
        case 'auth/invalid-email':
          this.snackBar.open('無効なメールアドレスです。', undefined, {
            duration: 6000,
          });
          break;
        case 'auth/email-already-in-use':
          this.snackBar.open('すでに使用されているメールアドレスです。', undefined, {
            duration: 6000,
          });
          break;
        default:
          this.snackBar.open('エラーが発生しました', undefined, {
            duration: 6000,
          });
          break;
      }
      return;
    } finally {
      updateProfile(this.auth.currentUser!, { displayName: name });
      firstDialogRef.close();
    }

    const SecondDialogRef = this.loadingDialog.open('アカウントを確認するためのメールを送信しています');
    try {
      await sendEmailVerification(this.auth.currentUser!);
    } catch (error) {
      switch ((error as ResetPasswordError).code) {
        case 'auth/user-not-found':
          this.snackBar.open('登録されていないユーザーです。', undefined, {
            duration: 6000,
          });
          break;
        case 'auth/wrong-password':
          this.snackBar.open('パスワードが間違っています', undefined, {
            duration: 6000,
          });
          break;
        case 'auth/invalid-email':
          this.snackBar.open('無効なメールアドレスです。', undefined, {
            duration: 6000,
          });
          break;
      }
    } finally {
      SecondDialogRef.close();
    }

    this.location.back();
  }

  async signin(data: { type: 'email'; email: string; password: string } | { type: 'google' } | { type: 'facebook' }) {
    const dialogRef = this.loadingDialog.open('サインインしています');

    try {
      switch (data.type) {
        case 'email':
          await this.authService.signIn({
            email: data.email,
            password: data.password,
          });
          break;
        default:
          await this.authService.signIn(this.providerOption(data.type));
          break;
      }
    } catch (error) {
      switch ((error as SignInError).code) {
        case 'auth/popup-blocked':
          this.snackBar.open('ポップアップがブロックされています。', undefined, {
            duration: 6000,
          });
          break;
        case 'auth/popup-closed-by-user':
          break;
        case 'auth/user-not-found':
        case 'ext/user-not-found':
          this.snackBar.open('登録されていないユーザーはサインインできません。サインアップ（新規登録）してください。', undefined, {
            duration: 6000,
          });
          break;
        case 'auth/wrong-password':
          this.snackBar.open('パスワードが間違っています', undefined, {
            duration: 6000,
          });
          break;
        default:
          this.snackBar.open('エラーが発生しました', undefined, {
            duration: 6000,
          });
          break;
      }

      return;
    } finally {
      dialogRef.close();
    }

    await this.router.navigate(['']);
  }

  async signOut() {
    await this.auth.signOut();
    this.snackBar.open('サインアウトしました', undefined, { duration: 6000 });
    await this.router.navigate(['']);
  }

  async resetPassword(email: string) {
    const dialogRef = this.loadingDialog.open('パスワードをリセットするためのメールを送信しています');

    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      switch ((error as ResetPasswordError).code) {
        case 'auth/user-not-found':
          this.snackBar.open('登録されていないユーザーです。', undefined, {
            duration: 6000,
          });
          break;
        case 'auth/wrong-password':
          this.snackBar.open('パスワードが間違っています', undefined, {
            duration: 6000,
          });
          break;
        case 'auth/invalid-email':
          this.snackBar.open('無効なメールアドレスです。', undefined, {
            duration: 6000,
          });
          break;
      }
    } finally {
      dialogRef.close();
    }
  }

  async changeEmail(email: string) {
    const dialogRef = this.loadingDialog.open('メールアドレスを変更しています');
    try {
      await updateEmail(this.auth.currentUser!, email);
    } catch (error) {
      switch ((error as ChangeEmailError).code) {
        case 'auth/invalid-email':
          this.snackBar.open('無効なメールアドレスです。', undefined, {
            duration: 6000,
          });
          break;
        case 'auth/email-already-in-use':
          this.snackBar.open('既に使用されているメールアドレスです。', undefined, {
            duration: 6000,
          });
          break;
        case 'auth/requires-recent-login':
          this.snackBar.open('最近使用されていないアドレスであるため、拒否されました。', undefined, {
            duration: 6000,
          });
          break;
      }
    } finally {
      dialogRef.close();
    }
  }

  async changePassword(password: string) {
    const dialogRef = this.loadingDialog.open('パスワードを変更しています');

    try {
      await updatePassword(this.auth.currentUser!, password);
    } catch (error) {
      switch ((error as ChangePasswordError).code) {
        case 'auth/requires-recent-login':
          this.snackBar.open('最近使用されていないアドレスであるため、拒否されました。', undefined, {
            duration: 6000,
          });
          break;
      }
    } finally {
      dialogRef.close();
    }
  }

  async convertUserToAdmin(accountID: string, userID: string) {
    let dialogRef = this.loadingDialog.open('アカウントを管理者に変更しています');

    try {
      //未実装
    } catch {
      this.snackBar.open('エラーが発生しました', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('送信しました', undefined, {
      duration: 6000,
    });
  }

  async removeUserOfAccount(accountID: string, userID: string) {
    let dialogRef = this.loadingDialog.open('アカウントからユーザーを削除しています');

    try {
      await this.authService.removeUserOfAccount(accountID, userID);
    } catch {
      this.snackBar.open('エラーが発生しました。', undefined, {
        duration: 6000,
      });
      return;
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('送信しました', undefined, {
      duration: 6000,
    });
  }

  async leaveAccount(accountID: string) {
    let dialogRef = this.loadingDialog.open('アカウントを削除しています');

    try {
      //未実装
      throw Error;
    } catch {
      this.snackBar.open('アカウント削除は、当面の間、お問い合わせにより対応させていただきます。', undefined, {
        duration: 6000,
      });
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('送信しました', undefined, {
      duration: 6000,
    });

    await this.router.navigate(['user', 'settings', 'accounts']);
  }

  async deleteAccount(accountID: string) {
    let dialogRef = this.loadingDialog.open('アカウントを削除しています');

    try {
      //未実装
      throw Error;
    } catch {
      this.snackBar.open('アカウント削除は、当面の間、お問い合わせにより対応させていただきます。', undefined, {
        duration: 6000,
      });
    } finally {
      dialogRef.close();
    }

    this.snackBar.open('送信しました', undefined, {
      duration: 6000,
    });

    await this.router.navigate(['user', 'settings', 'accounts']);
  }
}
