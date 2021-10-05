export class Session {
  login: boolean;

  constructor() {
    this.login = false;
  }

  reset(): Session {
    this.login = false;
    return this;
  }
}

export class Password {
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor() {
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }

  reset(): void {
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }
}
