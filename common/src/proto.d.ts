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

    /** Properties of an AdminAccount. */
    interface IAdminAccount {

        /** AdminAccount id */
        id?: (string|null);

        /** AdminAccount name */
        name?: (string|null);

        /** AdminAccount xrp_address */
        xrp_address?: (string|null);
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

        /** AdminAccount xrp_address. */
        public xrp_address: string;

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

    /** Properties of an AskRequest. */
    interface IAskRequest {

        /** AskRequest id */
        id?: (string|null);

        /** AskRequest account_id */
        account_id?: (string|null);

        /** AskRequest price */
        price?: (Long|null);

        /** AskRequest amount */
        amount?: (Long|null);

        /** AskRequest denom */
        denom?: (Long|null);
    }

    /** Represents an AskRequest. */
    class AskRequest implements IAskRequest {

        /**
         * Constructs a new AskRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IAskRequest);

        /** AskRequest id. */
        public id: string;

        /** AskRequest account_id. */
        public account_id: string;

        /** AskRequest price. */
        public price: Long;

        /** AskRequest amount. */
        public amount: Long;

        /** AskRequest denom. */
        public denom: Long;

        /**
         * Encodes the specified AskRequest message. Does not implicitly {@link main.AskRequest.verify|verify} messages.
         * @param message AskRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IAskRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AskRequest message, length delimited. Does not implicitly {@link main.AskRequest.verify|verify} messages.
         * @param message AskRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IAskRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AskRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AskRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.AskRequest;

        /**
         * Decodes an AskRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AskRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.AskRequest;

        /**
         * Verifies an AskRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AskRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AskRequest
         */
        public static fromObject(object: { [k: string]: any }): main.AskRequest;

        /**
         * Creates a plain object from an AskRequest message. Also converts values to other types if specified.
         * @param message AskRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.AskRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AskRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Balance. */
    interface IBalance {

        /** Balance id */
        id?: (string|null);

        /** Balance account_id */
        account_id?: (string|null);

        /** Balance amount_jpy */
        amount_jpy?: (Long|null);

        /** Balance amount_xrp */
        amount_xrp?: (Long|null);
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

        /** Balance account_id. */
        public account_id: string;

        /** Balance amount_jpy. */
        public amount_jpy: Long;

        /** Balance amount_xrp. */
        public amount_xrp: Long;

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

    /** Properties of a BidRequest. */
    interface IBidRequest {

        /** BidRequest id */
        id?: (string|null);

        /** BidRequest account_id */
        account_id?: (string|null);

        /** BidRequest price */
        price?: (Long|null);

        /** BidRequest amount */
        amount?: (Long|null);

        /** BidRequest denom */
        denom?: (Long|null);
    }

    /** Represents a BidRequest. */
    class BidRequest implements IBidRequest {

        /**
         * Constructs a new BidRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IBidRequest);

        /** BidRequest id. */
        public id: string;

        /** BidRequest account_id. */
        public account_id: string;

        /** BidRequest price. */
        public price: Long;

        /** BidRequest amount. */
        public amount: Long;

        /** BidRequest denom. */
        public denom: Long;

        /**
         * Encodes the specified BidRequest message. Does not implicitly {@link main.BidRequest.verify|verify} messages.
         * @param message BidRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IBidRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BidRequest message, length delimited. Does not implicitly {@link main.BidRequest.verify|verify} messages.
         * @param message BidRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IBidRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BidRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.BidRequest;

        /**
         * Decodes a BidRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.BidRequest;

        /**
         * Verifies a BidRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BidRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BidRequest
         */
        public static fromObject(object: { [k: string]: any }): main.BidRequest;

        /**
         * Creates a plain object from a BidRequest message. Also converts values to other types if specified.
         * @param message BidRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.BidRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BidRequest to JSON.
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

        /** MonthlyUsage amount_kwh */
        amount_kwh?: (Long|null);
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

        /** MonthlyUsage amount_kwh. */
        public amount_kwh: Long;

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

    /** Properties of a SolarPower. */
    interface ISolarPower {

        /** SolarPower id */
        id?: (string|null);

        /** SolarPower student_account_id */
        student_account_id?: (string|null);

        /** SolarPower amount_kwh */
        amount_kwh?: (Long|null);

        /** SolarPower price */
        price?: (Long|null);

        /** SolarPower denom */
        denom?: (string|null);
    }

    /** Represents a SolarPower. */
    class SolarPower implements ISolarPower {

        /**
         * Constructs a new SolarPower.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.ISolarPower);

        /** SolarPower id. */
        public id: string;

        /** SolarPower student_account_id. */
        public student_account_id: string;

        /** SolarPower amount_kwh. */
        public amount_kwh: Long;

        /** SolarPower price. */
        public price: Long;

        /** SolarPower denom. */
        public denom: string;

        /**
         * Encodes the specified SolarPower message. Does not implicitly {@link main.SolarPower.verify|verify} messages.
         * @param message SolarPower message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.ISolarPower, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SolarPower message, length delimited. Does not implicitly {@link main.SolarPower.verify|verify} messages.
         * @param message SolarPower message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.ISolarPower, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SolarPower message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SolarPower
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.SolarPower;

        /**
         * Decodes a SolarPower message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SolarPower
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.SolarPower;

        /**
         * Verifies a SolarPower message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SolarPower message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SolarPower
         */
        public static fromObject(object: { [k: string]: any }): main.SolarPower;

        /**
         * Creates a plain object from a SolarPower message. Also converts values to other types if specified.
         * @param message SolarPower
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.SolarPower, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SolarPower to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StudentAccount. */
    interface IStudentAccount {

        /** StudentAccount id */
        id?: (string|null);

        /** StudentAccount name */
        name?: (string|null);

        /** StudentAccount payment_method */
        payment_method?: (string|null);

        /** StudentAccount xrp_address */
        xrp_address?: (string|null);
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

        /** StudentAccount name. */
        public name: string;

        /** StudentAccount payment_method. */
        public payment_method: string;

        /** StudentAccount xrp_address. */
        public xrp_address: string;

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

    /** Properties of a Transaction. */
    interface ITransaction {

        /** Transaction status */
        status?: (boolean|null);

        /** Transaction id */
        id?: (string|null);

        /** Transaction sender_account_id */
        sender_account_id?: (string|null);

        /** Transaction sender_xrp_address */
        sender_xrp_address?: (string|null);

        /** Transaction recipient_account_id */
        recipient_account_id?: (string|null);

        /** Transaction recipient_xrp_address */
        recipient_xrp_address?: (string|null);

        /** Transaction amount */
        amount?: (Long|null);

        /** Transaction denom */
        denom?: (string|null);
    }

    /** Represents a Transaction. */
    class Transaction implements ITransaction {

        /**
         * Constructs a new Transaction.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.ITransaction);

        /** Transaction status. */
        public status: boolean;

        /** Transaction id. */
        public id: string;

        /** Transaction sender_account_id. */
        public sender_account_id: string;

        /** Transaction sender_xrp_address. */
        public sender_xrp_address: string;

        /** Transaction recipient_account_id. */
        public recipient_account_id: string;

        /** Transaction recipient_xrp_address. */
        public recipient_xrp_address: string;

        /** Transaction amount. */
        public amount: Long;

        /** Transaction denom. */
        public denom: string;

        /**
         * Encodes the specified Transaction message. Does not implicitly {@link main.Transaction.verify|verify} messages.
         * @param message Transaction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.ITransaction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Transaction message, length delimited. Does not implicitly {@link main.Transaction.verify|verify} messages.
         * @param message Transaction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.ITransaction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Transaction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Transaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.Transaction;

        /**
         * Decodes a Transaction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Transaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.Transaction;

        /**
         * Verifies a Transaction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Transaction
         */
        public static fromObject(object: { [k: string]: any }): main.Transaction;

        /**
         * Creates a plain object from a Transaction message. Also converts values to other types if specified.
         * @param message Transaction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.Transaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Transaction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UtilityPower. */
    interface IUtilityPower {

        /** UtilityPower id */
        id?: (string|null);

        /** UtilityPower student_account_id */
        student_account_id?: (string|null);

        /** UtilityPower amount_kwh */
        amount_kwh?: (Long|null);

        /** UtilityPower price */
        price?: (Long|null);

        /** UtilityPower denom */
        denom?: (string|null);
    }

    /** Represents an UtilityPower. */
    class UtilityPower implements IUtilityPower {

        /**
         * Constructs a new UtilityPower.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IUtilityPower);

        /** UtilityPower id. */
        public id: string;

        /** UtilityPower student_account_id. */
        public student_account_id: string;

        /** UtilityPower amount_kwh. */
        public amount_kwh: Long;

        /** UtilityPower price. */
        public price: Long;

        /** UtilityPower denom. */
        public denom: string;

        /**
         * Encodes the specified UtilityPower message. Does not implicitly {@link main.UtilityPower.verify|verify} messages.
         * @param message UtilityPower message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IUtilityPower, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UtilityPower message, length delimited. Does not implicitly {@link main.UtilityPower.verify|verify} messages.
         * @param message UtilityPower message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IUtilityPower, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UtilityPower message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UtilityPower
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.UtilityPower;

        /**
         * Decodes an UtilityPower message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UtilityPower
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.UtilityPower;

        /**
         * Verifies an UtilityPower message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UtilityPower message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UtilityPower
         */
        public static fromObject(object: { [k: string]: any }): main.UtilityPower;

        /**
         * Creates a plain object from an UtilityPower message. Also converts values to other types if specified.
         * @param message UtilityPower
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.UtilityPower, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UtilityPower to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
