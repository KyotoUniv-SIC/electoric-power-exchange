/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const main = $root.main = (() => {

    /**
     * Namespace main.
     * @exports main
     * @namespace
     */
    const main = {};

    main.AccountantAccount = (function() {

        /**
         * Properties of an AccountantAccount.
         * @memberof main
         * @interface IAccountantAccount
         * @property {string|null} [id] AccountantAccount id
         * @property {string|null} [name] AccountantAccount name
         * @property {string|null} [xrp_address] AccountantAccount xrp_address
         */

        /**
         * Constructs a new AccountantAccount.
         * @memberof main
         * @classdesc Represents an AccountantAccount.
         * @implements IAccountantAccount
         * @constructor
         * @param {main.IAccountantAccount=} [properties] Properties to set
         */
        function AccountantAccount(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AccountantAccount id.
         * @member {string} id
         * @memberof main.AccountantAccount
         * @instance
         */
        AccountantAccount.prototype.id = "";

        /**
         * AccountantAccount name.
         * @member {string} name
         * @memberof main.AccountantAccount
         * @instance
         */
        AccountantAccount.prototype.name = "";

        /**
         * AccountantAccount xrp_address.
         * @member {string} xrp_address
         * @memberof main.AccountantAccount
         * @instance
         */
        AccountantAccount.prototype.xrp_address = "";

        /**
         * Encodes the specified AccountantAccount message. Does not implicitly {@link main.AccountantAccount.verify|verify} messages.
         * @function encode
         * @memberof main.AccountantAccount
         * @static
         * @param {main.IAccountantAccount} message AccountantAccount message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AccountantAccount.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.xrp_address != null && Object.hasOwnProperty.call(message, "xrp_address"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.xrp_address);
            return writer;
        };

        /**
         * Encodes the specified AccountantAccount message, length delimited. Does not implicitly {@link main.AccountantAccount.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.AccountantAccount
         * @static
         * @param {main.IAccountantAccount} message AccountantAccount message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AccountantAccount.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AccountantAccount message from the specified reader or buffer.
         * @function decode
         * @memberof main.AccountantAccount
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.AccountantAccount} AccountantAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AccountantAccount.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.AccountantAccount();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.xrp_address = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AccountantAccount message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.AccountantAccount
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.AccountantAccount} AccountantAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AccountantAccount.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AccountantAccount message.
         * @function verify
         * @memberof main.AccountantAccount
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AccountantAccount.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.xrp_address != null && message.hasOwnProperty("xrp_address"))
                if (!$util.isString(message.xrp_address))
                    return "xrp_address: string expected";
            return null;
        };

        /**
         * Creates an AccountantAccount message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.AccountantAccount
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.AccountantAccount} AccountantAccount
         */
        AccountantAccount.fromObject = function fromObject(object) {
            if (object instanceof $root.main.AccountantAccount)
                return object;
            let message = new $root.main.AccountantAccount();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.xrp_address != null)
                message.xrp_address = String(object.xrp_address);
            return message;
        };

        /**
         * Creates a plain object from an AccountantAccount message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.AccountantAccount
         * @static
         * @param {main.AccountantAccount} message AccountantAccount
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AccountantAccount.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.xrp_address = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.xrp_address != null && message.hasOwnProperty("xrp_address"))
                object.xrp_address = message.xrp_address;
            return object;
        };

        /**
         * Converts this AccountantAccount to JSON.
         * @function toJSON
         * @memberof main.AccountantAccount
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AccountantAccount.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AccountantAccount;
    })();

    main.AdminAccount = (function() {

        /**
         * Properties of an AdminAccount.
         * @memberof main
         * @interface IAdminAccount
         * @property {string|null} [id] AdminAccount id
         * @property {string|null} [name] AdminAccount name
         * @property {string|null} [xrp_address] AdminAccount xrp_address
         */

        /**
         * Constructs a new AdminAccount.
         * @memberof main
         * @classdesc Represents an AdminAccount.
         * @implements IAdminAccount
         * @constructor
         * @param {main.IAdminAccount=} [properties] Properties to set
         */
        function AdminAccount(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminAccount id.
         * @member {string} id
         * @memberof main.AdminAccount
         * @instance
         */
        AdminAccount.prototype.id = "";

        /**
         * AdminAccount name.
         * @member {string} name
         * @memberof main.AdminAccount
         * @instance
         */
        AdminAccount.prototype.name = "";

        /**
         * AdminAccount xrp_address.
         * @member {string} xrp_address
         * @memberof main.AdminAccount
         * @instance
         */
        AdminAccount.prototype.xrp_address = "";

        /**
         * Encodes the specified AdminAccount message. Does not implicitly {@link main.AdminAccount.verify|verify} messages.
         * @function encode
         * @memberof main.AdminAccount
         * @static
         * @param {main.IAdminAccount} message AdminAccount message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminAccount.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.xrp_address != null && Object.hasOwnProperty.call(message, "xrp_address"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.xrp_address);
            return writer;
        };

        /**
         * Encodes the specified AdminAccount message, length delimited. Does not implicitly {@link main.AdminAccount.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.AdminAccount
         * @static
         * @param {main.IAdminAccount} message AdminAccount message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminAccount.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AdminAccount message from the specified reader or buffer.
         * @function decode
         * @memberof main.AdminAccount
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.AdminAccount} AdminAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminAccount.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.AdminAccount();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.xrp_address = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AdminAccount message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.AdminAccount
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.AdminAccount} AdminAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminAccount.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminAccount message.
         * @function verify
         * @memberof main.AdminAccount
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminAccount.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.xrp_address != null && message.hasOwnProperty("xrp_address"))
                if (!$util.isString(message.xrp_address))
                    return "xrp_address: string expected";
            return null;
        };

        /**
         * Creates an AdminAccount message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.AdminAccount
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.AdminAccount} AdminAccount
         */
        AdminAccount.fromObject = function fromObject(object) {
            if (object instanceof $root.main.AdminAccount)
                return object;
            let message = new $root.main.AdminAccount();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.xrp_address != null)
                message.xrp_address = String(object.xrp_address);
            return message;
        };

        /**
         * Creates a plain object from an AdminAccount message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.AdminAccount
         * @static
         * @param {main.AdminAccount} message AdminAccount
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminAccount.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.xrp_address = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.xrp_address != null && message.hasOwnProperty("xrp_address"))
                object.xrp_address = message.xrp_address;
            return object;
        };

        /**
         * Converts this AdminAccount to JSON.
         * @function toJSON
         * @memberof main.AdminAccount
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminAccount.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AdminAccount;
    })();

    main.Balance = (function() {

        /**
         * Properties of a Balance.
         * @memberof main
         * @interface IBalance
         * @property {string|null} [id] Balance id
         * @property {string|null} [account_id] Balance account_id
         * @property {Long|null} [amount_jpy] Balance amount_jpy
         * @property {Long|null} [amount_xrp] Balance amount_xrp
         */

        /**
         * Constructs a new Balance.
         * @memberof main
         * @classdesc Represents a Balance.
         * @implements IBalance
         * @constructor
         * @param {main.IBalance=} [properties] Properties to set
         */
        function Balance(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Balance id.
         * @member {string} id
         * @memberof main.Balance
         * @instance
         */
        Balance.prototype.id = "";

        /**
         * Balance account_id.
         * @member {string} account_id
         * @memberof main.Balance
         * @instance
         */
        Balance.prototype.account_id = "";

        /**
         * Balance amount_jpy.
         * @member {Long} amount_jpy
         * @memberof main.Balance
         * @instance
         */
        Balance.prototype.amount_jpy = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Balance amount_xrp.
         * @member {Long} amount_xrp
         * @memberof main.Balance
         * @instance
         */
        Balance.prototype.amount_xrp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Encodes the specified Balance message. Does not implicitly {@link main.Balance.verify|verify} messages.
         * @function encode
         * @memberof main.Balance
         * @static
         * @param {main.IBalance} message Balance message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Balance.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.account_id != null && Object.hasOwnProperty.call(message, "account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.account_id);
            if (message.amount_jpy != null && Object.hasOwnProperty.call(message, "amount_jpy"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.amount_jpy);
            if (message.amount_xrp != null && Object.hasOwnProperty.call(message, "amount_xrp"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.amount_xrp);
            return writer;
        };

        /**
         * Encodes the specified Balance message, length delimited. Does not implicitly {@link main.Balance.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.Balance
         * @static
         * @param {main.IBalance} message Balance message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Balance.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Balance message from the specified reader or buffer.
         * @function decode
         * @memberof main.Balance
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.Balance} Balance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Balance.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.Balance();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.account_id = reader.string();
                    break;
                case 3:
                    message.amount_jpy = reader.uint64();
                    break;
                case 4:
                    message.amount_xrp = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Balance message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.Balance
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.Balance} Balance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Balance.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Balance message.
         * @function verify
         * @memberof main.Balance
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Balance.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                if (!$util.isString(message.account_id))
                    return "account_id: string expected";
            if (message.amount_jpy != null && message.hasOwnProperty("amount_jpy"))
                if (!$util.isInteger(message.amount_jpy) && !(message.amount_jpy && $util.isInteger(message.amount_jpy.low) && $util.isInteger(message.amount_jpy.high)))
                    return "amount_jpy: integer|Long expected";
            if (message.amount_xrp != null && message.hasOwnProperty("amount_xrp"))
                if (!$util.isInteger(message.amount_xrp) && !(message.amount_xrp && $util.isInteger(message.amount_xrp.low) && $util.isInteger(message.amount_xrp.high)))
                    return "amount_xrp: integer|Long expected";
            return null;
        };

        /**
         * Creates a Balance message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.Balance
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.Balance} Balance
         */
        Balance.fromObject = function fromObject(object) {
            if (object instanceof $root.main.Balance)
                return object;
            let message = new $root.main.Balance();
            if (object.id != null)
                message.id = String(object.id);
            if (object.account_id != null)
                message.account_id = String(object.account_id);
            if (object.amount_jpy != null)
                if ($util.Long)
                    (message.amount_jpy = $util.Long.fromValue(object.amount_jpy)).unsigned = true;
                else if (typeof object.amount_jpy === "string")
                    message.amount_jpy = parseInt(object.amount_jpy, 10);
                else if (typeof object.amount_jpy === "number")
                    message.amount_jpy = object.amount_jpy;
                else if (typeof object.amount_jpy === "object")
                    message.amount_jpy = new $util.LongBits(object.amount_jpy.low >>> 0, object.amount_jpy.high >>> 0).toNumber(true);
            if (object.amount_xrp != null)
                if ($util.Long)
                    (message.amount_xrp = $util.Long.fromValue(object.amount_xrp)).unsigned = true;
                else if (typeof object.amount_xrp === "string")
                    message.amount_xrp = parseInt(object.amount_xrp, 10);
                else if (typeof object.amount_xrp === "number")
                    message.amount_xrp = object.amount_xrp;
                else if (typeof object.amount_xrp === "object")
                    message.amount_xrp = new $util.LongBits(object.amount_xrp.low >>> 0, object.amount_xrp.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Balance message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.Balance
         * @static
         * @param {main.Balance} message Balance
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Balance.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.account_id = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.amount_jpy = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.amount_jpy = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.amount_xrp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.amount_xrp = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                object.account_id = message.account_id;
            if (message.amount_jpy != null && message.hasOwnProperty("amount_jpy"))
                if (typeof message.amount_jpy === "number")
                    object.amount_jpy = options.longs === String ? String(message.amount_jpy) : message.amount_jpy;
                else
                    object.amount_jpy = options.longs === String ? $util.Long.prototype.toString.call(message.amount_jpy) : options.longs === Number ? new $util.LongBits(message.amount_jpy.low >>> 0, message.amount_jpy.high >>> 0).toNumber(true) : message.amount_jpy;
            if (message.amount_xrp != null && message.hasOwnProperty("amount_xrp"))
                if (typeof message.amount_xrp === "number")
                    object.amount_xrp = options.longs === String ? String(message.amount_xrp) : message.amount_xrp;
                else
                    object.amount_xrp = options.longs === String ? $util.Long.prototype.toString.call(message.amount_xrp) : options.longs === Number ? new $util.LongBits(message.amount_xrp.low >>> 0, message.amount_xrp.high >>> 0).toNumber(true) : message.amount_xrp;
            return object;
        };

        /**
         * Converts this Balance to JSON.
         * @function toJSON
         * @memberof main.Balance
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Balance.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Balance;
    })();

    main.MonthlyUsage = (function() {

        /**
         * Properties of a MonthlyUsage.
         * @memberof main
         * @interface IMonthlyUsage
         * @property {string|null} [id] MonthlyUsage id
         * @property {string|null} [student_account_id] MonthlyUsage student_account_id
         * @property {Long|null} [amount_kwh] MonthlyUsage amount_kwh
         */

        /**
         * Constructs a new MonthlyUsage.
         * @memberof main
         * @classdesc Represents a MonthlyUsage.
         * @implements IMonthlyUsage
         * @constructor
         * @param {main.IMonthlyUsage=} [properties] Properties to set
         */
        function MonthlyUsage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MonthlyUsage id.
         * @member {string} id
         * @memberof main.MonthlyUsage
         * @instance
         */
        MonthlyUsage.prototype.id = "";

        /**
         * MonthlyUsage student_account_id.
         * @member {string} student_account_id
         * @memberof main.MonthlyUsage
         * @instance
         */
        MonthlyUsage.prototype.student_account_id = "";

        /**
         * MonthlyUsage amount_kwh.
         * @member {Long} amount_kwh
         * @memberof main.MonthlyUsage
         * @instance
         */
        MonthlyUsage.prototype.amount_kwh = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Encodes the specified MonthlyUsage message. Does not implicitly {@link main.MonthlyUsage.verify|verify} messages.
         * @function encode
         * @memberof main.MonthlyUsage
         * @static
         * @param {main.IMonthlyUsage} message MonthlyUsage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MonthlyUsage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.student_account_id != null && Object.hasOwnProperty.call(message, "student_account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.student_account_id);
            if (message.amount_kwh != null && Object.hasOwnProperty.call(message, "amount_kwh"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.amount_kwh);
            return writer;
        };

        /**
         * Encodes the specified MonthlyUsage message, length delimited. Does not implicitly {@link main.MonthlyUsage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.MonthlyUsage
         * @static
         * @param {main.IMonthlyUsage} message MonthlyUsage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MonthlyUsage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MonthlyUsage message from the specified reader or buffer.
         * @function decode
         * @memberof main.MonthlyUsage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.MonthlyUsage} MonthlyUsage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MonthlyUsage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.MonthlyUsage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.student_account_id = reader.string();
                    break;
                case 3:
                    message.amount_kwh = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MonthlyUsage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.MonthlyUsage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.MonthlyUsage} MonthlyUsage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MonthlyUsage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MonthlyUsage message.
         * @function verify
         * @memberof main.MonthlyUsage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MonthlyUsage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                if (!$util.isString(message.student_account_id))
                    return "student_account_id: string expected";
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                if (!$util.isInteger(message.amount_kwh) && !(message.amount_kwh && $util.isInteger(message.amount_kwh.low) && $util.isInteger(message.amount_kwh.high)))
                    return "amount_kwh: integer|Long expected";
            return null;
        };

        /**
         * Creates a MonthlyUsage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.MonthlyUsage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.MonthlyUsage} MonthlyUsage
         */
        MonthlyUsage.fromObject = function fromObject(object) {
            if (object instanceof $root.main.MonthlyUsage)
                return object;
            let message = new $root.main.MonthlyUsage();
            if (object.id != null)
                message.id = String(object.id);
            if (object.student_account_id != null)
                message.student_account_id = String(object.student_account_id);
            if (object.amount_kwh != null)
                if ($util.Long)
                    (message.amount_kwh = $util.Long.fromValue(object.amount_kwh)).unsigned = true;
                else if (typeof object.amount_kwh === "string")
                    message.amount_kwh = parseInt(object.amount_kwh, 10);
                else if (typeof object.amount_kwh === "number")
                    message.amount_kwh = object.amount_kwh;
                else if (typeof object.amount_kwh === "object")
                    message.amount_kwh = new $util.LongBits(object.amount_kwh.low >>> 0, object.amount_kwh.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a MonthlyUsage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.MonthlyUsage
         * @static
         * @param {main.MonthlyUsage} message MonthlyUsage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MonthlyUsage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.student_account_id = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.amount_kwh = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.amount_kwh = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                object.student_account_id = message.student_account_id;
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                if (typeof message.amount_kwh === "number")
                    object.amount_kwh = options.longs === String ? String(message.amount_kwh) : message.amount_kwh;
                else
                    object.amount_kwh = options.longs === String ? $util.Long.prototype.toString.call(message.amount_kwh) : options.longs === Number ? new $util.LongBits(message.amount_kwh.low >>> 0, message.amount_kwh.high >>> 0).toNumber(true) : message.amount_kwh;
            return object;
        };

        /**
         * Converts this MonthlyUsage to JSON.
         * @function toJSON
         * @memberof main.MonthlyUsage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MonthlyUsage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MonthlyUsage;
    })();

    main.PowerFromDistLine = (function() {

        /**
         * Properties of a PowerFromDistLine.
         * @memberof main
         * @interface IPowerFromDistLine
         * @property {string|null} [id] PowerFromDistLine id
         * @property {string|null} [student_account_id] PowerFromDistLine student_account_id
         * @property {Long|null} [amount_kwh] PowerFromDistLine amount_kwh
         * @property {Long|null} [price] PowerFromDistLine price
         * @property {string|null} [denom] PowerFromDistLine denom
         */

        /**
         * Constructs a new PowerFromDistLine.
         * @memberof main
         * @classdesc Represents a PowerFromDistLine.
         * @implements IPowerFromDistLine
         * @constructor
         * @param {main.IPowerFromDistLine=} [properties] Properties to set
         */
        function PowerFromDistLine(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PowerFromDistLine id.
         * @member {string} id
         * @memberof main.PowerFromDistLine
         * @instance
         */
        PowerFromDistLine.prototype.id = "";

        /**
         * PowerFromDistLine student_account_id.
         * @member {string} student_account_id
         * @memberof main.PowerFromDistLine
         * @instance
         */
        PowerFromDistLine.prototype.student_account_id = "";

        /**
         * PowerFromDistLine amount_kwh.
         * @member {Long} amount_kwh
         * @memberof main.PowerFromDistLine
         * @instance
         */
        PowerFromDistLine.prototype.amount_kwh = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PowerFromDistLine price.
         * @member {Long} price
         * @memberof main.PowerFromDistLine
         * @instance
         */
        PowerFromDistLine.prototype.price = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PowerFromDistLine denom.
         * @member {string} denom
         * @memberof main.PowerFromDistLine
         * @instance
         */
        PowerFromDistLine.prototype.denom = "";

        /**
         * Encodes the specified PowerFromDistLine message. Does not implicitly {@link main.PowerFromDistLine.verify|verify} messages.
         * @function encode
         * @memberof main.PowerFromDistLine
         * @static
         * @param {main.IPowerFromDistLine} message PowerFromDistLine message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PowerFromDistLine.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.student_account_id != null && Object.hasOwnProperty.call(message, "student_account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.student_account_id);
            if (message.amount_kwh != null && Object.hasOwnProperty.call(message, "amount_kwh"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.amount_kwh);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.price);
            if (message.denom != null && Object.hasOwnProperty.call(message, "denom"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.denom);
            return writer;
        };

        /**
         * Encodes the specified PowerFromDistLine message, length delimited. Does not implicitly {@link main.PowerFromDistLine.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.PowerFromDistLine
         * @static
         * @param {main.IPowerFromDistLine} message PowerFromDistLine message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PowerFromDistLine.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PowerFromDistLine message from the specified reader or buffer.
         * @function decode
         * @memberof main.PowerFromDistLine
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.PowerFromDistLine} PowerFromDistLine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PowerFromDistLine.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.PowerFromDistLine();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.student_account_id = reader.string();
                    break;
                case 3:
                    message.amount_kwh = reader.uint64();
                    break;
                case 4:
                    message.price = reader.uint64();
                    break;
                case 5:
                    message.denom = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PowerFromDistLine message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.PowerFromDistLine
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.PowerFromDistLine} PowerFromDistLine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PowerFromDistLine.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PowerFromDistLine message.
         * @function verify
         * @memberof main.PowerFromDistLine
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PowerFromDistLine.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                if (!$util.isString(message.student_account_id))
                    return "student_account_id: string expected";
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                if (!$util.isInteger(message.amount_kwh) && !(message.amount_kwh && $util.isInteger(message.amount_kwh.low) && $util.isInteger(message.amount_kwh.high)))
                    return "amount_kwh: integer|Long expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (!$util.isInteger(message.price) && !(message.price && $util.isInteger(message.price.low) && $util.isInteger(message.price.high)))
                    return "price: integer|Long expected";
            if (message.denom != null && message.hasOwnProperty("denom"))
                if (!$util.isString(message.denom))
                    return "denom: string expected";
            return null;
        };

        /**
         * Creates a PowerFromDistLine message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.PowerFromDistLine
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.PowerFromDistLine} PowerFromDistLine
         */
        PowerFromDistLine.fromObject = function fromObject(object) {
            if (object instanceof $root.main.PowerFromDistLine)
                return object;
            let message = new $root.main.PowerFromDistLine();
            if (object.id != null)
                message.id = String(object.id);
            if (object.student_account_id != null)
                message.student_account_id = String(object.student_account_id);
            if (object.amount_kwh != null)
                if ($util.Long)
                    (message.amount_kwh = $util.Long.fromValue(object.amount_kwh)).unsigned = true;
                else if (typeof object.amount_kwh === "string")
                    message.amount_kwh = parseInt(object.amount_kwh, 10);
                else if (typeof object.amount_kwh === "number")
                    message.amount_kwh = object.amount_kwh;
                else if (typeof object.amount_kwh === "object")
                    message.amount_kwh = new $util.LongBits(object.amount_kwh.low >>> 0, object.amount_kwh.high >>> 0).toNumber(true);
            if (object.price != null)
                if ($util.Long)
                    (message.price = $util.Long.fromValue(object.price)).unsigned = true;
                else if (typeof object.price === "string")
                    message.price = parseInt(object.price, 10);
                else if (typeof object.price === "number")
                    message.price = object.price;
                else if (typeof object.price === "object")
                    message.price = new $util.LongBits(object.price.low >>> 0, object.price.high >>> 0).toNumber(true);
            if (object.denom != null)
                message.denom = String(object.denom);
            return message;
        };

        /**
         * Creates a plain object from a PowerFromDistLine message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.PowerFromDistLine
         * @static
         * @param {main.PowerFromDistLine} message PowerFromDistLine
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PowerFromDistLine.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.student_account_id = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.amount_kwh = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.amount_kwh = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.price = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.price = options.longs === String ? "0" : 0;
                object.denom = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                object.student_account_id = message.student_account_id;
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                if (typeof message.amount_kwh === "number")
                    object.amount_kwh = options.longs === String ? String(message.amount_kwh) : message.amount_kwh;
                else
                    object.amount_kwh = options.longs === String ? $util.Long.prototype.toString.call(message.amount_kwh) : options.longs === Number ? new $util.LongBits(message.amount_kwh.low >>> 0, message.amount_kwh.high >>> 0).toNumber(true) : message.amount_kwh;
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price === "number")
                    object.price = options.longs === String ? String(message.price) : message.price;
                else
                    object.price = options.longs === String ? $util.Long.prototype.toString.call(message.price) : options.longs === Number ? new $util.LongBits(message.price.low >>> 0, message.price.high >>> 0).toNumber(true) : message.price;
            if (message.denom != null && message.hasOwnProperty("denom"))
                object.denom = message.denom;
            return object;
        };

        /**
         * Converts this PowerFromDistLine to JSON.
         * @function toJSON
         * @memberof main.PowerFromDistLine
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PowerFromDistLine.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PowerFromDistLine;
    })();

    main.PowerFromSolar = (function() {

        /**
         * Properties of a PowerFromSolar.
         * @memberof main
         * @interface IPowerFromSolar
         * @property {string|null} [id] PowerFromSolar id
         * @property {string|null} [student_account_id] PowerFromSolar student_account_id
         * @property {Long|null} [amount_kwh] PowerFromSolar amount_kwh
         * @property {Long|null} [price] PowerFromSolar price
         * @property {string|null} [denom] PowerFromSolar denom
         */

        /**
         * Constructs a new PowerFromSolar.
         * @memberof main
         * @classdesc Represents a PowerFromSolar.
         * @implements IPowerFromSolar
         * @constructor
         * @param {main.IPowerFromSolar=} [properties] Properties to set
         */
        function PowerFromSolar(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PowerFromSolar id.
         * @member {string} id
         * @memberof main.PowerFromSolar
         * @instance
         */
        PowerFromSolar.prototype.id = "";

        /**
         * PowerFromSolar student_account_id.
         * @member {string} student_account_id
         * @memberof main.PowerFromSolar
         * @instance
         */
        PowerFromSolar.prototype.student_account_id = "";

        /**
         * PowerFromSolar amount_kwh.
         * @member {Long} amount_kwh
         * @memberof main.PowerFromSolar
         * @instance
         */
        PowerFromSolar.prototype.amount_kwh = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PowerFromSolar price.
         * @member {Long} price
         * @memberof main.PowerFromSolar
         * @instance
         */
        PowerFromSolar.prototype.price = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PowerFromSolar denom.
         * @member {string} denom
         * @memberof main.PowerFromSolar
         * @instance
         */
        PowerFromSolar.prototype.denom = "";

        /**
         * Encodes the specified PowerFromSolar message. Does not implicitly {@link main.PowerFromSolar.verify|verify} messages.
         * @function encode
         * @memberof main.PowerFromSolar
         * @static
         * @param {main.IPowerFromSolar} message PowerFromSolar message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PowerFromSolar.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.student_account_id != null && Object.hasOwnProperty.call(message, "student_account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.student_account_id);
            if (message.amount_kwh != null && Object.hasOwnProperty.call(message, "amount_kwh"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.amount_kwh);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.price);
            if (message.denom != null && Object.hasOwnProperty.call(message, "denom"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.denom);
            return writer;
        };

        /**
         * Encodes the specified PowerFromSolar message, length delimited. Does not implicitly {@link main.PowerFromSolar.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.PowerFromSolar
         * @static
         * @param {main.IPowerFromSolar} message PowerFromSolar message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PowerFromSolar.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PowerFromSolar message from the specified reader or buffer.
         * @function decode
         * @memberof main.PowerFromSolar
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.PowerFromSolar} PowerFromSolar
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PowerFromSolar.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.PowerFromSolar();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.student_account_id = reader.string();
                    break;
                case 3:
                    message.amount_kwh = reader.uint64();
                    break;
                case 4:
                    message.price = reader.uint64();
                    break;
                case 5:
                    message.denom = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PowerFromSolar message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.PowerFromSolar
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.PowerFromSolar} PowerFromSolar
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PowerFromSolar.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PowerFromSolar message.
         * @function verify
         * @memberof main.PowerFromSolar
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PowerFromSolar.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                if (!$util.isString(message.student_account_id))
                    return "student_account_id: string expected";
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                if (!$util.isInteger(message.amount_kwh) && !(message.amount_kwh && $util.isInteger(message.amount_kwh.low) && $util.isInteger(message.amount_kwh.high)))
                    return "amount_kwh: integer|Long expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (!$util.isInteger(message.price) && !(message.price && $util.isInteger(message.price.low) && $util.isInteger(message.price.high)))
                    return "price: integer|Long expected";
            if (message.denom != null && message.hasOwnProperty("denom"))
                if (!$util.isString(message.denom))
                    return "denom: string expected";
            return null;
        };

        /**
         * Creates a PowerFromSolar message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.PowerFromSolar
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.PowerFromSolar} PowerFromSolar
         */
        PowerFromSolar.fromObject = function fromObject(object) {
            if (object instanceof $root.main.PowerFromSolar)
                return object;
            let message = new $root.main.PowerFromSolar();
            if (object.id != null)
                message.id = String(object.id);
            if (object.student_account_id != null)
                message.student_account_id = String(object.student_account_id);
            if (object.amount_kwh != null)
                if ($util.Long)
                    (message.amount_kwh = $util.Long.fromValue(object.amount_kwh)).unsigned = true;
                else if (typeof object.amount_kwh === "string")
                    message.amount_kwh = parseInt(object.amount_kwh, 10);
                else if (typeof object.amount_kwh === "number")
                    message.amount_kwh = object.amount_kwh;
                else if (typeof object.amount_kwh === "object")
                    message.amount_kwh = new $util.LongBits(object.amount_kwh.low >>> 0, object.amount_kwh.high >>> 0).toNumber(true);
            if (object.price != null)
                if ($util.Long)
                    (message.price = $util.Long.fromValue(object.price)).unsigned = true;
                else if (typeof object.price === "string")
                    message.price = parseInt(object.price, 10);
                else if (typeof object.price === "number")
                    message.price = object.price;
                else if (typeof object.price === "object")
                    message.price = new $util.LongBits(object.price.low >>> 0, object.price.high >>> 0).toNumber(true);
            if (object.denom != null)
                message.denom = String(object.denom);
            return message;
        };

        /**
         * Creates a plain object from a PowerFromSolar message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.PowerFromSolar
         * @static
         * @param {main.PowerFromSolar} message PowerFromSolar
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PowerFromSolar.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.student_account_id = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.amount_kwh = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.amount_kwh = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.price = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.price = options.longs === String ? "0" : 0;
                object.denom = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                object.student_account_id = message.student_account_id;
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                if (typeof message.amount_kwh === "number")
                    object.amount_kwh = options.longs === String ? String(message.amount_kwh) : message.amount_kwh;
                else
                    object.amount_kwh = options.longs === String ? $util.Long.prototype.toString.call(message.amount_kwh) : options.longs === Number ? new $util.LongBits(message.amount_kwh.low >>> 0, message.amount_kwh.high >>> 0).toNumber(true) : message.amount_kwh;
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price === "number")
                    object.price = options.longs === String ? String(message.price) : message.price;
                else
                    object.price = options.longs === String ? $util.Long.prototype.toString.call(message.price) : options.longs === Number ? new $util.LongBits(message.price.low >>> 0, message.price.high >>> 0).toNumber(true) : message.price;
            if (message.denom != null && message.hasOwnProperty("denom"))
                object.denom = message.denom;
            return object;
        };

        /**
         * Converts this PowerFromSolar to JSON.
         * @function toJSON
         * @memberof main.PowerFromSolar
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PowerFromSolar.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PowerFromSolar;
    })();

    main.StudentAccount = (function() {

        /**
         * Properties of a StudentAccount.
         * @memberof main
         * @interface IStudentAccount
         * @property {string|null} [id] StudentAccount id
         * @property {string|null} [name] StudentAccount name
         * @property {string|null} [payment_method] StudentAccount payment_method
         * @property {string|null} [xrp_address] StudentAccount xrp_address
         */

        /**
         * Constructs a new StudentAccount.
         * @memberof main
         * @classdesc Represents a StudentAccount.
         * @implements IStudentAccount
         * @constructor
         * @param {main.IStudentAccount=} [properties] Properties to set
         */
        function StudentAccount(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StudentAccount id.
         * @member {string} id
         * @memberof main.StudentAccount
         * @instance
         */
        StudentAccount.prototype.id = "";

        /**
         * StudentAccount name.
         * @member {string} name
         * @memberof main.StudentAccount
         * @instance
         */
        StudentAccount.prototype.name = "";

        /**
         * StudentAccount payment_method.
         * @member {string} payment_method
         * @memberof main.StudentAccount
         * @instance
         */
        StudentAccount.prototype.payment_method = "";

        /**
         * StudentAccount xrp_address.
         * @member {string} xrp_address
         * @memberof main.StudentAccount
         * @instance
         */
        StudentAccount.prototype.xrp_address = "";

        /**
         * Encodes the specified StudentAccount message. Does not implicitly {@link main.StudentAccount.verify|verify} messages.
         * @function encode
         * @memberof main.StudentAccount
         * @static
         * @param {main.IStudentAccount} message StudentAccount message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StudentAccount.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.payment_method != null && Object.hasOwnProperty.call(message, "payment_method"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.payment_method);
            if (message.xrp_address != null && Object.hasOwnProperty.call(message, "xrp_address"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.xrp_address);
            return writer;
        };

        /**
         * Encodes the specified StudentAccount message, length delimited. Does not implicitly {@link main.StudentAccount.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.StudentAccount
         * @static
         * @param {main.IStudentAccount} message StudentAccount message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StudentAccount.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StudentAccount message from the specified reader or buffer.
         * @function decode
         * @memberof main.StudentAccount
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.StudentAccount} StudentAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StudentAccount.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.StudentAccount();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.payment_method = reader.string();
                    break;
                case 4:
                    message.xrp_address = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StudentAccount message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.StudentAccount
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.StudentAccount} StudentAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StudentAccount.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StudentAccount message.
         * @function verify
         * @memberof main.StudentAccount
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StudentAccount.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.payment_method != null && message.hasOwnProperty("payment_method"))
                if (!$util.isString(message.payment_method))
                    return "payment_method: string expected";
            if (message.xrp_address != null && message.hasOwnProperty("xrp_address"))
                if (!$util.isString(message.xrp_address))
                    return "xrp_address: string expected";
            return null;
        };

        /**
         * Creates a StudentAccount message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.StudentAccount
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.StudentAccount} StudentAccount
         */
        StudentAccount.fromObject = function fromObject(object) {
            if (object instanceof $root.main.StudentAccount)
                return object;
            let message = new $root.main.StudentAccount();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.payment_method != null)
                message.payment_method = String(object.payment_method);
            if (object.xrp_address != null)
                message.xrp_address = String(object.xrp_address);
            return message;
        };

        /**
         * Creates a plain object from a StudentAccount message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.StudentAccount
         * @static
         * @param {main.StudentAccount} message StudentAccount
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StudentAccount.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.payment_method = "";
                object.xrp_address = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.payment_method != null && message.hasOwnProperty("payment_method"))
                object.payment_method = message.payment_method;
            if (message.xrp_address != null && message.hasOwnProperty("xrp_address"))
                object.xrp_address = message.xrp_address;
            return object;
        };

        /**
         * Converts this StudentAccount to JSON.
         * @function toJSON
         * @memberof main.StudentAccount
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StudentAccount.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StudentAccount;
    })();

    main.Transaction = (function() {

        /**
         * Properties of a Transaction.
         * @memberof main
         * @interface ITransaction
         * @property {string|null} [id] Transaction id
         * @property {string|null} [sender_account_id] Transaction sender_account_id
         * @property {string|null} [sender_xrp_address] Transaction sender_xrp_address
         * @property {string|null} [recipient_account_id] Transaction recipient_account_id
         * @property {string|null} [recipient_xrp_address] Transaction recipient_xrp_address
         * @property {Long|null} [amount] Transaction amount
         * @property {string|null} [denom] Transaction denom
         */

        /**
         * Constructs a new Transaction.
         * @memberof main
         * @classdesc Represents a Transaction.
         * @implements ITransaction
         * @constructor
         * @param {main.ITransaction=} [properties] Properties to set
         */
        function Transaction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Transaction id.
         * @member {string} id
         * @memberof main.Transaction
         * @instance
         */
        Transaction.prototype.id = "";

        /**
         * Transaction sender_account_id.
         * @member {string} sender_account_id
         * @memberof main.Transaction
         * @instance
         */
        Transaction.prototype.sender_account_id = "";

        /**
         * Transaction sender_xrp_address.
         * @member {string} sender_xrp_address
         * @memberof main.Transaction
         * @instance
         */
        Transaction.prototype.sender_xrp_address = "";

        /**
         * Transaction recipient_account_id.
         * @member {string} recipient_account_id
         * @memberof main.Transaction
         * @instance
         */
        Transaction.prototype.recipient_account_id = "";

        /**
         * Transaction recipient_xrp_address.
         * @member {string} recipient_xrp_address
         * @memberof main.Transaction
         * @instance
         */
        Transaction.prototype.recipient_xrp_address = "";

        /**
         * Transaction amount.
         * @member {Long} amount
         * @memberof main.Transaction
         * @instance
         */
        Transaction.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Transaction denom.
         * @member {string} denom
         * @memberof main.Transaction
         * @instance
         */
        Transaction.prototype.denom = "";

        /**
         * Encodes the specified Transaction message. Does not implicitly {@link main.Transaction.verify|verify} messages.
         * @function encode
         * @memberof main.Transaction
         * @static
         * @param {main.ITransaction} message Transaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transaction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.sender_account_id != null && Object.hasOwnProperty.call(message, "sender_account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sender_account_id);
            if (message.sender_xrp_address != null && Object.hasOwnProperty.call(message, "sender_xrp_address"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.sender_xrp_address);
            if (message.recipient_account_id != null && Object.hasOwnProperty.call(message, "recipient_account_id"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.recipient_account_id);
            if (message.recipient_xrp_address != null && Object.hasOwnProperty.call(message, "recipient_xrp_address"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.recipient_xrp_address);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.amount);
            if (message.denom != null && Object.hasOwnProperty.call(message, "denom"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.denom);
            return writer;
        };

        /**
         * Encodes the specified Transaction message, length delimited. Does not implicitly {@link main.Transaction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.Transaction
         * @static
         * @param {main.ITransaction} message Transaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transaction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Transaction message from the specified reader or buffer.
         * @function decode
         * @memberof main.Transaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.Transaction} Transaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transaction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.Transaction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.sender_account_id = reader.string();
                    break;
                case 3:
                    message.sender_xrp_address = reader.string();
                    break;
                case 4:
                    message.recipient_account_id = reader.string();
                    break;
                case 5:
                    message.recipient_xrp_address = reader.string();
                    break;
                case 6:
                    message.amount = reader.uint64();
                    break;
                case 7:
                    message.denom = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Transaction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.Transaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.Transaction} Transaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transaction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Transaction message.
         * @function verify
         * @memberof main.Transaction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Transaction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.sender_account_id != null && message.hasOwnProperty("sender_account_id"))
                if (!$util.isString(message.sender_account_id))
                    return "sender_account_id: string expected";
            if (message.sender_xrp_address != null && message.hasOwnProperty("sender_xrp_address"))
                if (!$util.isString(message.sender_xrp_address))
                    return "sender_xrp_address: string expected";
            if (message.recipient_account_id != null && message.hasOwnProperty("recipient_account_id"))
                if (!$util.isString(message.recipient_account_id))
                    return "recipient_account_id: string expected";
            if (message.recipient_xrp_address != null && message.hasOwnProperty("recipient_xrp_address"))
                if (!$util.isString(message.recipient_xrp_address))
                    return "recipient_xrp_address: string expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                    return "amount: integer|Long expected";
            if (message.denom != null && message.hasOwnProperty("denom"))
                if (!$util.isString(message.denom))
                    return "denom: string expected";
            return null;
        };

        /**
         * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.Transaction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.Transaction} Transaction
         */
        Transaction.fromObject = function fromObject(object) {
            if (object instanceof $root.main.Transaction)
                return object;
            let message = new $root.main.Transaction();
            if (object.id != null)
                message.id = String(object.id);
            if (object.sender_account_id != null)
                message.sender_account_id = String(object.sender_account_id);
            if (object.sender_xrp_address != null)
                message.sender_xrp_address = String(object.sender_xrp_address);
            if (object.recipient_account_id != null)
                message.recipient_account_id = String(object.recipient_account_id);
            if (object.recipient_xrp_address != null)
                message.recipient_xrp_address = String(object.recipient_xrp_address);
            if (object.amount != null)
                if ($util.Long)
                    (message.amount = $util.Long.fromValue(object.amount)).unsigned = true;
                else if (typeof object.amount === "string")
                    message.amount = parseInt(object.amount, 10);
                else if (typeof object.amount === "number")
                    message.amount = object.amount;
                else if (typeof object.amount === "object")
                    message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber(true);
            if (object.denom != null)
                message.denom = String(object.denom);
            return message;
        };

        /**
         * Creates a plain object from a Transaction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.Transaction
         * @static
         * @param {main.Transaction} message Transaction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Transaction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.sender_account_id = "";
                object.sender_xrp_address = "";
                object.recipient_account_id = "";
                object.recipient_xrp_address = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.amount = options.longs === String ? "0" : 0;
                object.denom = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.sender_account_id != null && message.hasOwnProperty("sender_account_id"))
                object.sender_account_id = message.sender_account_id;
            if (message.sender_xrp_address != null && message.hasOwnProperty("sender_xrp_address"))
                object.sender_xrp_address = message.sender_xrp_address;
            if (message.recipient_account_id != null && message.hasOwnProperty("recipient_account_id"))
                object.recipient_account_id = message.recipient_account_id;
            if (message.recipient_xrp_address != null && message.hasOwnProperty("recipient_xrp_address"))
                object.recipient_xrp_address = message.recipient_xrp_address;
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount === "number")
                    object.amount = options.longs === String ? String(message.amount) : message.amount;
                else
                    object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber(true) : message.amount;
            if (message.denom != null && message.hasOwnProperty("denom"))
                object.denom = message.denom;
            return object;
        };

        /**
         * Converts this Transaction to JSON.
         * @function toJSON
         * @memberof main.Transaction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Transaction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Transaction;
    })();

    return main;
})();

export { $root as default };
