import * as $protobuf from "protobufjs";
/** Namespace main. */
export namespace main {

    /** Properties of an AccountantAccount. */
    interface IAccountantAccount {

        /** AccountantAccount id */
        id?: (string|null);

        /** AccountantAccount name */
        name?: (string|null);

        /** AccountantAccount xrp_address */
        xrp_address?: (string|null);
    }

    /** Represents an AccountantAccount. */
    class AccountantAccount implements IAccountantAccount {

        /**
         * Constructs a new AccountantAccount.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IAccountantAccount);

        /** AccountantAccount id. */
        public id: string;

        /** AccountantAccount name. */
        public name: string;

        /** AccountantAccount xrp_address. */
        public xrp_address: string;

        /**
         * Encodes the specified AccountantAccount message. Does not implicitly {@link main.AccountantAccount.verify|verify} messages.
         * @param message AccountantAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IAccountantAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AccountantAccount message, length delimited. Does not implicitly {@link main.AccountantAccount.verify|verify} messages.
         * @param message AccountantAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IAccountantAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AccountantAccount message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountantAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.AccountantAccount;

        /**
         * Decodes an AccountantAccount message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AccountantAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.AccountantAccount;

        /**
         * Verifies an AccountantAccount message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AccountantAccount message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AccountantAccount
         */
        public static fromObject(object: { [k: string]: any }): main.AccountantAccount;

        /**
         * Creates a plain object from an AccountantAccount message. Also converts values to other types if specified.
         * @param message AccountantAccount
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.AccountantAccount, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AccountantAccount to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AccountPrivate. */
    interface IAccountPrivate {

        /** AccountPrivate id */
        id?: (string|null);

        /** AccountPrivate student_account_id */
        student_account_id?: (string|null);

        /** AccountPrivate xrp_seed */
        xrp_seed?: (string|null);

        /** AccountPrivate email */
        email?: (string|null);
    }

    /** Represents an AccountPrivate. */
    class AccountPrivate implements IAccountPrivate {

        /**
         * Constructs a new AccountPrivate.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IAccountPrivate);

        /** AccountPrivate id. */
        public id: string;

        /** AccountPrivate student_account_id. */
        public student_account_id: string;

        /** AccountPrivate xrp_seed. */
        public xrp_seed: string;

        /** AccountPrivate email. */
        public email: string;

        /**
         * Encodes the specified AccountPrivate message. Does not implicitly {@link main.AccountPrivate.verify|verify} messages.
         * @param message AccountPrivate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IAccountPrivate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AccountPrivate message, length delimited. Does not implicitly {@link main.AccountPrivate.verify|verify} messages.
         * @param message AccountPrivate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IAccountPrivate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AccountPrivate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountPrivate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.AccountPrivate;

        /**
         * Decodes an AccountPrivate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AccountPrivate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.AccountPrivate;

        /**
         * Verifies an AccountPrivate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AccountPrivate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AccountPrivate
         */
        public static fromObject(object: { [k: string]: any }): main.AccountPrivate;

        /**
         * Creates a plain object from an AccountPrivate message. Also converts values to other types if specified.
         * @param message AccountPrivate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.AccountPrivate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AccountPrivate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** AccountType enum. */
    enum AccountType {
        UNKNOWN = 0,
        ADMIN = 1,
        STUDENT = 2,
        ACCOUNTANT = 3
    }

    /** Properties of an Account. */
    interface IAccount {

        /** Account id */
        id?: (string|null);

        /** Account user_ids */
        user_ids?: (string[]|null);

        /** Account admin_user_ids */
        admin_user_ids?: (string[]|null);

        /** Account name */
        name?: (string|null);

        /** Account image_url */
        image_url?: (string|null);

        /** Account type */
        type?: (main.AccountType|null);
    }

    /** Represents an Account. */
    class Account implements IAccount {

        /**
         * Constructs a new Account.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IAccount);

        /** Account id. */
        public id: string;

        /** Account user_ids. */
        public user_ids: string[];

        /** Account admin_user_ids. */
        public admin_user_ids: string[];

        /** Account name. */
        public name: string;

        /** Account image_url. */
        public image_url: string;

        /** Account type. */
        public type: main.AccountType;

        /**
         * Encodes the specified Account message. Does not implicitly {@link main.Account.verify|verify} messages.
         * @param message Account message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Account message, length delimited. Does not implicitly {@link main.Account.verify|verify} messages.
         * @param message Account message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Account message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Account
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.Account;

        /**
         * Decodes an Account message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Account
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.Account;

        /**
         * Verifies an Account message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Account message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Account
         */
        public static fromObject(object: { [k: string]: any }): main.Account;

        /**
         * Creates a plain object from an Account message. Also converts values to other types if specified.
         * @param message Account
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.Account, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Account to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AdminAccount. */
    interface IAdminAccount {

        /** AdminAccount id */
        id?: (string|null);

        /** AdminAccount name */
        name?: (string|null);

        /** AdminAccount xrp_address_hot */
        xrp_address_hot?: (string|null);

        /** AdminAccount xrp_address_cold */
        xrp_address_cold?: (string|null);

        /** AdminAccount password */
        password?: (string|null);
    }

    /** Represents an AdminAccount. */
    class AdminAccount implements IAdminAccount {

        /**
         * Constructs a new AdminAccount.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IAdminAccount);

        /** AdminAccount id. */
        public id: string;

        /** AdminAccount name. */
        public name: string;

        /** AdminAccount xrp_address_hot. */
        public xrp_address_hot: string;

        /** AdminAccount xrp_address_cold. */
        public xrp_address_cold: string;

        /** AdminAccount password. */
        public password: string;

        /**
         * Encodes the specified AdminAccount message. Does not implicitly {@link main.AdminAccount.verify|verify} messages.
         * @param message AdminAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IAdminAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AdminAccount message, length delimited. Does not implicitly {@link main.AdminAccount.verify|verify} messages.
         * @param message AdminAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IAdminAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AdminAccount message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AdminAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.AdminAccount;

        /**
         * Decodes an AdminAccount message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AdminAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.AdminAccount;

        /**
         * Verifies an AdminAccount message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AdminAccount message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AdminAccount
         */
        public static fromObject(object: { [k: string]: any }): main.AdminAccount;

        /**
         * Creates a plain object from an AdminAccount message. Also converts values to other types if specified.
         * @param message AdminAccount
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.AdminAccount, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AdminAccount to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AdminPrivate. */
    interface IAdminPrivate {

        /** AdminPrivate id */
        id?: (string|null);

        /** AdminPrivate admin_account_id */
        admin_account_id?: (string|null);

        /** AdminPrivate xrp_seed_hot */
        xrp_seed_hot?: (string|null);
    }

    /** Represents an AdminPrivate. */
    class AdminPrivate implements IAdminPrivate {

        /**
         * Constructs a new AdminPrivate.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IAdminPrivate);

        /** AdminPrivate id. */
        public id: string;

        /** AdminPrivate admin_account_id. */
        public admin_account_id: string;

        /** AdminPrivate xrp_seed_hot. */
        public xrp_seed_hot: string;

        /**
         * Encodes the specified AdminPrivate message. Does not implicitly {@link main.AdminPrivate.verify|verify} messages.
         * @param message AdminPrivate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IAdminPrivate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AdminPrivate message, length delimited. Does not implicitly {@link main.AdminPrivate.verify|verify} messages.
         * @param message AdminPrivate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IAdminPrivate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AdminPrivate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AdminPrivate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.AdminPrivate;

        /**
         * Decodes an AdminPrivate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AdminPrivate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.AdminPrivate;

        /**
         * Verifies an AdminPrivate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AdminPrivate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AdminPrivate
         */
        public static fromObject(object: { [k: string]: any }): main.AdminPrivate;

        /**
         * Creates a plain object from an AdminPrivate message. Also converts values to other types if specified.
         * @param message AdminPrivate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.AdminPrivate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AdminPrivate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AvailableBalance. */
    interface IAvailableBalance {

        /** AvailableBalance id */
        id?: (string|null);

        /** AvailableBalance student_account_id */
        student_account_id?: (string|null);

        /** AvailableBalance amount_uupx */
        amount_uupx?: (string|null);

        /** AvailableBalance amount_uspx */
        amount_uspx?: (string|null);
    }

    /** Represents an AvailableBalance. */
    class AvailableBalance implements IAvailableBalance {

        /**
         * Constructs a new AvailableBalance.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IAvailableBalance);

        /** AvailableBalance id. */
        public id: string;

        /** AvailableBalance student_account_id. */
        public student_account_id: string;

        /** AvailableBalance amount_uupx. */
        public amount_uupx: string;

        /** AvailableBalance amount_uspx. */
        public amount_uspx: string;

        /**
         * Encodes the specified AvailableBalance message. Does not implicitly {@link main.AvailableBalance.verify|verify} messages.
         * @param message AvailableBalance message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IAvailableBalance, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AvailableBalance message, length delimited. Does not implicitly {@link main.AvailableBalance.verify|verify} messages.
         * @param message AvailableBalance message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IAvailableBalance, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AvailableBalance message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AvailableBalance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.AvailableBalance;

        /**
         * Decodes an AvailableBalance message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AvailableBalance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.AvailableBalance;

        /**
         * Verifies an AvailableBalance message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AvailableBalance message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AvailableBalance
         */
        public static fromObject(object: { [k: string]: any }): main.AvailableBalance;

        /**
         * Creates a plain object from an AvailableBalance message. Also converts values to other types if specified.
         * @param message AvailableBalance
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.AvailableBalance, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AvailableBalance to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Balance. */
    interface IBalance {

        /** Balance id */
        id?: (string|null);

        /** Balance student_account_id */
        student_account_id?: (string|null);

        /** Balance amount_uupx */
        amount_uupx?: (string|null);

        /** Balance amount_uspx */
        amount_uspx?: (string|null);
    }

    /** Represents a Balance. */
    class Balance implements IBalance {

        /**
         * Constructs a new Balance.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IBalance);

        /** Balance id. */
        public id: string;

        /** Balance student_account_id. */
        public student_account_id: string;

        /** Balance amount_uupx. */
        public amount_uupx: string;

        /** Balance amount_uspx. */
        public amount_uspx: string;

        /**
         * Encodes the specified Balance message. Does not implicitly {@link main.Balance.verify|verify} messages.
         * @param message Balance message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IBalance, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Balance message, length delimited. Does not implicitly {@link main.Balance.verify|verify} messages.
         * @param message Balance message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IBalance, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Balance message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Balance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.Balance;

        /**
         * Decodes a Balance message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Balance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.Balance;

        /**
         * Verifies a Balance message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Balance message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Balance
         */
        public static fromObject(object: { [k: string]: any }): main.Balance;

        /**
         * Creates a plain object from a Balance message. Also converts values to other types if specified.
         * @param message Balance
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.Balance, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Balance to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BalanceSnapshot. */
    interface IBalanceSnapshot {

        /** BalanceSnapshot id */
        id?: (string|null);

        /** BalanceSnapshot student_account_id */
        student_account_id?: (string|null);

        /** BalanceSnapshot amount_uupx */
        amount_uupx?: (string|null);

        /** BalanceSnapshot amount_uspx */
        amount_uspx?: (string|null);
    }

    /** Represents a BalanceSnapshot. */
    class BalanceSnapshot implements IBalanceSnapshot {

        /**
         * Constructs a new BalanceSnapshot.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IBalanceSnapshot);

        /** BalanceSnapshot id. */
        public id: string;

        /** BalanceSnapshot student_account_id. */
        public student_account_id: string;

        /** BalanceSnapshot amount_uupx. */
        public amount_uupx: string;

        /** BalanceSnapshot amount_uspx. */
        public amount_uspx: string;

        /**
         * Encodes the specified BalanceSnapshot message. Does not implicitly {@link main.BalanceSnapshot.verify|verify} messages.
         * @param message BalanceSnapshot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IBalanceSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BalanceSnapshot message, length delimited. Does not implicitly {@link main.BalanceSnapshot.verify|verify} messages.
         * @param message BalanceSnapshot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IBalanceSnapshot, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BalanceSnapshot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BalanceSnapshot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.BalanceSnapshot;

        /**
         * Decodes a BalanceSnapshot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BalanceSnapshot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.BalanceSnapshot;

        /**
         * Verifies a BalanceSnapshot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BalanceSnapshot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BalanceSnapshot
         */
        public static fromObject(object: { [k: string]: any }): main.BalanceSnapshot;

        /**
         * Creates a plain object from a BalanceSnapshot message. Also converts values to other types if specified.
         * @param message BalanceSnapshot
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.BalanceSnapshot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BalanceSnapshot to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatDelete. */
    interface IChatDelete {

        /** ChatDelete id */
        id?: (string|null);

        /** ChatDelete chat_id */
        chat_id?: (string|null);
    }

    /** Represents a ChatDelete. */
    class ChatDelete implements IChatDelete {

        /**
         * Constructs a new ChatDelete.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IChatDelete);

        /** ChatDelete id. */
        public id: string;

        /** ChatDelete chat_id. */
        public chat_id: string;

        /**
         * Encodes the specified ChatDelete message. Does not implicitly {@link main.ChatDelete.verify|verify} messages.
         * @param message ChatDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IChatDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatDelete message, length delimited. Does not implicitly {@link main.ChatDelete.verify|verify} messages.
         * @param message ChatDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IChatDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatDelete message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.ChatDelete;

        /**
         * Decodes a ChatDelete message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.ChatDelete;

        /**
         * Verifies a ChatDelete message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatDelete message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatDelete
         */
        public static fromObject(object: { [k: string]: any }): main.ChatDelete;

        /**
         * Creates a plain object from a ChatDelete message. Also converts values to other types if specified.
         * @param message ChatDelete
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.ChatDelete, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatDelete to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Chat. */
    interface IChat {

        /** Chat id */
        id?: (string|null);

        /** Chat title */
        title?: (string|null);

        /** Chat user1_id */
        user1_id?: (string|null);

        /** Chat user1_name */
        user1_name?: (string|null);

        /** Chat user2_id */
        user2_id?: (string|null);

        /** Chat user2_name */
        user2_name?: (string|null);

        /** Chat is_deleted */
        is_deleted?: (boolean|null);
    }

    /** Represents a Chat. */
    class Chat implements IChat {

        /**
         * Constructs a new Chat.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IChat);

        /** Chat id. */
        public id: string;

        /** Chat title. */
        public title: string;

        /** Chat user1_id. */
        public user1_id: string;

        /** Chat user1_name. */
        public user1_name: string;

        /** Chat user2_id. */
        public user2_id: string;

        /** Chat user2_name. */
        public user2_name: string;

        /** Chat is_deleted. */
        public is_deleted: boolean;

        /**
         * Encodes the specified Chat message. Does not implicitly {@link main.Chat.verify|verify} messages.
         * @param message Chat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IChat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Chat message, length delimited. Does not implicitly {@link main.Chat.verify|verify} messages.
         * @param message Chat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IChat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Chat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Chat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.Chat;

        /**
         * Decodes a Chat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Chat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.Chat;

        /**
         * Verifies a Chat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Chat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Chat
         */
        public static fromObject(object: { [k: string]: any }): main.Chat;

        /**
         * Creates a plain object from a Chat message. Also converts values to other types if specified.
         * @param message Chat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.Chat, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Chat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CostSetting. */
    interface ICostSetting {

        /** CostSetting id */
        id?: (string|null);

        /** CostSetting system_cost_ujpy */
        system_cost_ujpy?: (string|null);

        /** CostSetting electricity_cost_ujpy */
        electricity_cost_ujpy?: (string|null);
    }

    /** Represents a CostSetting. */
    class CostSetting implements ICostSetting {

        /**
         * Constructs a new CostSetting.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.ICostSetting);

        /** CostSetting id. */
        public id: string;

        /** CostSetting system_cost_ujpy. */
        public system_cost_ujpy: string;

        /** CostSetting electricity_cost_ujpy. */
        public electricity_cost_ujpy: string;

        /**
         * Encodes the specified CostSetting message. Does not implicitly {@link main.CostSetting.verify|verify} messages.
         * @param message CostSetting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.ICostSetting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CostSetting message, length delimited. Does not implicitly {@link main.CostSetting.verify|verify} messages.
         * @param message CostSetting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.ICostSetting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CostSetting message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CostSetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.CostSetting;

        /**
         * Decodes a CostSetting message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CostSetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.CostSetting;

        /**
         * Verifies a CostSetting message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CostSetting message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CostSetting
         */
        public static fromObject(object: { [k: string]: any }): main.CostSetting;

        /**
         * Creates a plain object from a CostSetting message. Also converts values to other types if specified.
         * @param message CostSetting
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.CostSetting, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CostSetting to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DailyPayment. */
    interface IDailyPayment {

        /** DailyPayment id */
        id?: (string|null);

        /** DailyPayment student_account_id */
        student_account_id?: (string|null);

        /** DailyPayment year */
        year?: (string|null);

        /** DailyPayment month */
        month?: (string|null);

        /** DailyPayment date */
        date?: (string|null);

        /** DailyPayment amount_mwh */
        amount_mwh?: (string|null);

        /** DailyPayment amount_uupx */
        amount_uupx?: (string|null);

        /** DailyPayment amount_uspx */
        amount_uspx?: (string|null);

        /** DailyPayment amount_insufficiency */
        amount_insufficiency?: (string|null);
    }

    /** Represents a DailyPayment. */
    class DailyPayment implements IDailyPayment {

        /**
         * Constructs a new DailyPayment.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IDailyPayment);

        /** DailyPayment id. */
        public id: string;

        /** DailyPayment student_account_id. */
        public student_account_id: string;

        /** DailyPayment year. */
        public year: string;

        /** DailyPayment month. */
        public month: string;

        /** DailyPayment date. */
        public date: string;

        /** DailyPayment amount_mwh. */
        public amount_mwh: string;

        /** DailyPayment amount_uupx. */
        public amount_uupx: string;

        /** DailyPayment amount_uspx. */
        public amount_uspx: string;

        /** DailyPayment amount_insufficiency. */
        public amount_insufficiency: string;

        /**
         * Encodes the specified DailyPayment message. Does not implicitly {@link main.DailyPayment.verify|verify} messages.
         * @param message DailyPayment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IDailyPayment, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DailyPayment message, length delimited. Does not implicitly {@link main.DailyPayment.verify|verify} messages.
         * @param message DailyPayment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IDailyPayment, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DailyPayment message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DailyPayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.DailyPayment;

        /**
         * Decodes a DailyPayment message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DailyPayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.DailyPayment;

        /**
         * Verifies a DailyPayment message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DailyPayment message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DailyPayment
         */
        public static fromObject(object: { [k: string]: any }): main.DailyPayment;

        /**
         * Creates a plain object from a DailyPayment message. Also converts values to other types if specified.
         * @param message DailyPayment
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.DailyPayment, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DailyPayment to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DailyUsage. */
    interface IDailyUsage {

        /** DailyUsage id */
        id?: (string|null);

        /** DailyUsage room_id */
        room_id?: (string|null);

        /** DailyUsage amount_kwh_str */
        amount_kwh_str?: (string|null);
    }

    /** Represents a DailyUsage. */
    class DailyUsage implements IDailyUsage {

        /**
         * Constructs a new DailyUsage.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IDailyUsage);

        /** DailyUsage id. */
        public id: string;

        /** DailyUsage room_id. */
        public room_id: string;

        /** DailyUsage amount_kwh_str. */
        public amount_kwh_str: string;

        /**
         * Encodes the specified DailyUsage message. Does not implicitly {@link main.DailyUsage.verify|verify} messages.
         * @param message DailyUsage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IDailyUsage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DailyUsage message, length delimited. Does not implicitly {@link main.DailyUsage.verify|verify} messages.
         * @param message DailyUsage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IDailyUsage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DailyUsage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DailyUsage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.DailyUsage;

        /**
         * Decodes a DailyUsage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DailyUsage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.DailyUsage;

        /**
         * Verifies a DailyUsage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DailyUsage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DailyUsage
         */
        public static fromObject(object: { [k: string]: any }): main.DailyUsage;

        /**
         * Creates a plain object from a DailyUsage message. Also converts values to other types if specified.
         * @param message DailyUsage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.DailyUsage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DailyUsage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DeltaAmount. */
    interface IDeltaAmount {

        /** DeltaAmount id */
        id?: (string|null);

        /** DeltaAmount asks_amount_utoken */
        asks_amount_utoken?: (string|null);

        /** DeltaAmount bids_amount_utoken */
        bids_amount_utoken?: (string|null);
    }

    /** Represents a DeltaAmount. */
    class DeltaAmount implements IDeltaAmount {

        /**
         * Constructs a new DeltaAmount.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IDeltaAmount);

        /** DeltaAmount id. */
        public id: string;

        /** DeltaAmount asks_amount_utoken. */
        public asks_amount_utoken: string;

        /** DeltaAmount bids_amount_utoken. */
        public bids_amount_utoken: string;

        /**
         * Encodes the specified DeltaAmount message. Does not implicitly {@link main.DeltaAmount.verify|verify} messages.
         * @param message DeltaAmount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IDeltaAmount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeltaAmount message, length delimited. Does not implicitly {@link main.DeltaAmount.verify|verify} messages.
         * @param message DeltaAmount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IDeltaAmount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeltaAmount message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeltaAmount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.DeltaAmount;

        /**
         * Decodes a DeltaAmount message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeltaAmount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.DeltaAmount;

        /**
         * Verifies a DeltaAmount message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeltaAmount message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeltaAmount
         */
        public static fromObject(object: { [k: string]: any }): main.DeltaAmount;

        /**
         * Creates a plain object from a DeltaAmount message. Also converts values to other types if specified.
         * @param message DeltaAmount
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.DeltaAmount, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeltaAmount to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DiscountPrice. */
    interface IDiscountPrice {

        /** DiscountPrice id */
        id?: (string|null);

        /** DiscountPrice price_ujpy */
        price_ujpy?: (string|null);

        /** DiscountPrice amount_purchase_utoken */
        amount_purchase_utoken?: (string|null);

        /** DiscountPrice amount_sale_utoken */
        amount_sale_utoken?: (string|null);
    }

    /** Represents a DiscountPrice. */
    class DiscountPrice implements IDiscountPrice {

        /**
         * Constructs a new DiscountPrice.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IDiscountPrice);

        /** DiscountPrice id. */
        public id: string;

        /** DiscountPrice price_ujpy. */
        public price_ujpy: string;

        /** DiscountPrice amount_purchase_utoken. */
        public amount_purchase_utoken: string;

        /** DiscountPrice amount_sale_utoken. */
        public amount_sale_utoken: string;

        /**
         * Encodes the specified DiscountPrice message. Does not implicitly {@link main.DiscountPrice.verify|verify} messages.
         * @param message DiscountPrice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IDiscountPrice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DiscountPrice message, length delimited. Does not implicitly {@link main.DiscountPrice.verify|verify} messages.
         * @param message DiscountPrice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IDiscountPrice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DiscountPrice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DiscountPrice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.DiscountPrice;

        /**
         * Decodes a DiscountPrice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DiscountPrice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.DiscountPrice;

        /**
         * Verifies a DiscountPrice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DiscountPrice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DiscountPrice
         */
        public static fromObject(object: { [k: string]: any }): main.DiscountPrice;

        /**
         * Creates a plain object from a DiscountPrice message. Also converts values to other types if specified.
         * @param message DiscountPrice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.DiscountPrice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DiscountPrice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InsufficientBalance. */
    interface IInsufficientBalance {

        /** InsufficientBalance id */
        id?: (string|null);

        /** InsufficientBalance student_account_id */
        student_account_id?: (string|null);

        /** InsufficientBalance amount_utoken */
        amount_utoken?: (string|null);
    }

    /** Represents an InsufficientBalance. */
    class InsufficientBalance implements IInsufficientBalance {

        /**
         * Constructs a new InsufficientBalance.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IInsufficientBalance);

        /** InsufficientBalance id. */
        public id: string;

        /** InsufficientBalance student_account_id. */
        public student_account_id: string;

        /** InsufficientBalance amount_utoken. */
        public amount_utoken: string;

        /**
         * Encodes the specified InsufficientBalance message. Does not implicitly {@link main.InsufficientBalance.verify|verify} messages.
         * @param message InsufficientBalance message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IInsufficientBalance, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InsufficientBalance message, length delimited. Does not implicitly {@link main.InsufficientBalance.verify|verify} messages.
         * @param message InsufficientBalance message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IInsufficientBalance, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InsufficientBalance message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InsufficientBalance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.InsufficientBalance;

        /**
         * Decodes an InsufficientBalance message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InsufficientBalance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.InsufficientBalance;

        /**
         * Verifies an InsufficientBalance message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InsufficientBalance message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InsufficientBalance
         */
        public static fromObject(object: { [k: string]: any }): main.InsufficientBalance;

        /**
         * Creates a plain object from an InsufficientBalance message. Also converts values to other types if specified.
         * @param message InsufficientBalance
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.InsufficientBalance, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InsufficientBalance to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MarketStatus. */
    interface IMarketStatus {

        /** MarketStatus id */
        id?: (string|null);

        /** MarketStatus is_finished_normal */
        is_finished_normal?: (boolean|null);

        /** MarketStatus is_finished_renewable */
        is_finished_renewable?: (boolean|null);
    }

    /** Represents a MarketStatus. */
    class MarketStatus implements IMarketStatus {

        /**
         * Constructs a new MarketStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IMarketStatus);

        /** MarketStatus id. */
        public id: string;

        /** MarketStatus is_finished_normal. */
        public is_finished_normal: boolean;

        /** MarketStatus is_finished_renewable. */
        public is_finished_renewable: boolean;

        /**
         * Encodes the specified MarketStatus message. Does not implicitly {@link main.MarketStatus.verify|verify} messages.
         * @param message MarketStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IMarketStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MarketStatus message, length delimited. Does not implicitly {@link main.MarketStatus.verify|verify} messages.
         * @param message MarketStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IMarketStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MarketStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MarketStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.MarketStatus;

        /**
         * Decodes a MarketStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MarketStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.MarketStatus;

        /**
         * Verifies a MarketStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MarketStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MarketStatus
         */
        public static fromObject(object: { [k: string]: any }): main.MarketStatus;

        /**
         * Creates a plain object from a MarketStatus message. Also converts values to other types if specified.
         * @param message MarketStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.MarketStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MarketStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MessageDelete. */
    interface IMessageDelete {

        /** MessageDelete id */
        id?: (string|null);

        /** MessageDelete chat_id */
        chat_id?: (string|null);

        /** MessageDelete message_id */
        message_id?: (string|null);
    }

    /** Represents a MessageDelete. */
    class MessageDelete implements IMessageDelete {

        /**
         * Constructs a new MessageDelete.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IMessageDelete);

        /** MessageDelete id. */
        public id: string;

        /** MessageDelete chat_id. */
        public chat_id: string;

        /** MessageDelete message_id. */
        public message_id: string;

        /**
         * Encodes the specified MessageDelete message. Does not implicitly {@link main.MessageDelete.verify|verify} messages.
         * @param message MessageDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IMessageDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MessageDelete message, length delimited. Does not implicitly {@link main.MessageDelete.verify|verify} messages.
         * @param message MessageDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IMessageDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MessageDelete message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MessageDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.MessageDelete;

        /**
         * Decodes a MessageDelete message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MessageDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.MessageDelete;

        /**
         * Verifies a MessageDelete message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MessageDelete message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MessageDelete
         */
        public static fromObject(object: { [k: string]: any }): main.MessageDelete;

        /**
         * Creates a plain object from a MessageDelete message. Also converts values to other types if specified.
         * @param message MessageDelete
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.MessageDelete, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MessageDelete to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MessageRead. */
    interface IMessageRead {

        /** MessageRead id */
        id?: (string|null);

        /** MessageRead chat_id */
        chat_id?: (string|null);

        /** MessageRead message_id */
        message_id?: (string|null);
    }

    /** Represents a MessageRead. */
    class MessageRead implements IMessageRead {

        /**
         * Constructs a new MessageRead.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IMessageRead);

        /** MessageRead id. */
        public id: string;

        /** MessageRead chat_id. */
        public chat_id: string;

        /** MessageRead message_id. */
        public message_id: string;

        /**
         * Encodes the specified MessageRead message. Does not implicitly {@link main.MessageRead.verify|verify} messages.
         * @param message MessageRead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IMessageRead, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MessageRead message, length delimited. Does not implicitly {@link main.MessageRead.verify|verify} messages.
         * @param message MessageRead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IMessageRead, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MessageRead message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MessageRead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.MessageRead;

        /**
         * Decodes a MessageRead message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MessageRead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.MessageRead;

        /**
         * Verifies a MessageRead message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MessageRead message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MessageRead
         */
        public static fromObject(object: { [k: string]: any }): main.MessageRead;

        /**
         * Creates a plain object from a MessageRead message. Also converts values to other types if specified.
         * @param message MessageRead
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.MessageRead, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MessageRead to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Message. */
    interface IMessage {

        /** Message id */
        id?: (string|null);

        /** Message chat_id */
        chat_id?: (string|null);

        /** Message account_id */
        account_id?: (string|null);

        /** Message text */
        text?: (string|null);

        /** Message is_read */
        is_read?: (boolean|null);

        /** Message is_deleted */
        is_deleted?: (boolean|null);
    }

    /** Represents a Message. */
    class Message implements IMessage {

        /**
         * Constructs a new Message.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IMessage);

        /** Message id. */
        public id: string;

        /** Message chat_id. */
        public chat_id: string;

        /** Message account_id. */
        public account_id: string;

        /** Message text. */
        public text: string;

        /** Message is_read. */
        public is_read: boolean;

        /** Message is_deleted. */
        public is_deleted: boolean;

        /**
         * Encodes the specified Message message. Does not implicitly {@link main.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link main.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.Message;

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.Message;

        /**
         * Verifies a Message message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Message
         */
        public static fromObject(object: { [k: string]: any }): main.Message;

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @param message Message
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Message to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MonthlyPayment. */
    interface IMonthlyPayment {

        /** MonthlyPayment id */
        id?: (string|null);

        /** MonthlyPayment student_account_id */
        student_account_id?: (string|null);

        /** MonthlyPayment year */
        year?: (string|null);

        /** MonthlyPayment month */
        month?: (string|null);

        /** MonthlyPayment amount_ujpy */
        amount_ujpy?: (string|null);

        /** MonthlyPayment amount_primary_ujpy */
        amount_primary_ujpy?: (string|null);

        /** MonthlyPayment amount_adjust_ujpy */
        amount_adjust_ujpy?: (string|null);

        /** MonthlyPayment amount_market_ujpy */
        amount_market_ujpy?: (string|null);

        /** MonthlyPayment amount_reward_ujpy */
        amount_reward_ujpy?: (string|null);
    }

    /** Represents a MonthlyPayment. */
    class MonthlyPayment implements IMonthlyPayment {

        /**
         * Constructs a new MonthlyPayment.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IMonthlyPayment);

        /** MonthlyPayment id. */
        public id: string;

        /** MonthlyPayment student_account_id. */
        public student_account_id: string;

        /** MonthlyPayment year. */
        public year: string;

        /** MonthlyPayment month. */
        public month: string;

        /** MonthlyPayment amount_ujpy. */
        public amount_ujpy: string;

        /** MonthlyPayment amount_primary_ujpy. */
        public amount_primary_ujpy: string;

        /** MonthlyPayment amount_adjust_ujpy. */
        public amount_adjust_ujpy: string;

        /** MonthlyPayment amount_market_ujpy. */
        public amount_market_ujpy: string;

        /** MonthlyPayment amount_reward_ujpy. */
        public amount_reward_ujpy: string;

        /**
         * Encodes the specified MonthlyPayment message. Does not implicitly {@link main.MonthlyPayment.verify|verify} messages.
         * @param message MonthlyPayment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IMonthlyPayment, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MonthlyPayment message, length delimited. Does not implicitly {@link main.MonthlyPayment.verify|verify} messages.
         * @param message MonthlyPayment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IMonthlyPayment, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MonthlyPayment message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MonthlyPayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.MonthlyPayment;

        /**
         * Decodes a MonthlyPayment message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MonthlyPayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.MonthlyPayment;

        /**
         * Verifies a MonthlyPayment message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MonthlyPayment message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MonthlyPayment
         */
        public static fromObject(object: { [k: string]: any }): main.MonthlyPayment;

        /**
         * Creates a plain object from a MonthlyPayment message. Also converts values to other types if specified.
         * @param message MonthlyPayment
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.MonthlyPayment, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MonthlyPayment to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MonthlyUsage. */
    interface IMonthlyUsage {

        /** MonthlyUsage id */
        id?: (string|null);

        /** MonthlyUsage student_account_id */
        student_account_id?: (string|null);

        /** MonthlyUsage year */
        year?: (string|null);

        /** MonthlyUsage month */
        month?: (string|null);

        /** MonthlyUsage amount_mwh */
        amount_mwh?: (string|null);
    }

    /** Represents a MonthlyUsage. */
    class MonthlyUsage implements IMonthlyUsage {

        /**
         * Constructs a new MonthlyUsage.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IMonthlyUsage);

        /** MonthlyUsage id. */
        public id: string;

        /** MonthlyUsage student_account_id. */
        public student_account_id: string;

        /** MonthlyUsage year. */
        public year: string;

        /** MonthlyUsage month. */
        public month: string;

        /** MonthlyUsage amount_mwh. */
        public amount_mwh: string;

        /**
         * Encodes the specified MonthlyUsage message. Does not implicitly {@link main.MonthlyUsage.verify|verify} messages.
         * @param message MonthlyUsage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IMonthlyUsage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MonthlyUsage message, length delimited. Does not implicitly {@link main.MonthlyUsage.verify|verify} messages.
         * @param message MonthlyUsage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IMonthlyUsage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MonthlyUsage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MonthlyUsage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.MonthlyUsage;

        /**
         * Decodes a MonthlyUsage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MonthlyUsage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.MonthlyUsage;

        /**
         * Verifies a MonthlyUsage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MonthlyUsage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MonthlyUsage
         */
        public static fromObject(object: { [k: string]: any }): main.MonthlyUsage;

        /**
         * Creates a plain object from a MonthlyUsage message. Also converts values to other types if specified.
         * @param message MonthlyUsage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.MonthlyUsage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MonthlyUsage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NormalAskDelete. */
    interface INormalAskDelete {

        /** NormalAskDelete id */
        id?: (string|null);

        /** NormalAskDelete ask_id */
        ask_id?: (string|null);
    }

    /** Represents a NormalAskDelete. */
    class NormalAskDelete implements INormalAskDelete {

        /**
         * Constructs a new NormalAskDelete.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.INormalAskDelete);

        /** NormalAskDelete id. */
        public id: string;

        /** NormalAskDelete ask_id. */
        public ask_id: string;

        /**
         * Encodes the specified NormalAskDelete message. Does not implicitly {@link main.NormalAskDelete.verify|verify} messages.
         * @param message NormalAskDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.INormalAskDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NormalAskDelete message, length delimited. Does not implicitly {@link main.NormalAskDelete.verify|verify} messages.
         * @param message NormalAskDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.INormalAskDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NormalAskDelete message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NormalAskDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.NormalAskDelete;

        /**
         * Decodes a NormalAskDelete message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NormalAskDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.NormalAskDelete;

        /**
         * Verifies a NormalAskDelete message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NormalAskDelete message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NormalAskDelete
         */
        public static fromObject(object: { [k: string]: any }): main.NormalAskDelete;

        /**
         * Creates a plain object from a NormalAskDelete message. Also converts values to other types if specified.
         * @param message NormalAskDelete
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.NormalAskDelete, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NormalAskDelete to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** NormalAskHistoryType enum. */
    enum NormalAskHistoryType {
        UNKNOWN = 0,
        PRIMARYADDITIONAL = 1,
        SECONDARY = 2
    }

    /** Properties of a NormalAskHistory. */
    interface INormalAskHistory {

        /** NormalAskHistory id */
        id?: (string|null);

        /** NormalAskHistory type */
        type?: (main.NormalAskHistoryType|null);

        /** NormalAskHistory account_id */
        account_id?: (string|null);

        /** NormalAskHistory price_ujpy */
        price_ujpy?: (string|null);

        /** NormalAskHistory amount_uupx */
        amount_uupx?: (string|null);

        /** NormalAskHistory is_accepted */
        is_accepted?: (boolean|null);

        /** NormalAskHistory contract_price_ujpy */
        contract_price_ujpy?: (string|null);
    }

    /** Represents a NormalAskHistory. */
    class NormalAskHistory implements INormalAskHistory {

        /**
         * Constructs a new NormalAskHistory.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.INormalAskHistory);

        /** NormalAskHistory id. */
        public id: string;

        /** NormalAskHistory type. */
        public type: main.NormalAskHistoryType;

        /** NormalAskHistory account_id. */
        public account_id: string;

        /** NormalAskHistory price_ujpy. */
        public price_ujpy: string;

        /** NormalAskHistory amount_uupx. */
        public amount_uupx: string;

        /** NormalAskHistory is_accepted. */
        public is_accepted: boolean;

        /** NormalAskHistory contract_price_ujpy. */
        public contract_price_ujpy: string;

        /**
         * Encodes the specified NormalAskHistory message. Does not implicitly {@link main.NormalAskHistory.verify|verify} messages.
         * @param message NormalAskHistory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.INormalAskHistory, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NormalAskHistory message, length delimited. Does not implicitly {@link main.NormalAskHistory.verify|verify} messages.
         * @param message NormalAskHistory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.INormalAskHistory, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NormalAskHistory message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NormalAskHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.NormalAskHistory;

        /**
         * Decodes a NormalAskHistory message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NormalAskHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.NormalAskHistory;

        /**
         * Verifies a NormalAskHistory message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NormalAskHistory message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NormalAskHistory
         */
        public static fromObject(object: { [k: string]: any }): main.NormalAskHistory;

        /**
         * Creates a plain object from a NormalAskHistory message. Also converts values to other types if specified.
         * @param message NormalAskHistory
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.NormalAskHistory, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NormalAskHistory to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** NormalAskType enum. */
    enum NormalAskType {
        UNKNOWN = 0,
        PRIMARYADDITIONAL = 1,
        SECONDARY = 2
    }

    /** Properties of a NormalAsk. */
    interface INormalAsk {

        /** NormalAsk id */
        id?: (string|null);

        /** NormalAsk type */
        type?: (main.NormalAskType|null);

        /** NormalAsk account_id */
        account_id?: (string|null);

        /** NormalAsk price_ujpy */
        price_ujpy?: (string|null);

        /** NormalAsk amount_uupx */
        amount_uupx?: (string|null);

        /** NormalAsk is_deleted */
        is_deleted?: (boolean|null);
    }

    /** Represents a NormalAsk. */
    class NormalAsk implements INormalAsk {

        /**
         * Constructs a new NormalAsk.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.INormalAsk);

        /** NormalAsk id. */
        public id: string;

        /** NormalAsk type. */
        public type: main.NormalAskType;

        /** NormalAsk account_id. */
        public account_id: string;

        /** NormalAsk price_ujpy. */
        public price_ujpy: string;

        /** NormalAsk amount_uupx. */
        public amount_uupx: string;

        /** NormalAsk is_deleted. */
        public is_deleted: boolean;

        /**
         * Encodes the specified NormalAsk message. Does not implicitly {@link main.NormalAsk.verify|verify} messages.
         * @param message NormalAsk message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.INormalAsk, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NormalAsk message, length delimited. Does not implicitly {@link main.NormalAsk.verify|verify} messages.
         * @param message NormalAsk message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.INormalAsk, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NormalAsk message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NormalAsk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.NormalAsk;

        /**
         * Decodes a NormalAsk message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NormalAsk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.NormalAsk;

        /**
         * Verifies a NormalAsk message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NormalAsk message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NormalAsk
         */
        public static fromObject(object: { [k: string]: any }): main.NormalAsk;

        /**
         * Creates a plain object from a NormalAsk message. Also converts values to other types if specified.
         * @param message NormalAsk
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.NormalAsk, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NormalAsk to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NormalAskSetting. */
    interface INormalAskSetting {

        /** NormalAskSetting id */
        id?: (string|null);

        /** NormalAskSetting price_ujpy */
        price_ujpy?: (string|null);

        /** NormalAskSetting amount_uupx */
        amount_uupx?: (string|null);

        /** NormalAskSetting ratio_percentage */
        ratio_percentage?: (string|null);

        /** NormalAskSetting enable */
        enable?: (boolean|null);
    }

    /** Represents a NormalAskSetting. */
    class NormalAskSetting implements INormalAskSetting {

        /**
         * Constructs a new NormalAskSetting.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.INormalAskSetting);

        /** NormalAskSetting id. */
        public id: string;

        /** NormalAskSetting price_ujpy. */
        public price_ujpy: string;

        /** NormalAskSetting amount_uupx. */
        public amount_uupx: string;

        /** NormalAskSetting ratio_percentage. */
        public ratio_percentage: string;

        /** NormalAskSetting enable. */
        public enable: boolean;

        /**
         * Encodes the specified NormalAskSetting message. Does not implicitly {@link main.NormalAskSetting.verify|verify} messages.
         * @param message NormalAskSetting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.INormalAskSetting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NormalAskSetting message, length delimited. Does not implicitly {@link main.NormalAskSetting.verify|verify} messages.
         * @param message NormalAskSetting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.INormalAskSetting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NormalAskSetting message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NormalAskSetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.NormalAskSetting;

        /**
         * Decodes a NormalAskSetting message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NormalAskSetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.NormalAskSetting;

        /**
         * Verifies a NormalAskSetting message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NormalAskSetting message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NormalAskSetting
         */
        public static fromObject(object: { [k: string]: any }): main.NormalAskSetting;

        /**
         * Creates a plain object from a NormalAskSetting message. Also converts values to other types if specified.
         * @param message NormalAskSetting
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.NormalAskSetting, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NormalAskSetting to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NormalBidDelete. */
    interface INormalBidDelete {

        /** NormalBidDelete id */
        id?: (string|null);

        /** NormalBidDelete bid_id */
        bid_id?: (string|null);
    }

    /** Represents a NormalBidDelete. */
    class NormalBidDelete implements INormalBidDelete {

        /**
         * Constructs a new NormalBidDelete.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.INormalBidDelete);

        /** NormalBidDelete id. */
        public id: string;

        /** NormalBidDelete bid_id. */
        public bid_id: string;

        /**
         * Encodes the specified NormalBidDelete message. Does not implicitly {@link main.NormalBidDelete.verify|verify} messages.
         * @param message NormalBidDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.INormalBidDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NormalBidDelete message, length delimited. Does not implicitly {@link main.NormalBidDelete.verify|verify} messages.
         * @param message NormalBidDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.INormalBidDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NormalBidDelete message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NormalBidDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.NormalBidDelete;

        /**
         * Decodes a NormalBidDelete message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NormalBidDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.NormalBidDelete;

        /**
         * Verifies a NormalBidDelete message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NormalBidDelete message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NormalBidDelete
         */
        public static fromObject(object: { [k: string]: any }): main.NormalBidDelete;

        /**
         * Creates a plain object from a NormalBidDelete message. Also converts values to other types if specified.
         * @param message NormalBidDelete
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.NormalBidDelete, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NormalBidDelete to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NormalBidHistory. */
    interface INormalBidHistory {

        /** NormalBidHistory id */
        id?: (string|null);

        /** NormalBidHistory account_id */
        account_id?: (string|null);

        /** NormalBidHistory price_ujpy */
        price_ujpy?: (string|null);

        /** NormalBidHistory amount_uupx */
        amount_uupx?: (string|null);

        /** NormalBidHistory is_accepted */
        is_accepted?: (boolean|null);

        /** NormalBidHistory contract_price_ujpy */
        contract_price_ujpy?: (string|null);
    }

    /** Represents a NormalBidHistory. */
    class NormalBidHistory implements INormalBidHistory {

        /**
         * Constructs a new NormalBidHistory.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.INormalBidHistory);

        /** NormalBidHistory id. */
        public id: string;

        /** NormalBidHistory account_id. */
        public account_id: string;

        /** NormalBidHistory price_ujpy. */
        public price_ujpy: string;

        /** NormalBidHistory amount_uupx. */
        public amount_uupx: string;

        /** NormalBidHistory is_accepted. */
        public is_accepted: boolean;

        /** NormalBidHistory contract_price_ujpy. */
        public contract_price_ujpy: string;

        /**
         * Encodes the specified NormalBidHistory message. Does not implicitly {@link main.NormalBidHistory.verify|verify} messages.
         * @param message NormalBidHistory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.INormalBidHistory, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NormalBidHistory message, length delimited. Does not implicitly {@link main.NormalBidHistory.verify|verify} messages.
         * @param message NormalBidHistory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.INormalBidHistory, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NormalBidHistory message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NormalBidHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.NormalBidHistory;

        /**
         * Decodes a NormalBidHistory message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NormalBidHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.NormalBidHistory;

        /**
         * Verifies a NormalBidHistory message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NormalBidHistory message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NormalBidHistory
         */
        public static fromObject(object: { [k: string]: any }): main.NormalBidHistory;

        /**
         * Creates a plain object from a NormalBidHistory message. Also converts values to other types if specified.
         * @param message NormalBidHistory
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.NormalBidHistory, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NormalBidHistory to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NormalBid. */
    interface INormalBid {

        /** NormalBid id */
        id?: (string|null);

        /** NormalBid account_id */
        account_id?: (string|null);

        /** NormalBid price_ujpy */
        price_ujpy?: (string|null);

        /** NormalBid amount_uupx */
        amount_uupx?: (string|null);

        /** NormalBid is_deleted */
        is_deleted?: (boolean|null);
    }

    /** Represents a NormalBid. */
    class NormalBid implements INormalBid {

        /**
         * Constructs a new NormalBid.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.INormalBid);

        /** NormalBid id. */
        public id: string;

        /** NormalBid account_id. */
        public account_id: string;

        /** NormalBid price_ujpy. */
        public price_ujpy: string;

        /** NormalBid amount_uupx. */
        public amount_uupx: string;

        /** NormalBid is_deleted. */
        public is_deleted: boolean;

        /**
         * Encodes the specified NormalBid message. Does not implicitly {@link main.NormalBid.verify|verify} messages.
         * @param message NormalBid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.INormalBid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NormalBid message, length delimited. Does not implicitly {@link main.NormalBid.verify|verify} messages.
         * @param message NormalBid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.INormalBid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NormalBid message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NormalBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.NormalBid;

        /**
         * Decodes a NormalBid message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NormalBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.NormalBid;

        /**
         * Verifies a NormalBid message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NormalBid message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NormalBid
         */
        public static fromObject(object: { [k: string]: any }): main.NormalBid;

        /**
         * Creates a plain object from a NormalBid message. Also converts values to other types if specified.
         * @param message NormalBid
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.NormalBid, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NormalBid to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NormalSettlement. */
    interface INormalSettlement {

        /** NormalSettlement id */
        id?: (string|null);

        /** NormalSettlement bid_id */
        bid_id?: (string|null);

        /** NormalSettlement ask_id */
        ask_id?: (string|null);

        /** NormalSettlement price_ujpy */
        price_ujpy?: (string|null);

        /** NormalSettlement amount_uupx */
        amount_uupx?: (string|null);
    }

    /** Represents a NormalSettlement. */
    class NormalSettlement implements INormalSettlement {

        /**
         * Constructs a new NormalSettlement.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.INormalSettlement);

        /** NormalSettlement id. */
        public id: string;

        /** NormalSettlement bid_id. */
        public bid_id: string;

        /** NormalSettlement ask_id. */
        public ask_id: string;

        /** NormalSettlement price_ujpy. */
        public price_ujpy: string;

        /** NormalSettlement amount_uupx. */
        public amount_uupx: string;

        /**
         * Encodes the specified NormalSettlement message. Does not implicitly {@link main.NormalSettlement.verify|verify} messages.
         * @param message NormalSettlement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.INormalSettlement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NormalSettlement message, length delimited. Does not implicitly {@link main.NormalSettlement.verify|verify} messages.
         * @param message NormalSettlement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.INormalSettlement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NormalSettlement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NormalSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.NormalSettlement;

        /**
         * Decodes a NormalSettlement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NormalSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.NormalSettlement;

        /**
         * Verifies a NormalSettlement message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NormalSettlement message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NormalSettlement
         */
        public static fromObject(object: { [k: string]: any }): main.NormalSettlement;

        /**
         * Creates a plain object from a NormalSettlement message. Also converts values to other types if specified.
         * @param message NormalSettlement
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.NormalSettlement, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NormalSettlement to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PrimaryAsk. */
    interface IPrimaryAsk {

        /** PrimaryAsk id */
        id?: (string|null);

        /** PrimaryAsk account_id */
        account_id?: (string|null);

        /** PrimaryAsk price_ujpy */
        price_ujpy?: (string|null);

        /** PrimaryAsk amount_uupx */
        amount_uupx?: (string|null);
    }

    /** Represents a PrimaryAsk. */
    class PrimaryAsk implements IPrimaryAsk {

        /**
         * Constructs a new PrimaryAsk.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IPrimaryAsk);

        /** PrimaryAsk id. */
        public id: string;

        /** PrimaryAsk account_id. */
        public account_id: string;

        /** PrimaryAsk price_ujpy. */
        public price_ujpy: string;

        /** PrimaryAsk amount_uupx. */
        public amount_uupx: string;

        /**
         * Encodes the specified PrimaryAsk message. Does not implicitly {@link main.PrimaryAsk.verify|verify} messages.
         * @param message PrimaryAsk message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IPrimaryAsk, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PrimaryAsk message, length delimited. Does not implicitly {@link main.PrimaryAsk.verify|verify} messages.
         * @param message PrimaryAsk message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IPrimaryAsk, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PrimaryAsk message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PrimaryAsk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.PrimaryAsk;

        /**
         * Decodes a PrimaryAsk message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PrimaryAsk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.PrimaryAsk;

        /**
         * Verifies a PrimaryAsk message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PrimaryAsk message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PrimaryAsk
         */
        public static fromObject(object: { [k: string]: any }): main.PrimaryAsk;

        /**
         * Creates a plain object from a PrimaryAsk message. Also converts values to other types if specified.
         * @param message PrimaryAsk
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.PrimaryAsk, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PrimaryAsk to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PrimaryBid. */
    interface IPrimaryBid {

        /** PrimaryBid id */
        id?: (string|null);

        /** PrimaryBid account_id */
        account_id?: (string|null);

        /** PrimaryBid price_ujpy */
        price_ujpy?: (string|null);

        /** PrimaryBid amount_uupx */
        amount_uupx?: (string|null);
    }

    /** Represents a PrimaryBid. */
    class PrimaryBid implements IPrimaryBid {

        /**
         * Constructs a new PrimaryBid.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IPrimaryBid);

        /** PrimaryBid id. */
        public id: string;

        /** PrimaryBid account_id. */
        public account_id: string;

        /** PrimaryBid price_ujpy. */
        public price_ujpy: string;

        /** PrimaryBid amount_uupx. */
        public amount_uupx: string;

        /**
         * Encodes the specified PrimaryBid message. Does not implicitly {@link main.PrimaryBid.verify|verify} messages.
         * @param message PrimaryBid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IPrimaryBid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PrimaryBid message, length delimited. Does not implicitly {@link main.PrimaryBid.verify|verify} messages.
         * @param message PrimaryBid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IPrimaryBid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PrimaryBid message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PrimaryBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.PrimaryBid;

        /**
         * Decodes a PrimaryBid message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PrimaryBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.PrimaryBid;

        /**
         * Verifies a PrimaryBid message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PrimaryBid message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PrimaryBid
         */
        public static fromObject(object: { [k: string]: any }): main.PrimaryBid;

        /**
         * Creates a plain object from a PrimaryBid message. Also converts values to other types if specified.
         * @param message PrimaryBid
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.PrimaryBid, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PrimaryBid to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RenewableAskDelete. */
    interface IRenewableAskDelete {

        /** RenewableAskDelete id */
        id?: (string|null);

        /** RenewableAskDelete ask_id */
        ask_id?: (string|null);
    }

    /** Represents a RenewableAskDelete. */
    class RenewableAskDelete implements IRenewableAskDelete {

        /**
         * Constructs a new RenewableAskDelete.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IRenewableAskDelete);

        /** RenewableAskDelete id. */
        public id: string;

        /** RenewableAskDelete ask_id. */
        public ask_id: string;

        /**
         * Encodes the specified RenewableAskDelete message. Does not implicitly {@link main.RenewableAskDelete.verify|verify} messages.
         * @param message RenewableAskDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IRenewableAskDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RenewableAskDelete message, length delimited. Does not implicitly {@link main.RenewableAskDelete.verify|verify} messages.
         * @param message RenewableAskDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IRenewableAskDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RenewableAskDelete message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RenewableAskDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.RenewableAskDelete;

        /**
         * Decodes a RenewableAskDelete message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RenewableAskDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.RenewableAskDelete;

        /**
         * Verifies a RenewableAskDelete message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RenewableAskDelete message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RenewableAskDelete
         */
        public static fromObject(object: { [k: string]: any }): main.RenewableAskDelete;

        /**
         * Creates a plain object from a RenewableAskDelete message. Also converts values to other types if specified.
         * @param message RenewableAskDelete
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.RenewableAskDelete, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RenewableAskDelete to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** RenewableAskHistoryType enum. */
    enum RenewableAskHistoryType {
        UNKNOWN = 0,
        PRIMARY = 1,
        SECONDARY = 2
    }

    /** Properties of a RenewableAskHistory. */
    interface IRenewableAskHistory {

        /** RenewableAskHistory id */
        id?: (string|null);

        /** RenewableAskHistory type */
        type?: (main.RenewableAskHistoryType|null);

        /** RenewableAskHistory account_id */
        account_id?: (string|null);

        /** RenewableAskHistory price_ujpy */
        price_ujpy?: (string|null);

        /** RenewableAskHistory amount_uspx */
        amount_uspx?: (string|null);

        /** RenewableAskHistory is_accepted */
        is_accepted?: (boolean|null);

        /** RenewableAskHistory contract_price_ujpy */
        contract_price_ujpy?: (string|null);
    }

    /** Represents a RenewableAskHistory. */
    class RenewableAskHistory implements IRenewableAskHistory {

        /**
         * Constructs a new RenewableAskHistory.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IRenewableAskHistory);

        /** RenewableAskHistory id. */
        public id: string;

        /** RenewableAskHistory type. */
        public type: main.RenewableAskHistoryType;

        /** RenewableAskHistory account_id. */
        public account_id: string;

        /** RenewableAskHistory price_ujpy. */
        public price_ujpy: string;

        /** RenewableAskHistory amount_uspx. */
        public amount_uspx: string;

        /** RenewableAskHistory is_accepted. */
        public is_accepted: boolean;

        /** RenewableAskHistory contract_price_ujpy. */
        public contract_price_ujpy: string;

        /**
         * Encodes the specified RenewableAskHistory message. Does not implicitly {@link main.RenewableAskHistory.verify|verify} messages.
         * @param message RenewableAskHistory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IRenewableAskHistory, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RenewableAskHistory message, length delimited. Does not implicitly {@link main.RenewableAskHistory.verify|verify} messages.
         * @param message RenewableAskHistory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IRenewableAskHistory, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RenewableAskHistory message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RenewableAskHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.RenewableAskHistory;

        /**
         * Decodes a RenewableAskHistory message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RenewableAskHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.RenewableAskHistory;

        /**
         * Verifies a RenewableAskHistory message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RenewableAskHistory message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RenewableAskHistory
         */
        public static fromObject(object: { [k: string]: any }): main.RenewableAskHistory;

        /**
         * Creates a plain object from a RenewableAskHistory message. Also converts values to other types if specified.
         * @param message RenewableAskHistory
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.RenewableAskHistory, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RenewableAskHistory to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** RenewableAskType enum. */
    enum RenewableAskType {
        UNKNOWN = 0,
        PRIMARY = 1,
        SECONDARY = 2
    }

    /** Properties of a RenewableAsk. */
    interface IRenewableAsk {

        /** RenewableAsk id */
        id?: (string|null);

        /** RenewableAsk type */
        type?: (main.RenewableAskType|null);

        /** RenewableAsk account_id */
        account_id?: (string|null);

        /** RenewableAsk price_ujpy */
        price_ujpy?: (string|null);

        /** RenewableAsk amount_uspx */
        amount_uspx?: (string|null);

        /** RenewableAsk is_deleted */
        is_deleted?: (boolean|null);
    }

    /** Represents a RenewableAsk. */
    class RenewableAsk implements IRenewableAsk {

        /**
         * Constructs a new RenewableAsk.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IRenewableAsk);

        /** RenewableAsk id. */
        public id: string;

        /** RenewableAsk type. */
        public type: main.RenewableAskType;

        /** RenewableAsk account_id. */
        public account_id: string;

        /** RenewableAsk price_ujpy. */
        public price_ujpy: string;

        /** RenewableAsk amount_uspx. */
        public amount_uspx: string;

        /** RenewableAsk is_deleted. */
        public is_deleted: boolean;

        /**
         * Encodes the specified RenewableAsk message. Does not implicitly {@link main.RenewableAsk.verify|verify} messages.
         * @param message RenewableAsk message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IRenewableAsk, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RenewableAsk message, length delimited. Does not implicitly {@link main.RenewableAsk.verify|verify} messages.
         * @param message RenewableAsk message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IRenewableAsk, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RenewableAsk message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RenewableAsk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.RenewableAsk;

        /**
         * Decodes a RenewableAsk message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RenewableAsk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.RenewableAsk;

        /**
         * Verifies a RenewableAsk message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RenewableAsk message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RenewableAsk
         */
        public static fromObject(object: { [k: string]: any }): main.RenewableAsk;

        /**
         * Creates a plain object from a RenewableAsk message. Also converts values to other types if specified.
         * @param message RenewableAsk
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.RenewableAsk, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RenewableAsk to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RenewableAskSetting. */
    interface IRenewableAskSetting {

        /** RenewableAskSetting id */
        id?: (string|null);

        /** RenewableAskSetting price_ujpy */
        price_ujpy?: (string|null);

        /** RenewableAskSetting amount_uspx */
        amount_uspx?: (string|null);
    }

    /** Represents a RenewableAskSetting. */
    class RenewableAskSetting implements IRenewableAskSetting {

        /**
         * Constructs a new RenewableAskSetting.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IRenewableAskSetting);

        /** RenewableAskSetting id. */
        public id: string;

        /** RenewableAskSetting price_ujpy. */
        public price_ujpy: string;

        /** RenewableAskSetting amount_uspx. */
        public amount_uspx: string;

        /**
         * Encodes the specified RenewableAskSetting message. Does not implicitly {@link main.RenewableAskSetting.verify|verify} messages.
         * @param message RenewableAskSetting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IRenewableAskSetting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RenewableAskSetting message, length delimited. Does not implicitly {@link main.RenewableAskSetting.verify|verify} messages.
         * @param message RenewableAskSetting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IRenewableAskSetting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RenewableAskSetting message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RenewableAskSetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.RenewableAskSetting;

        /**
         * Decodes a RenewableAskSetting message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RenewableAskSetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.RenewableAskSetting;

        /**
         * Verifies a RenewableAskSetting message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RenewableAskSetting message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RenewableAskSetting
         */
        public static fromObject(object: { [k: string]: any }): main.RenewableAskSetting;

        /**
         * Creates a plain object from a RenewableAskSetting message. Also converts values to other types if specified.
         * @param message RenewableAskSetting
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.RenewableAskSetting, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RenewableAskSetting to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RenewableBidDelete. */
    interface IRenewableBidDelete {

        /** RenewableBidDelete id */
        id?: (string|null);

        /** RenewableBidDelete bid_id */
        bid_id?: (string|null);
    }

    /** Represents a RenewableBidDelete. */
    class RenewableBidDelete implements IRenewableBidDelete {

        /**
         * Constructs a new RenewableBidDelete.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IRenewableBidDelete);

        /** RenewableBidDelete id. */
        public id: string;

        /** RenewableBidDelete bid_id. */
        public bid_id: string;

        /**
         * Encodes the specified RenewableBidDelete message. Does not implicitly {@link main.RenewableBidDelete.verify|verify} messages.
         * @param message RenewableBidDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IRenewableBidDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RenewableBidDelete message, length delimited. Does not implicitly {@link main.RenewableBidDelete.verify|verify} messages.
         * @param message RenewableBidDelete message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IRenewableBidDelete, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RenewableBidDelete message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RenewableBidDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.RenewableBidDelete;

        /**
         * Decodes a RenewableBidDelete message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RenewableBidDelete
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.RenewableBidDelete;

        /**
         * Verifies a RenewableBidDelete message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RenewableBidDelete message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RenewableBidDelete
         */
        public static fromObject(object: { [k: string]: any }): main.RenewableBidDelete;

        /**
         * Creates a plain object from a RenewableBidDelete message. Also converts values to other types if specified.
         * @param message RenewableBidDelete
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.RenewableBidDelete, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RenewableBidDelete to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RenewableBidHistory. */
    interface IRenewableBidHistory {

        /** RenewableBidHistory id */
        id?: (string|null);

        /** RenewableBidHistory account_id */
        account_id?: (string|null);

        /** RenewableBidHistory price_ujpy */
        price_ujpy?: (string|null);

        /** RenewableBidHistory amount_uspx */
        amount_uspx?: (string|null);

        /** RenewableBidHistory is_accepted */
        is_accepted?: (boolean|null);

        /** RenewableBidHistory contract_price_ujpy */
        contract_price_ujpy?: (string|null);
    }

    /** Represents a RenewableBidHistory. */
    class RenewableBidHistory implements IRenewableBidHistory {

        /**
         * Constructs a new RenewableBidHistory.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IRenewableBidHistory);

        /** RenewableBidHistory id. */
        public id: string;

        /** RenewableBidHistory account_id. */
        public account_id: string;

        /** RenewableBidHistory price_ujpy. */
        public price_ujpy: string;

        /** RenewableBidHistory amount_uspx. */
        public amount_uspx: string;

        /** RenewableBidHistory is_accepted. */
        public is_accepted: boolean;

        /** RenewableBidHistory contract_price_ujpy. */
        public contract_price_ujpy: string;

        /**
         * Encodes the specified RenewableBidHistory message. Does not implicitly {@link main.RenewableBidHistory.verify|verify} messages.
         * @param message RenewableBidHistory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IRenewableBidHistory, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RenewableBidHistory message, length delimited. Does not implicitly {@link main.RenewableBidHistory.verify|verify} messages.
         * @param message RenewableBidHistory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IRenewableBidHistory, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RenewableBidHistory message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RenewableBidHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.RenewableBidHistory;

        /**
         * Decodes a RenewableBidHistory message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RenewableBidHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.RenewableBidHistory;

        /**
         * Verifies a RenewableBidHistory message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RenewableBidHistory message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RenewableBidHistory
         */
        public static fromObject(object: { [k: string]: any }): main.RenewableBidHistory;

        /**
         * Creates a plain object from a RenewableBidHistory message. Also converts values to other types if specified.
         * @param message RenewableBidHistory
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.RenewableBidHistory, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RenewableBidHistory to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RenewableBid. */
    interface IRenewableBid {

        /** RenewableBid id */
        id?: (string|null);

        /** RenewableBid account_id */
        account_id?: (string|null);

        /** RenewableBid price_ujpy */
        price_ujpy?: (string|null);

        /** RenewableBid amount_uspx */
        amount_uspx?: (string|null);

        /** RenewableBid is_deleted */
        is_deleted?: (boolean|null);
    }

    /** Represents a RenewableBid. */
    class RenewableBid implements IRenewableBid {

        /**
         * Constructs a new RenewableBid.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IRenewableBid);

        /** RenewableBid id. */
        public id: string;

        /** RenewableBid account_id. */
        public account_id: string;

        /** RenewableBid price_ujpy. */
        public price_ujpy: string;

        /** RenewableBid amount_uspx. */
        public amount_uspx: string;

        /** RenewableBid is_deleted. */
        public is_deleted: boolean;

        /**
         * Encodes the specified RenewableBid message. Does not implicitly {@link main.RenewableBid.verify|verify} messages.
         * @param message RenewableBid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IRenewableBid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RenewableBid message, length delimited. Does not implicitly {@link main.RenewableBid.verify|verify} messages.
         * @param message RenewableBid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IRenewableBid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RenewableBid message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RenewableBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.RenewableBid;

        /**
         * Decodes a RenewableBid message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RenewableBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.RenewableBid;

        /**
         * Verifies a RenewableBid message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RenewableBid message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RenewableBid
         */
        public static fromObject(object: { [k: string]: any }): main.RenewableBid;

        /**
         * Creates a plain object from a RenewableBid message. Also converts values to other types if specified.
         * @param message RenewableBid
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.RenewableBid, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RenewableBid to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RenewableRanking. */
    interface IRenewableRanking {

        /** RenewableRanking id */
        id?: (string|null);

        /** RenewableRanking first_student_id */
        first_student_id?: (string|null);

        /** RenewableRanking second_student_id */
        second_student_id?: (string|null);

        /** RenewableRanking third_student_id */
        third_student_id?: (string|null);
    }

    /** Represents a RenewableRanking. */
    class RenewableRanking implements IRenewableRanking {

        /**
         * Constructs a new RenewableRanking.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IRenewableRanking);

        /** RenewableRanking id. */
        public id: string;

        /** RenewableRanking first_student_id. */
        public first_student_id: string;

        /** RenewableRanking second_student_id. */
        public second_student_id: string;

        /** RenewableRanking third_student_id. */
        public third_student_id: string;

        /**
         * Encodes the specified RenewableRanking message. Does not implicitly {@link main.RenewableRanking.verify|verify} messages.
         * @param message RenewableRanking message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IRenewableRanking, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RenewableRanking message, length delimited. Does not implicitly {@link main.RenewableRanking.verify|verify} messages.
         * @param message RenewableRanking message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IRenewableRanking, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RenewableRanking message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RenewableRanking
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.RenewableRanking;

        /**
         * Decodes a RenewableRanking message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RenewableRanking
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.RenewableRanking;

        /**
         * Verifies a RenewableRanking message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RenewableRanking message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RenewableRanking
         */
        public static fromObject(object: { [k: string]: any }): main.RenewableRanking;

        /**
         * Creates a plain object from a RenewableRanking message. Also converts values to other types if specified.
         * @param message RenewableRanking
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.RenewableRanking, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RenewableRanking to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RenewableRewardSetting. */
    interface IRenewableRewardSetting {

        /** RenewableRewardSetting id */
        id?: (string|null);

        /** RenewableRewardSetting first_price_ujpy */
        first_price_ujpy?: (string|null);

        /** RenewableRewardSetting second_price_ujpy */
        second_price_ujpy?: (string|null);

        /** RenewableRewardSetting third_price_ujpy */
        third_price_ujpy?: (string|null);
    }

    /** Represents a RenewableRewardSetting. */
    class RenewableRewardSetting implements IRenewableRewardSetting {

        /**
         * Constructs a new RenewableRewardSetting.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IRenewableRewardSetting);

        /** RenewableRewardSetting id. */
        public id: string;

        /** RenewableRewardSetting first_price_ujpy. */
        public first_price_ujpy: string;

        /** RenewableRewardSetting second_price_ujpy. */
        public second_price_ujpy: string;

        /** RenewableRewardSetting third_price_ujpy. */
        public third_price_ujpy: string;

        /**
         * Encodes the specified RenewableRewardSetting message. Does not implicitly {@link main.RenewableRewardSetting.verify|verify} messages.
         * @param message RenewableRewardSetting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IRenewableRewardSetting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RenewableRewardSetting message, length delimited. Does not implicitly {@link main.RenewableRewardSetting.verify|verify} messages.
         * @param message RenewableRewardSetting message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IRenewableRewardSetting, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RenewableRewardSetting message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RenewableRewardSetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.RenewableRewardSetting;

        /**
         * Decodes a RenewableRewardSetting message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RenewableRewardSetting
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.RenewableRewardSetting;

        /**
         * Verifies a RenewableRewardSetting message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RenewableRewardSetting message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RenewableRewardSetting
         */
        public static fromObject(object: { [k: string]: any }): main.RenewableRewardSetting;

        /**
         * Creates a plain object from a RenewableRewardSetting message. Also converts values to other types if specified.
         * @param message RenewableRewardSetting
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.RenewableRewardSetting, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RenewableRewardSetting to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RenewableSettlement. */
    interface IRenewableSettlement {

        /** RenewableSettlement id */
        id?: (string|null);

        /** RenewableSettlement bid_id */
        bid_id?: (string|null);

        /** RenewableSettlement ask_id */
        ask_id?: (string|null);

        /** RenewableSettlement price_ujpy */
        price_ujpy?: (string|null);

        /** RenewableSettlement amount_uspx */
        amount_uspx?: (string|null);
    }

    /** Represents a RenewableSettlement. */
    class RenewableSettlement implements IRenewableSettlement {

        /**
         * Constructs a new RenewableSettlement.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IRenewableSettlement);

        /** RenewableSettlement id. */
        public id: string;

        /** RenewableSettlement bid_id. */
        public bid_id: string;

        /** RenewableSettlement ask_id. */
        public ask_id: string;

        /** RenewableSettlement price_ujpy. */
        public price_ujpy: string;

        /** RenewableSettlement amount_uspx. */
        public amount_uspx: string;

        /**
         * Encodes the specified RenewableSettlement message. Does not implicitly {@link main.RenewableSettlement.verify|verify} messages.
         * @param message RenewableSettlement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IRenewableSettlement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RenewableSettlement message, length delimited. Does not implicitly {@link main.RenewableSettlement.verify|verify} messages.
         * @param message RenewableSettlement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IRenewableSettlement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RenewableSettlement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RenewableSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.RenewableSettlement;

        /**
         * Decodes a RenewableSettlement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RenewableSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.RenewableSettlement;

        /**
         * Verifies a RenewableSettlement message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RenewableSettlement message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RenewableSettlement
         */
        public static fromObject(object: { [k: string]: any }): main.RenewableSettlement;

        /**
         * Creates a plain object from a RenewableSettlement message. Also converts values to other types if specified.
         * @param message RenewableSettlement
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.RenewableSettlement, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RenewableSettlement to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomChange. */
    interface IRoomChange {

        /** RoomChange id */
        id?: (string|null);

        /** RoomChange student_account_id */
        student_account_id?: (string|null);

        /** RoomChange room_id_before */
        room_id_before?: (string|null);

        /** RoomChange room_id_after */
        room_id_after?: (string|null);
    }

    /** Represents a RoomChange. */
    class RoomChange implements IRoomChange {

        /**
         * Constructs a new RoomChange.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IRoomChange);

        /** RoomChange id. */
        public id: string;

        /** RoomChange student_account_id. */
        public student_account_id: string;

        /** RoomChange room_id_before. */
        public room_id_before: string;

        /** RoomChange room_id_after. */
        public room_id_after: string;

        /**
         * Encodes the specified RoomChange message. Does not implicitly {@link main.RoomChange.verify|verify} messages.
         * @param message RoomChange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IRoomChange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomChange message, length delimited. Does not implicitly {@link main.RoomChange.verify|verify} messages.
         * @param message RoomChange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IRoomChange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomChange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.RoomChange;

        /**
         * Decodes a RoomChange message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.RoomChange;

        /**
         * Verifies a RoomChange message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomChange message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomChange
         */
        public static fromObject(object: { [k: string]: any }): main.RoomChange;

        /**
         * Creates a plain object from a RoomChange message. Also converts values to other types if specified.
         * @param message RoomChange
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.RoomChange, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomChange to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SinglePriceNormalSettlement. */
    interface ISinglePriceNormalSettlement {

        /** SinglePriceNormalSettlement id */
        id?: (string|null);

        /** SinglePriceNormalSettlement price_ujpy */
        price_ujpy?: (string|null);

        /** SinglePriceNormalSettlement amount_uupx */
        amount_uupx?: (string|null);
    }

    /** Represents a SinglePriceNormalSettlement. */
    class SinglePriceNormalSettlement implements ISinglePriceNormalSettlement {

        /**
         * Constructs a new SinglePriceNormalSettlement.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.ISinglePriceNormalSettlement);

        /** SinglePriceNormalSettlement id. */
        public id: string;

        /** SinglePriceNormalSettlement price_ujpy. */
        public price_ujpy: string;

        /** SinglePriceNormalSettlement amount_uupx. */
        public amount_uupx: string;

        /**
         * Encodes the specified SinglePriceNormalSettlement message. Does not implicitly {@link main.SinglePriceNormalSettlement.verify|verify} messages.
         * @param message SinglePriceNormalSettlement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.ISinglePriceNormalSettlement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SinglePriceNormalSettlement message, length delimited. Does not implicitly {@link main.SinglePriceNormalSettlement.verify|verify} messages.
         * @param message SinglePriceNormalSettlement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.ISinglePriceNormalSettlement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SinglePriceNormalSettlement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SinglePriceNormalSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.SinglePriceNormalSettlement;

        /**
         * Decodes a SinglePriceNormalSettlement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SinglePriceNormalSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.SinglePriceNormalSettlement;

        /**
         * Verifies a SinglePriceNormalSettlement message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SinglePriceNormalSettlement message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SinglePriceNormalSettlement
         */
        public static fromObject(object: { [k: string]: any }): main.SinglePriceNormalSettlement;

        /**
         * Creates a plain object from a SinglePriceNormalSettlement message. Also converts values to other types if specified.
         * @param message SinglePriceNormalSettlement
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.SinglePriceNormalSettlement, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SinglePriceNormalSettlement to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SinglePriceRenewableSettlement. */
    interface ISinglePriceRenewableSettlement {

        /** SinglePriceRenewableSettlement id */
        id?: (string|null);

        /** SinglePriceRenewableSettlement price_ujpy */
        price_ujpy?: (string|null);

        /** SinglePriceRenewableSettlement amount_uspx */
        amount_uspx?: (string|null);
    }

    /** Represents a SinglePriceRenewableSettlement. */
    class SinglePriceRenewableSettlement implements ISinglePriceRenewableSettlement {

        /**
         * Constructs a new SinglePriceRenewableSettlement.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.ISinglePriceRenewableSettlement);

        /** SinglePriceRenewableSettlement id. */
        public id: string;

        /** SinglePriceRenewableSettlement price_ujpy. */
        public price_ujpy: string;

        /** SinglePriceRenewableSettlement amount_uspx. */
        public amount_uspx: string;

        /**
         * Encodes the specified SinglePriceRenewableSettlement message. Does not implicitly {@link main.SinglePriceRenewableSettlement.verify|verify} messages.
         * @param message SinglePriceRenewableSettlement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.ISinglePriceRenewableSettlement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SinglePriceRenewableSettlement message, length delimited. Does not implicitly {@link main.SinglePriceRenewableSettlement.verify|verify} messages.
         * @param message SinglePriceRenewableSettlement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.ISinglePriceRenewableSettlement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SinglePriceRenewableSettlement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SinglePriceRenewableSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.SinglePriceRenewableSettlement;

        /**
         * Decodes a SinglePriceRenewableSettlement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SinglePriceRenewableSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.SinglePriceRenewableSettlement;

        /**
         * Verifies a SinglePriceRenewableSettlement message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SinglePriceRenewableSettlement message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SinglePriceRenewableSettlement
         */
        public static fromObject(object: { [k: string]: any }): main.SinglePriceRenewableSettlement;

        /**
         * Creates a plain object from a SinglePriceRenewableSettlement message. Also converts values to other types if specified.
         * @param message SinglePriceRenewableSettlement
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.SinglePriceRenewableSettlement, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SinglePriceRenewableSettlement to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StudentAccount. */
    interface IStudentAccount {

        /** StudentAccount id */
        id?: (string|null);

        /** StudentAccount user_ids */
        user_ids?: (string[]|null);

        /** StudentAccount room_id */
        room_id?: (string|null);

        /** StudentAccount name */
        name?: (string|null);

        /** StudentAccount payment_method */
        payment_method?: (string|null);

        /** StudentAccount xrp_address */
        xrp_address?: (string|null);

        /** StudentAccount xrp_public_key */
        xrp_public_key?: (string|null);
    }

    /** Represents a StudentAccount. */
    class StudentAccount implements IStudentAccount {

        /**
         * Constructs a new StudentAccount.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IStudentAccount);

        /** StudentAccount id. */
        public id: string;

        /** StudentAccount user_ids. */
        public user_ids: string[];

        /** StudentAccount room_id. */
        public room_id: string;

        /** StudentAccount name. */
        public name: string;

        /** StudentAccount payment_method. */
        public payment_method: string;

        /** StudentAccount xrp_address. */
        public xrp_address: string;

        /** StudentAccount xrp_public_key. */
        public xrp_public_key: string;

        /**
         * Encodes the specified StudentAccount message. Does not implicitly {@link main.StudentAccount.verify|verify} messages.
         * @param message StudentAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IStudentAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StudentAccount message, length delimited. Does not implicitly {@link main.StudentAccount.verify|verify} messages.
         * @param message StudentAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IStudentAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StudentAccount message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StudentAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.StudentAccount;

        /**
         * Decodes a StudentAccount message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StudentAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.StudentAccount;

        /**
         * Verifies a StudentAccount message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StudentAccount message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StudentAccount
         */
        public static fromObject(object: { [k: string]: any }): main.StudentAccount;

        /**
         * Creates a plain object from a StudentAccount message. Also converts values to other types if specified.
         * @param message StudentAccount
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.StudentAccount, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StudentAccount to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a User. */
    interface IUser {

        /** User id */
        id?: (string|null);

        /** User current_account_id */
        current_account_id?: (string|null);

        /** User account_ids_order */
        account_ids_order?: (string[]|null);
    }

    /** Represents a User. */
    class User implements IUser {

        /**
         * Constructs a new User.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IUser);

        /** User id. */
        public id: string;

        /** User current_account_id. */
        public current_account_id: string;

        /** User account_ids_order. */
        public account_ids_order: string[];

        /**
         * Encodes the specified User message. Does not implicitly {@link main.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link main.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a User message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.User;

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.User;

        /**
         * Verifies a User message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns User
         */
        public static fromObject(object: { [k: string]: any }): main.User;

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @param message User
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.User, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this User to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: Long;

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
