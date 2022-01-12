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

    /**
     * AccountType enum.
     * @name main.AccountType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} ADMIN=1 ADMIN value
     * @property {number} STUDENT=2 STUDENT value
     * @property {number} ACCOUNTANT=3 ACCOUNTANT value
     */
    main.AccountType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "ADMIN"] = 1;
        values[valuesById[2] = "STUDENT"] = 2;
        values[valuesById[3] = "ACCOUNTANT"] = 3;
        return values;
    })();

    main.Account = (function() {

        /**
         * Properties of an Account.
         * @memberof main
         * @interface IAccount
         * @property {string|null} [id] Account id
         * @property {Array.<string>|null} [user_ids] Account user_ids
         * @property {Array.<string>|null} [admin_user_ids] Account admin_user_ids
         * @property {string|null} [name] Account name
         * @property {string|null} [image_url] Account image_url
         * @property {main.AccountType|null} [type] Account type
         */

        /**
         * Constructs a new Account.
         * @memberof main
         * @classdesc Represents an Account.
         * @implements IAccount
         * @constructor
         * @param {main.IAccount=} [properties] Properties to set
         */
        function Account(properties) {
            this.user_ids = [];
            this.admin_user_ids = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Account id.
         * @member {string} id
         * @memberof main.Account
         * @instance
         */
        Account.prototype.id = "";

        /**
         * Account user_ids.
         * @member {Array.<string>} user_ids
         * @memberof main.Account
         * @instance
         */
        Account.prototype.user_ids = $util.emptyArray;

        /**
         * Account admin_user_ids.
         * @member {Array.<string>} admin_user_ids
         * @memberof main.Account
         * @instance
         */
        Account.prototype.admin_user_ids = $util.emptyArray;

        /**
         * Account name.
         * @member {string} name
         * @memberof main.Account
         * @instance
         */
        Account.prototype.name = "";

        /**
         * Account image_url.
         * @member {string} image_url
         * @memberof main.Account
         * @instance
         */
        Account.prototype.image_url = "";

        /**
         * Account type.
         * @member {main.AccountType} type
         * @memberof main.Account
         * @instance
         */
        Account.prototype.type = 0;

        /**
         * Encodes the specified Account message. Does not implicitly {@link main.Account.verify|verify} messages.
         * @function encode
         * @memberof main.Account
         * @static
         * @param {main.IAccount} message Account message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Account.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.user_ids != null && message.user_ids.length)
                for (let i = 0; i < message.user_ids.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.user_ids[i]);
            if (message.admin_user_ids != null && message.admin_user_ids.length)
                for (let i = 0; i < message.admin_user_ids.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.admin_user_ids[i]);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
            if (message.image_url != null && Object.hasOwnProperty.call(message, "image_url"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.image_url);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified Account message, length delimited. Does not implicitly {@link main.Account.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.Account
         * @static
         * @param {main.IAccount} message Account message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Account.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Account message from the specified reader or buffer.
         * @function decode
         * @memberof main.Account
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.Account} Account
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Account.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.Account();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    if (!(message.user_ids && message.user_ids.length))
                        message.user_ids = [];
                    message.user_ids.push(reader.string());
                    break;
                case 3:
                    if (!(message.admin_user_ids && message.admin_user_ids.length))
                        message.admin_user_ids = [];
                    message.admin_user_ids.push(reader.string());
                    break;
                case 4:
                    message.name = reader.string();
                    break;
                case 5:
                    message.image_url = reader.string();
                    break;
                case 6:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Account message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.Account
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.Account} Account
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Account.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Account message.
         * @function verify
         * @memberof main.Account
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Account.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.user_ids != null && message.hasOwnProperty("user_ids")) {
                if (!Array.isArray(message.user_ids))
                    return "user_ids: array expected";
                for (let i = 0; i < message.user_ids.length; ++i)
                    if (!$util.isString(message.user_ids[i]))
                        return "user_ids: string[] expected";
            }
            if (message.admin_user_ids != null && message.hasOwnProperty("admin_user_ids")) {
                if (!Array.isArray(message.admin_user_ids))
                    return "admin_user_ids: array expected";
                for (let i = 0; i < message.admin_user_ids.length; ++i)
                    if (!$util.isString(message.admin_user_ids[i]))
                        return "admin_user_ids: string[] expected";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.image_url != null && message.hasOwnProperty("image_url"))
                if (!$util.isString(message.image_url))
                    return "image_url: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates an Account message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.Account
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.Account} Account
         */
        Account.fromObject = function fromObject(object) {
            if (object instanceof $root.main.Account)
                return object;
            let message = new $root.main.Account();
            if (object.id != null)
                message.id = String(object.id);
            if (object.user_ids) {
                if (!Array.isArray(object.user_ids))
                    throw TypeError(".main.Account.user_ids: array expected");
                message.user_ids = [];
                for (let i = 0; i < object.user_ids.length; ++i)
                    message.user_ids[i] = String(object.user_ids[i]);
            }
            if (object.admin_user_ids) {
                if (!Array.isArray(object.admin_user_ids))
                    throw TypeError(".main.Account.admin_user_ids: array expected");
                message.admin_user_ids = [];
                for (let i = 0; i < object.admin_user_ids.length; ++i)
                    message.admin_user_ids[i] = String(object.admin_user_ids[i]);
            }
            if (object.name != null)
                message.name = String(object.name);
            if (object.image_url != null)
                message.image_url = String(object.image_url);
            switch (object.type) {
            case "UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "ADMIN":
            case 1:
                message.type = 1;
                break;
            case "STUDENT":
            case 2:
                message.type = 2;
                break;
            case "ACCOUNTANT":
            case 3:
                message.type = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an Account message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.Account
         * @static
         * @param {main.Account} message Account
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Account.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.user_ids = [];
                object.admin_user_ids = [];
            }
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.image_url = "";
                object.type = options.enums === String ? "UNKNOWN" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.user_ids && message.user_ids.length) {
                object.user_ids = [];
                for (let j = 0; j < message.user_ids.length; ++j)
                    object.user_ids[j] = message.user_ids[j];
            }
            if (message.admin_user_ids && message.admin_user_ids.length) {
                object.admin_user_ids = [];
                for (let j = 0; j < message.admin_user_ids.length; ++j)
                    object.admin_user_ids[j] = message.admin_user_ids[j];
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.image_url != null && message.hasOwnProperty("image_url"))
                object.image_url = message.image_url;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.main.AccountType[message.type] : message.type;
            return object;
        };

        /**
         * Converts this Account to JSON.
         * @function toJSON
         * @memberof main.Account
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Account.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Account;
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

    main.AvailableBalance = (function() {

        /**
         * Properties of an AvailableBalance.
         * @memberof main
         * @interface IAvailableBalance
         * @property {string|null} [id] AvailableBalance id
         * @property {string|null} [student_account_id] AvailableBalance student_account_id
         * @property {number|null} [amount_upx] AvailableBalance amount_upx
         * @property {number|null} [amount_spx] AvailableBalance amount_spx
         */

        /**
         * Constructs a new AvailableBalance.
         * @memberof main
         * @classdesc Represents an AvailableBalance.
         * @implements IAvailableBalance
         * @constructor
         * @param {main.IAvailableBalance=} [properties] Properties to set
         */
        function AvailableBalance(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AvailableBalance id.
         * @member {string} id
         * @memberof main.AvailableBalance
         * @instance
         */
        AvailableBalance.prototype.id = "";

        /**
         * AvailableBalance student_account_id.
         * @member {string} student_account_id
         * @memberof main.AvailableBalance
         * @instance
         */
        AvailableBalance.prototype.student_account_id = "";

        /**
         * AvailableBalance amount_upx.
         * @member {number} amount_upx
         * @memberof main.AvailableBalance
         * @instance
         */
        AvailableBalance.prototype.amount_upx = 0;

        /**
         * AvailableBalance amount_spx.
         * @member {number} amount_spx
         * @memberof main.AvailableBalance
         * @instance
         */
        AvailableBalance.prototype.amount_spx = 0;

        /**
         * Encodes the specified AvailableBalance message. Does not implicitly {@link main.AvailableBalance.verify|verify} messages.
         * @function encode
         * @memberof main.AvailableBalance
         * @static
         * @param {main.IAvailableBalance} message AvailableBalance message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AvailableBalance.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.student_account_id != null && Object.hasOwnProperty.call(message, "student_account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.student_account_id);
            if (message.amount_upx != null && Object.hasOwnProperty.call(message, "amount_upx"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.amount_upx);
            if (message.amount_spx != null && Object.hasOwnProperty.call(message, "amount_spx"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.amount_spx);
            return writer;
        };

        /**
         * Encodes the specified AvailableBalance message, length delimited. Does not implicitly {@link main.AvailableBalance.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.AvailableBalance
         * @static
         * @param {main.IAvailableBalance} message AvailableBalance message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AvailableBalance.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AvailableBalance message from the specified reader or buffer.
         * @function decode
         * @memberof main.AvailableBalance
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.AvailableBalance} AvailableBalance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AvailableBalance.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.AvailableBalance();
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
                    message.amount_upx = reader.double();
                    break;
                case 4:
                    message.amount_spx = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AvailableBalance message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.AvailableBalance
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.AvailableBalance} AvailableBalance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AvailableBalance.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AvailableBalance message.
         * @function verify
         * @memberof main.AvailableBalance
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AvailableBalance.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                if (!$util.isString(message.student_account_id))
                    return "student_account_id: string expected";
            if (message.amount_upx != null && message.hasOwnProperty("amount_upx"))
                if (typeof message.amount_upx !== "number")
                    return "amount_upx: number expected";
            if (message.amount_spx != null && message.hasOwnProperty("amount_spx"))
                if (typeof message.amount_spx !== "number")
                    return "amount_spx: number expected";
            return null;
        };

        /**
         * Creates an AvailableBalance message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.AvailableBalance
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.AvailableBalance} AvailableBalance
         */
        AvailableBalance.fromObject = function fromObject(object) {
            if (object instanceof $root.main.AvailableBalance)
                return object;
            let message = new $root.main.AvailableBalance();
            if (object.id != null)
                message.id = String(object.id);
            if (object.student_account_id != null)
                message.student_account_id = String(object.student_account_id);
            if (object.amount_upx != null)
                message.amount_upx = Number(object.amount_upx);
            if (object.amount_spx != null)
                message.amount_spx = Number(object.amount_spx);
            return message;
        };

        /**
         * Creates a plain object from an AvailableBalance message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.AvailableBalance
         * @static
         * @param {main.AvailableBalance} message AvailableBalance
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AvailableBalance.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.student_account_id = "";
                object.amount_upx = 0;
                object.amount_spx = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                object.student_account_id = message.student_account_id;
            if (message.amount_upx != null && message.hasOwnProperty("amount_upx"))
                object.amount_upx = options.json && !isFinite(message.amount_upx) ? String(message.amount_upx) : message.amount_upx;
            if (message.amount_spx != null && message.hasOwnProperty("amount_spx"))
                object.amount_spx = options.json && !isFinite(message.amount_spx) ? String(message.amount_spx) : message.amount_spx;
            return object;
        };

        /**
         * Converts this AvailableBalance to JSON.
         * @function toJSON
         * @memberof main.AvailableBalance
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AvailableBalance.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AvailableBalance;
    })();

    main.BalanceSnapshot = (function() {

        /**
         * Properties of a BalanceSnapshot.
         * @memberof main
         * @interface IBalanceSnapshot
         * @property {string|null} [id] BalanceSnapshot id
         * @property {string|null} [student_account_id] BalanceSnapshot student_account_id
         * @property {number|null} [amount_upx] BalanceSnapshot amount_upx
         * @property {number|null} [amount_spx] BalanceSnapshot amount_spx
         */

        /**
         * Constructs a new BalanceSnapshot.
         * @memberof main
         * @classdesc Represents a BalanceSnapshot.
         * @implements IBalanceSnapshot
         * @constructor
         * @param {main.IBalanceSnapshot=} [properties] Properties to set
         */
        function BalanceSnapshot(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BalanceSnapshot id.
         * @member {string} id
         * @memberof main.BalanceSnapshot
         * @instance
         */
        BalanceSnapshot.prototype.id = "";

        /**
         * BalanceSnapshot student_account_id.
         * @member {string} student_account_id
         * @memberof main.BalanceSnapshot
         * @instance
         */
        BalanceSnapshot.prototype.student_account_id = "";

        /**
         * BalanceSnapshot amount_upx.
         * @member {number} amount_upx
         * @memberof main.BalanceSnapshot
         * @instance
         */
        BalanceSnapshot.prototype.amount_upx = 0;

        /**
         * BalanceSnapshot amount_spx.
         * @member {number} amount_spx
         * @memberof main.BalanceSnapshot
         * @instance
         */
        BalanceSnapshot.prototype.amount_spx = 0;

        /**
         * Encodes the specified BalanceSnapshot message. Does not implicitly {@link main.BalanceSnapshot.verify|verify} messages.
         * @function encode
         * @memberof main.BalanceSnapshot
         * @static
         * @param {main.IBalanceSnapshot} message BalanceSnapshot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BalanceSnapshot.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.student_account_id != null && Object.hasOwnProperty.call(message, "student_account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.student_account_id);
            if (message.amount_upx != null && Object.hasOwnProperty.call(message, "amount_upx"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.amount_upx);
            if (message.amount_spx != null && Object.hasOwnProperty.call(message, "amount_spx"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.amount_spx);
            return writer;
        };

        /**
         * Encodes the specified BalanceSnapshot message, length delimited. Does not implicitly {@link main.BalanceSnapshot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.BalanceSnapshot
         * @static
         * @param {main.IBalanceSnapshot} message BalanceSnapshot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BalanceSnapshot.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BalanceSnapshot message from the specified reader or buffer.
         * @function decode
         * @memberof main.BalanceSnapshot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.BalanceSnapshot} BalanceSnapshot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BalanceSnapshot.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.BalanceSnapshot();
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
                    message.amount_upx = reader.double();
                    break;
                case 4:
                    message.amount_spx = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BalanceSnapshot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.BalanceSnapshot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.BalanceSnapshot} BalanceSnapshot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BalanceSnapshot.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BalanceSnapshot message.
         * @function verify
         * @memberof main.BalanceSnapshot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BalanceSnapshot.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                if (!$util.isString(message.student_account_id))
                    return "student_account_id: string expected";
            if (message.amount_upx != null && message.hasOwnProperty("amount_upx"))
                if (typeof message.amount_upx !== "number")
                    return "amount_upx: number expected";
            if (message.amount_spx != null && message.hasOwnProperty("amount_spx"))
                if (typeof message.amount_spx !== "number")
                    return "amount_spx: number expected";
            return null;
        };

        /**
         * Creates a BalanceSnapshot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.BalanceSnapshot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.BalanceSnapshot} BalanceSnapshot
         */
        BalanceSnapshot.fromObject = function fromObject(object) {
            if (object instanceof $root.main.BalanceSnapshot)
                return object;
            let message = new $root.main.BalanceSnapshot();
            if (object.id != null)
                message.id = String(object.id);
            if (object.student_account_id != null)
                message.student_account_id = String(object.student_account_id);
            if (object.amount_upx != null)
                message.amount_upx = Number(object.amount_upx);
            if (object.amount_spx != null)
                message.amount_spx = Number(object.amount_spx);
            return message;
        };

        /**
         * Creates a plain object from a BalanceSnapshot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.BalanceSnapshot
         * @static
         * @param {main.BalanceSnapshot} message BalanceSnapshot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BalanceSnapshot.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.student_account_id = "";
                object.amount_upx = 0;
                object.amount_spx = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                object.student_account_id = message.student_account_id;
            if (message.amount_upx != null && message.hasOwnProperty("amount_upx"))
                object.amount_upx = options.json && !isFinite(message.amount_upx) ? String(message.amount_upx) : message.amount_upx;
            if (message.amount_spx != null && message.hasOwnProperty("amount_spx"))
                object.amount_spx = options.json && !isFinite(message.amount_spx) ? String(message.amount_spx) : message.amount_spx;
            return object;
        };

        /**
         * Converts this BalanceSnapshot to JSON.
         * @function toJSON
         * @memberof main.BalanceSnapshot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BalanceSnapshot.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BalanceSnapshot;
    })();

    main.Balance = (function() {

        /**
         * Properties of a Balance.
         * @memberof main
         * @interface IBalance
         * @property {string|null} [id] Balance id
         * @property {string|null} [student_account_id] Balance student_account_id
         * @property {number|null} [amount_upx] Balance amount_upx
         * @property {number|null} [amount_spx] Balance amount_spx
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
         * Balance student_account_id.
         * @member {string} student_account_id
         * @memberof main.Balance
         * @instance
         */
        Balance.prototype.student_account_id = "";

        /**
         * Balance amount_upx.
         * @member {number} amount_upx
         * @memberof main.Balance
         * @instance
         */
        Balance.prototype.amount_upx = 0;

        /**
         * Balance amount_spx.
         * @member {number} amount_spx
         * @memberof main.Balance
         * @instance
         */
        Balance.prototype.amount_spx = 0;

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
            if (message.student_account_id != null && Object.hasOwnProperty.call(message, "student_account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.student_account_id);
            if (message.amount_upx != null && Object.hasOwnProperty.call(message, "amount_upx"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.amount_upx);
            if (message.amount_spx != null && Object.hasOwnProperty.call(message, "amount_spx"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.amount_spx);
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
                    message.student_account_id = reader.string();
                    break;
                case 3:
                    message.amount_upx = reader.double();
                    break;
                case 4:
                    message.amount_spx = reader.double();
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
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                if (!$util.isString(message.student_account_id))
                    return "student_account_id: string expected";
            if (message.amount_upx != null && message.hasOwnProperty("amount_upx"))
                if (typeof message.amount_upx !== "number")
                    return "amount_upx: number expected";
            if (message.amount_spx != null && message.hasOwnProperty("amount_spx"))
                if (typeof message.amount_spx !== "number")
                    return "amount_spx: number expected";
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
            if (object.student_account_id != null)
                message.student_account_id = String(object.student_account_id);
            if (object.amount_upx != null)
                message.amount_upx = Number(object.amount_upx);
            if (object.amount_spx != null)
                message.amount_spx = Number(object.amount_spx);
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
                object.student_account_id = "";
                object.amount_upx = 0;
                object.amount_spx = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                object.student_account_id = message.student_account_id;
            if (message.amount_upx != null && message.hasOwnProperty("amount_upx"))
                object.amount_upx = options.json && !isFinite(message.amount_upx) ? String(message.amount_upx) : message.amount_upx;
            if (message.amount_spx != null && message.hasOwnProperty("amount_spx"))
                object.amount_spx = options.json && !isFinite(message.amount_spx) ? String(message.amount_spx) : message.amount_spx;
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

    main.Chat = (function() {

        /**
         * Properties of a Chat.
         * @memberof main
         * @interface IChat
         * @property {string|null} [id] Chat id
         * @property {string|null} [name] Chat name
         * @property {string|null} [user1] Chat user1
         * @property {string|null} [user2] Chat user2
         */

        /**
         * Constructs a new Chat.
         * @memberof main
         * @classdesc Represents a Chat.
         * @implements IChat
         * @constructor
         * @param {main.IChat=} [properties] Properties to set
         */
        function Chat(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Chat id.
         * @member {string} id
         * @memberof main.Chat
         * @instance
         */
        Chat.prototype.id = "";

        /**
         * Chat name.
         * @member {string} name
         * @memberof main.Chat
         * @instance
         */
        Chat.prototype.name = "";

        /**
         * Chat user1.
         * @member {string} user1
         * @memberof main.Chat
         * @instance
         */
        Chat.prototype.user1 = "";

        /**
         * Chat user2.
         * @member {string} user2
         * @memberof main.Chat
         * @instance
         */
        Chat.prototype.user2 = "";

        /**
         * Encodes the specified Chat message. Does not implicitly {@link main.Chat.verify|verify} messages.
         * @function encode
         * @memberof main.Chat
         * @static
         * @param {main.IChat} message Chat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Chat.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.user1 != null && Object.hasOwnProperty.call(message, "user1"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.user1);
            if (message.user2 != null && Object.hasOwnProperty.call(message, "user2"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.user2);
            return writer;
        };

        /**
         * Encodes the specified Chat message, length delimited. Does not implicitly {@link main.Chat.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.Chat
         * @static
         * @param {main.IChat} message Chat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Chat.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Chat message from the specified reader or buffer.
         * @function decode
         * @memberof main.Chat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.Chat} Chat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Chat.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.Chat();
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
                    message.user1 = reader.string();
                    break;
                case 4:
                    message.user2 = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Chat message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.Chat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.Chat} Chat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Chat.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Chat message.
         * @function verify
         * @memberof main.Chat
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Chat.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.user1 != null && message.hasOwnProperty("user1"))
                if (!$util.isString(message.user1))
                    return "user1: string expected";
            if (message.user2 != null && message.hasOwnProperty("user2"))
                if (!$util.isString(message.user2))
                    return "user2: string expected";
            return null;
        };

        /**
         * Creates a Chat message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.Chat
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.Chat} Chat
         */
        Chat.fromObject = function fromObject(object) {
            if (object instanceof $root.main.Chat)
                return object;
            let message = new $root.main.Chat();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.user1 != null)
                message.user1 = String(object.user1);
            if (object.user2 != null)
                message.user2 = String(object.user2);
            return message;
        };

        /**
         * Creates a plain object from a Chat message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.Chat
         * @static
         * @param {main.Chat} message Chat
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Chat.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.user1 = "";
                object.user2 = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.user1 != null && message.hasOwnProperty("user1"))
                object.user1 = message.user1;
            if (message.user2 != null && message.hasOwnProperty("user2"))
                object.user2 = message.user2;
            return object;
        };

        /**
         * Converts this Chat to JSON.
         * @function toJSON
         * @memberof main.Chat
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Chat.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Chat;
    })();

    main.DailyUsage = (function() {

        /**
         * Properties of a DailyUsage.
         * @memberof main
         * @interface IDailyUsage
         * @property {string|null} [id] DailyUsage id
         * @property {string|null} [student_account_id] DailyUsage student_account_id
         * @property {number|null} [amount_kwh] DailyUsage amount_kwh
         */

        /**
         * Constructs a new DailyUsage.
         * @memberof main
         * @classdesc Represents a DailyUsage.
         * @implements IDailyUsage
         * @constructor
         * @param {main.IDailyUsage=} [properties] Properties to set
         */
        function DailyUsage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DailyUsage id.
         * @member {string} id
         * @memberof main.DailyUsage
         * @instance
         */
        DailyUsage.prototype.id = "";

        /**
         * DailyUsage student_account_id.
         * @member {string} student_account_id
         * @memberof main.DailyUsage
         * @instance
         */
        DailyUsage.prototype.student_account_id = "";

        /**
         * DailyUsage amount_kwh.
         * @member {number} amount_kwh
         * @memberof main.DailyUsage
         * @instance
         */
        DailyUsage.prototype.amount_kwh = 0;

        /**
         * Encodes the specified DailyUsage message. Does not implicitly {@link main.DailyUsage.verify|verify} messages.
         * @function encode
         * @memberof main.DailyUsage
         * @static
         * @param {main.IDailyUsage} message DailyUsage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DailyUsage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.student_account_id != null && Object.hasOwnProperty.call(message, "student_account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.student_account_id);
            if (message.amount_kwh != null && Object.hasOwnProperty.call(message, "amount_kwh"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.amount_kwh);
            return writer;
        };

        /**
         * Encodes the specified DailyUsage message, length delimited. Does not implicitly {@link main.DailyUsage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.DailyUsage
         * @static
         * @param {main.IDailyUsage} message DailyUsage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DailyUsage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DailyUsage message from the specified reader or buffer.
         * @function decode
         * @memberof main.DailyUsage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.DailyUsage} DailyUsage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DailyUsage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.DailyUsage();
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
                    message.amount_kwh = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DailyUsage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.DailyUsage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.DailyUsage} DailyUsage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DailyUsage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DailyUsage message.
         * @function verify
         * @memberof main.DailyUsage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DailyUsage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                if (!$util.isString(message.student_account_id))
                    return "student_account_id: string expected";
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                if (typeof message.amount_kwh !== "number")
                    return "amount_kwh: number expected";
            return null;
        };

        /**
         * Creates a DailyUsage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.DailyUsage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.DailyUsage} DailyUsage
         */
        DailyUsage.fromObject = function fromObject(object) {
            if (object instanceof $root.main.DailyUsage)
                return object;
            let message = new $root.main.DailyUsage();
            if (object.id != null)
                message.id = String(object.id);
            if (object.student_account_id != null)
                message.student_account_id = String(object.student_account_id);
            if (object.amount_kwh != null)
                message.amount_kwh = Number(object.amount_kwh);
            return message;
        };

        /**
         * Creates a plain object from a DailyUsage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.DailyUsage
         * @static
         * @param {main.DailyUsage} message DailyUsage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DailyUsage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.student_account_id = "";
                object.amount_kwh = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                object.student_account_id = message.student_account_id;
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                object.amount_kwh = options.json && !isFinite(message.amount_kwh) ? String(message.amount_kwh) : message.amount_kwh;
            return object;
        };

        /**
         * Converts this DailyUsage to JSON.
         * @function toJSON
         * @memberof main.DailyUsage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DailyUsage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DailyUsage;
    })();

    main.DiscountPrice = (function() {

        /**
         * Properties of a DiscountPrice.
         * @memberof main
         * @interface IDiscountPrice
         * @property {string|null} [id] DiscountPrice id
         * @property {number|null} [price] DiscountPrice price
         * @property {number|null} [amount_purchase] DiscountPrice amount_purchase
         * @property {number|null} [amount_sale] DiscountPrice amount_sale
         */

        /**
         * Constructs a new DiscountPrice.
         * @memberof main
         * @classdesc Represents a DiscountPrice.
         * @implements IDiscountPrice
         * @constructor
         * @param {main.IDiscountPrice=} [properties] Properties to set
         */
        function DiscountPrice(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DiscountPrice id.
         * @member {string} id
         * @memberof main.DiscountPrice
         * @instance
         */
        DiscountPrice.prototype.id = "";

        /**
         * DiscountPrice price.
         * @member {number} price
         * @memberof main.DiscountPrice
         * @instance
         */
        DiscountPrice.prototype.price = 0;

        /**
         * DiscountPrice amount_purchase.
         * @member {number} amount_purchase
         * @memberof main.DiscountPrice
         * @instance
         */
        DiscountPrice.prototype.amount_purchase = 0;

        /**
         * DiscountPrice amount_sale.
         * @member {number} amount_sale
         * @memberof main.DiscountPrice
         * @instance
         */
        DiscountPrice.prototype.amount_sale = 0;

        /**
         * Encodes the specified DiscountPrice message. Does not implicitly {@link main.DiscountPrice.verify|verify} messages.
         * @function encode
         * @memberof main.DiscountPrice
         * @static
         * @param {main.IDiscountPrice} message DiscountPrice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DiscountPrice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.price);
            if (message.amount_purchase != null && Object.hasOwnProperty.call(message, "amount_purchase"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.amount_purchase);
            if (message.amount_sale != null && Object.hasOwnProperty.call(message, "amount_sale"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.amount_sale);
            return writer;
        };

        /**
         * Encodes the specified DiscountPrice message, length delimited. Does not implicitly {@link main.DiscountPrice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.DiscountPrice
         * @static
         * @param {main.IDiscountPrice} message DiscountPrice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DiscountPrice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DiscountPrice message from the specified reader or buffer.
         * @function decode
         * @memberof main.DiscountPrice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.DiscountPrice} DiscountPrice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DiscountPrice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.DiscountPrice();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.price = reader.double();
                    break;
                case 3:
                    message.amount_purchase = reader.double();
                    break;
                case 4:
                    message.amount_sale = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DiscountPrice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.DiscountPrice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.DiscountPrice} DiscountPrice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DiscountPrice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DiscountPrice message.
         * @function verify
         * @memberof main.DiscountPrice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DiscountPrice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount_purchase != null && message.hasOwnProperty("amount_purchase"))
                if (typeof message.amount_purchase !== "number")
                    return "amount_purchase: number expected";
            if (message.amount_sale != null && message.hasOwnProperty("amount_sale"))
                if (typeof message.amount_sale !== "number")
                    return "amount_sale: number expected";
            return null;
        };

        /**
         * Creates a DiscountPrice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.DiscountPrice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.DiscountPrice} DiscountPrice
         */
        DiscountPrice.fromObject = function fromObject(object) {
            if (object instanceof $root.main.DiscountPrice)
                return object;
            let message = new $root.main.DiscountPrice();
            if (object.id != null)
                message.id = String(object.id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount_purchase != null)
                message.amount_purchase = Number(object.amount_purchase);
            if (object.amount_sale != null)
                message.amount_sale = Number(object.amount_sale);
            return message;
        };

        /**
         * Creates a plain object from a DiscountPrice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.DiscountPrice
         * @static
         * @param {main.DiscountPrice} message DiscountPrice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DiscountPrice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.price = 0;
                object.amount_purchase = 0;
                object.amount_sale = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount_purchase != null && message.hasOwnProperty("amount_purchase"))
                object.amount_purchase = options.json && !isFinite(message.amount_purchase) ? String(message.amount_purchase) : message.amount_purchase;
            if (message.amount_sale != null && message.hasOwnProperty("amount_sale"))
                object.amount_sale = options.json && !isFinite(message.amount_sale) ? String(message.amount_sale) : message.amount_sale;
            return object;
        };

        /**
         * Converts this DiscountPrice to JSON.
         * @function toJSON
         * @memberof main.DiscountPrice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DiscountPrice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DiscountPrice;
    })();

    main.MarketStatus = (function() {

        /**
         * Properties of a MarketStatus.
         * @memberof main
         * @interface IMarketStatus
         * @property {string|null} [id] MarketStatus id
         * @property {boolean|null} [is_finished_normal] MarketStatus is_finished_normal
         * @property {boolean|null} [is_finished_renewable] MarketStatus is_finished_renewable
         */

        /**
         * Constructs a new MarketStatus.
         * @memberof main
         * @classdesc Represents a MarketStatus.
         * @implements IMarketStatus
         * @constructor
         * @param {main.IMarketStatus=} [properties] Properties to set
         */
        function MarketStatus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MarketStatus id.
         * @member {string} id
         * @memberof main.MarketStatus
         * @instance
         */
        MarketStatus.prototype.id = "";

        /**
         * MarketStatus is_finished_normal.
         * @member {boolean} is_finished_normal
         * @memberof main.MarketStatus
         * @instance
         */
        MarketStatus.prototype.is_finished_normal = false;

        /**
         * MarketStatus is_finished_renewable.
         * @member {boolean} is_finished_renewable
         * @memberof main.MarketStatus
         * @instance
         */
        MarketStatus.prototype.is_finished_renewable = false;

        /**
         * Encodes the specified MarketStatus message. Does not implicitly {@link main.MarketStatus.verify|verify} messages.
         * @function encode
         * @memberof main.MarketStatus
         * @static
         * @param {main.IMarketStatus} message MarketStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarketStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.is_finished_normal != null && Object.hasOwnProperty.call(message, "is_finished_normal"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.is_finished_normal);
            if (message.is_finished_renewable != null && Object.hasOwnProperty.call(message, "is_finished_renewable"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.is_finished_renewable);
            return writer;
        };

        /**
         * Encodes the specified MarketStatus message, length delimited. Does not implicitly {@link main.MarketStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.MarketStatus
         * @static
         * @param {main.IMarketStatus} message MarketStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarketStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MarketStatus message from the specified reader or buffer.
         * @function decode
         * @memberof main.MarketStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.MarketStatus} MarketStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarketStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.MarketStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.is_finished_normal = reader.bool();
                    break;
                case 3:
                    message.is_finished_renewable = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MarketStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.MarketStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.MarketStatus} MarketStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarketStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MarketStatus message.
         * @function verify
         * @memberof main.MarketStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MarketStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.is_finished_normal != null && message.hasOwnProperty("is_finished_normal"))
                if (typeof message.is_finished_normal !== "boolean")
                    return "is_finished_normal: boolean expected";
            if (message.is_finished_renewable != null && message.hasOwnProperty("is_finished_renewable"))
                if (typeof message.is_finished_renewable !== "boolean")
                    return "is_finished_renewable: boolean expected";
            return null;
        };

        /**
         * Creates a MarketStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.MarketStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.MarketStatus} MarketStatus
         */
        MarketStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.main.MarketStatus)
                return object;
            let message = new $root.main.MarketStatus();
            if (object.id != null)
                message.id = String(object.id);
            if (object.is_finished_normal != null)
                message.is_finished_normal = Boolean(object.is_finished_normal);
            if (object.is_finished_renewable != null)
                message.is_finished_renewable = Boolean(object.is_finished_renewable);
            return message;
        };

        /**
         * Creates a plain object from a MarketStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.MarketStatus
         * @static
         * @param {main.MarketStatus} message MarketStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MarketStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.is_finished_normal = false;
                object.is_finished_renewable = false;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.is_finished_normal != null && message.hasOwnProperty("is_finished_normal"))
                object.is_finished_normal = message.is_finished_normal;
            if (message.is_finished_renewable != null && message.hasOwnProperty("is_finished_renewable"))
                object.is_finished_renewable = message.is_finished_renewable;
            return object;
        };

        /**
         * Converts this MarketStatus to JSON.
         * @function toJSON
         * @memberof main.MarketStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MarketStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MarketStatus;
    })();

    main.Message = (function() {

        /**
         * Properties of a Message.
         * @memberof main
         * @interface IMessage
         * @property {boolean|null} [status] Message status
         * @property {string|null} [type] Message type
         * @property {string|null} [id] Message id
         * @property {string|null} [chat_id] Message chat_id
         * @property {string|null} [sender_account_id] Message sender_account_id
         * @property {string|null} [recipient_account_id] Message recipient_account_id
         * @property {string|null} [text] Message text
         */

        /**
         * Constructs a new Message.
         * @memberof main
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {main.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Message status.
         * @member {boolean} status
         * @memberof main.Message
         * @instance
         */
        Message.prototype.status = false;

        /**
         * Message type.
         * @member {string} type
         * @memberof main.Message
         * @instance
         */
        Message.prototype.type = "";

        /**
         * Message id.
         * @member {string} id
         * @memberof main.Message
         * @instance
         */
        Message.prototype.id = "";

        /**
         * Message chat_id.
         * @member {string} chat_id
         * @memberof main.Message
         * @instance
         */
        Message.prototype.chat_id = "";

        /**
         * Message sender_account_id.
         * @member {string} sender_account_id
         * @memberof main.Message
         * @instance
         */
        Message.prototype.sender_account_id = "";

        /**
         * Message recipient_account_id.
         * @member {string} recipient_account_id
         * @memberof main.Message
         * @instance
         */
        Message.prototype.recipient_account_id = "";

        /**
         * Message text.
         * @member {string} text
         * @memberof main.Message
         * @instance
         */
        Message.prototype.text = "";

        /**
         * Encodes the specified Message message. Does not implicitly {@link main.Message.verify|verify} messages.
         * @function encode
         * @memberof main.Message
         * @static
         * @param {main.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.status);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.id);
            if (message.chat_id != null && Object.hasOwnProperty.call(message, "chat_id"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.chat_id);
            if (message.sender_account_id != null && Object.hasOwnProperty.call(message, "sender_account_id"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.sender_account_id);
            if (message.recipient_account_id != null && Object.hasOwnProperty.call(message, "recipient_account_id"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.recipient_account_id);
            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.text);
            return writer;
        };

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link main.Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.Message
         * @static
         * @param {main.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof main.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.Message();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.status = reader.bool();
                    break;
                case 2:
                    message.type = reader.string();
                    break;
                case 3:
                    message.id = reader.string();
                    break;
                case 4:
                    message.chat_id = reader.string();
                    break;
                case 5:
                    message.sender_account_id = reader.string();
                    break;
                case 6:
                    message.recipient_account_id = reader.string();
                    break;
                case 7:
                    message.text = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Message message.
         * @function verify
         * @memberof main.Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.status != null && message.hasOwnProperty("status"))
                if (typeof message.status !== "boolean")
                    return "status: boolean expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.chat_id != null && message.hasOwnProperty("chat_id"))
                if (!$util.isString(message.chat_id))
                    return "chat_id: string expected";
            if (message.sender_account_id != null && message.hasOwnProperty("sender_account_id"))
                if (!$util.isString(message.sender_account_id))
                    return "sender_account_id: string expected";
            if (message.recipient_account_id != null && message.hasOwnProperty("recipient_account_id"))
                if (!$util.isString(message.recipient_account_id))
                    return "recipient_account_id: string expected";
            if (message.text != null && message.hasOwnProperty("text"))
                if (!$util.isString(message.text))
                    return "text: string expected";
            return null;
        };

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.main.Message)
                return object;
            let message = new $root.main.Message();
            if (object.status != null)
                message.status = Boolean(object.status);
            if (object.type != null)
                message.type = String(object.type);
            if (object.id != null)
                message.id = String(object.id);
            if (object.chat_id != null)
                message.chat_id = String(object.chat_id);
            if (object.sender_account_id != null)
                message.sender_account_id = String(object.sender_account_id);
            if (object.recipient_account_id != null)
                message.recipient_account_id = String(object.recipient_account_id);
            if (object.text != null)
                message.text = String(object.text);
            return message;
        };

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.Message
         * @static
         * @param {main.Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.status = false;
                object.type = "";
                object.id = "";
                object.chat_id = "";
                object.sender_account_id = "";
                object.recipient_account_id = "";
                object.text = "";
            }
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.chat_id != null && message.hasOwnProperty("chat_id"))
                object.chat_id = message.chat_id;
            if (message.sender_account_id != null && message.hasOwnProperty("sender_account_id"))
                object.sender_account_id = message.sender_account_id;
            if (message.recipient_account_id != null && message.hasOwnProperty("recipient_account_id"))
                object.recipient_account_id = message.recipient_account_id;
            if (message.text != null && message.hasOwnProperty("text"))
                object.text = message.text;
            return object;
        };

        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof main.Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Message;
    })();

    main.MonthlyPayment = (function() {

        /**
         * Properties of a MonthlyPayment.
         * @memberof main
         * @interface IMonthlyPayment
         * @property {string|null} [id] MonthlyPayment id
         * @property {string|null} [student_account_id] MonthlyPayment student_account_id
         * @property {number|null} [year] MonthlyPayment year
         * @property {number|null} [month] MonthlyPayment month
         * @property {number|null} [amount_jpy] MonthlyPayment amount_jpy
         */

        /**
         * Constructs a new MonthlyPayment.
         * @memberof main
         * @classdesc Represents a MonthlyPayment.
         * @implements IMonthlyPayment
         * @constructor
         * @param {main.IMonthlyPayment=} [properties] Properties to set
         */
        function MonthlyPayment(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MonthlyPayment id.
         * @member {string} id
         * @memberof main.MonthlyPayment
         * @instance
         */
        MonthlyPayment.prototype.id = "";

        /**
         * MonthlyPayment student_account_id.
         * @member {string} student_account_id
         * @memberof main.MonthlyPayment
         * @instance
         */
        MonthlyPayment.prototype.student_account_id = "";

        /**
         * MonthlyPayment year.
         * @member {number} year
         * @memberof main.MonthlyPayment
         * @instance
         */
        MonthlyPayment.prototype.year = 0;

        /**
         * MonthlyPayment month.
         * @member {number} month
         * @memberof main.MonthlyPayment
         * @instance
         */
        MonthlyPayment.prototype.month = 0;

        /**
         * MonthlyPayment amount_jpy.
         * @member {number} amount_jpy
         * @memberof main.MonthlyPayment
         * @instance
         */
        MonthlyPayment.prototype.amount_jpy = 0;

        /**
         * Encodes the specified MonthlyPayment message. Does not implicitly {@link main.MonthlyPayment.verify|verify} messages.
         * @function encode
         * @memberof main.MonthlyPayment
         * @static
         * @param {main.IMonthlyPayment} message MonthlyPayment message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MonthlyPayment.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.student_account_id != null && Object.hasOwnProperty.call(message, "student_account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.student_account_id);
            if (message.year != null && Object.hasOwnProperty.call(message, "year"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.year);
            if (message.month != null && Object.hasOwnProperty.call(message, "month"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.month);
            if (message.amount_jpy != null && Object.hasOwnProperty.call(message, "amount_jpy"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.amount_jpy);
            return writer;
        };

        /**
         * Encodes the specified MonthlyPayment message, length delimited. Does not implicitly {@link main.MonthlyPayment.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.MonthlyPayment
         * @static
         * @param {main.IMonthlyPayment} message MonthlyPayment message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MonthlyPayment.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MonthlyPayment message from the specified reader or buffer.
         * @function decode
         * @memberof main.MonthlyPayment
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.MonthlyPayment} MonthlyPayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MonthlyPayment.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.MonthlyPayment();
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
                    message.year = reader.double();
                    break;
                case 4:
                    message.month = reader.double();
                    break;
                case 5:
                    message.amount_jpy = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MonthlyPayment message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.MonthlyPayment
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.MonthlyPayment} MonthlyPayment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MonthlyPayment.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MonthlyPayment message.
         * @function verify
         * @memberof main.MonthlyPayment
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MonthlyPayment.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                if (!$util.isString(message.student_account_id))
                    return "student_account_id: string expected";
            if (message.year != null && message.hasOwnProperty("year"))
                if (typeof message.year !== "number")
                    return "year: number expected";
            if (message.month != null && message.hasOwnProperty("month"))
                if (typeof message.month !== "number")
                    return "month: number expected";
            if (message.amount_jpy != null && message.hasOwnProperty("amount_jpy"))
                if (typeof message.amount_jpy !== "number")
                    return "amount_jpy: number expected";
            return null;
        };

        /**
         * Creates a MonthlyPayment message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.MonthlyPayment
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.MonthlyPayment} MonthlyPayment
         */
        MonthlyPayment.fromObject = function fromObject(object) {
            if (object instanceof $root.main.MonthlyPayment)
                return object;
            let message = new $root.main.MonthlyPayment();
            if (object.id != null)
                message.id = String(object.id);
            if (object.student_account_id != null)
                message.student_account_id = String(object.student_account_id);
            if (object.year != null)
                message.year = Number(object.year);
            if (object.month != null)
                message.month = Number(object.month);
            if (object.amount_jpy != null)
                message.amount_jpy = Number(object.amount_jpy);
            return message;
        };

        /**
         * Creates a plain object from a MonthlyPayment message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.MonthlyPayment
         * @static
         * @param {main.MonthlyPayment} message MonthlyPayment
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MonthlyPayment.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.student_account_id = "";
                object.year = 0;
                object.month = 0;
                object.amount_jpy = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                object.student_account_id = message.student_account_id;
            if (message.year != null && message.hasOwnProperty("year"))
                object.year = options.json && !isFinite(message.year) ? String(message.year) : message.year;
            if (message.month != null && message.hasOwnProperty("month"))
                object.month = options.json && !isFinite(message.month) ? String(message.month) : message.month;
            if (message.amount_jpy != null && message.hasOwnProperty("amount_jpy"))
                object.amount_jpy = options.json && !isFinite(message.amount_jpy) ? String(message.amount_jpy) : message.amount_jpy;
            return object;
        };

        /**
         * Converts this MonthlyPayment to JSON.
         * @function toJSON
         * @memberof main.MonthlyPayment
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MonthlyPayment.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MonthlyPayment;
    })();

    main.MonthlyUsage = (function() {

        /**
         * Properties of a MonthlyUsage.
         * @memberof main
         * @interface IMonthlyUsage
         * @property {string|null} [id] MonthlyUsage id
         * @property {string|null} [student_account_id] MonthlyUsage student_account_id
         * @property {number|null} [year] MonthlyUsage year
         * @property {number|null} [month] MonthlyUsage month
         * @property {number|null} [amount_kwh] MonthlyUsage amount_kwh
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
         * MonthlyUsage year.
         * @member {number} year
         * @memberof main.MonthlyUsage
         * @instance
         */
        MonthlyUsage.prototype.year = 0;

        /**
         * MonthlyUsage month.
         * @member {number} month
         * @memberof main.MonthlyUsage
         * @instance
         */
        MonthlyUsage.prototype.month = 0;

        /**
         * MonthlyUsage amount_kwh.
         * @member {number} amount_kwh
         * @memberof main.MonthlyUsage
         * @instance
         */
        MonthlyUsage.prototype.amount_kwh = 0;

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
            if (message.year != null && Object.hasOwnProperty.call(message, "year"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.year);
            if (message.month != null && Object.hasOwnProperty.call(message, "month"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.month);
            if (message.amount_kwh != null && Object.hasOwnProperty.call(message, "amount_kwh"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.amount_kwh);
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
                    message.year = reader.double();
                    break;
                case 4:
                    message.month = reader.double();
                    break;
                case 5:
                    message.amount_kwh = reader.double();
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
            if (message.year != null && message.hasOwnProperty("year"))
                if (typeof message.year !== "number")
                    return "year: number expected";
            if (message.month != null && message.hasOwnProperty("month"))
                if (typeof message.month !== "number")
                    return "month: number expected";
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                if (typeof message.amount_kwh !== "number")
                    return "amount_kwh: number expected";
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
            if (object.year != null)
                message.year = Number(object.year);
            if (object.month != null)
                message.month = Number(object.month);
            if (object.amount_kwh != null)
                message.amount_kwh = Number(object.amount_kwh);
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
                object.year = 0;
                object.month = 0;
                object.amount_kwh = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                object.student_account_id = message.student_account_id;
            if (message.year != null && message.hasOwnProperty("year"))
                object.year = options.json && !isFinite(message.year) ? String(message.year) : message.year;
            if (message.month != null && message.hasOwnProperty("month"))
                object.month = options.json && !isFinite(message.month) ? String(message.month) : message.month;
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                object.amount_kwh = options.json && !isFinite(message.amount_kwh) ? String(message.amount_kwh) : message.amount_kwh;
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

    main.NormalBidHistory = (function() {

        /**
         * Properties of a NormalBidHistory.
         * @memberof main
         * @interface INormalBidHistory
         * @property {string|null} [id] NormalBidHistory id
         * @property {string|null} [account_id] NormalBidHistory account_id
         * @property {number|null} [price] NormalBidHistory price
         * @property {number|null} [amount] NormalBidHistory amount
         * @property {boolean|null} [is_accepted] NormalBidHistory is_accepted
         * @property {number|null} [contract_price] NormalBidHistory contract_price
         */

        /**
         * Constructs a new NormalBidHistory.
         * @memberof main
         * @classdesc Represents a NormalBidHistory.
         * @implements INormalBidHistory
         * @constructor
         * @param {main.INormalBidHistory=} [properties] Properties to set
         */
        function NormalBidHistory(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NormalBidHistory id.
         * @member {string} id
         * @memberof main.NormalBidHistory
         * @instance
         */
        NormalBidHistory.prototype.id = "";

        /**
         * NormalBidHistory account_id.
         * @member {string} account_id
         * @memberof main.NormalBidHistory
         * @instance
         */
        NormalBidHistory.prototype.account_id = "";

        /**
         * NormalBidHistory price.
         * @member {number} price
         * @memberof main.NormalBidHistory
         * @instance
         */
        NormalBidHistory.prototype.price = 0;

        /**
         * NormalBidHistory amount.
         * @member {number} amount
         * @memberof main.NormalBidHistory
         * @instance
         */
        NormalBidHistory.prototype.amount = 0;

        /**
         * NormalBidHistory is_accepted.
         * @member {boolean} is_accepted
         * @memberof main.NormalBidHistory
         * @instance
         */
        NormalBidHistory.prototype.is_accepted = false;

        /**
         * NormalBidHistory contract_price.
         * @member {number} contract_price
         * @memberof main.NormalBidHistory
         * @instance
         */
        NormalBidHistory.prototype.contract_price = 0;

        /**
         * Encodes the specified NormalBidHistory message. Does not implicitly {@link main.NormalBidHistory.verify|verify} messages.
         * @function encode
         * @memberof main.NormalBidHistory
         * @static
         * @param {main.INormalBidHistory} message NormalBidHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NormalBidHistory.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.account_id != null && Object.hasOwnProperty.call(message, "account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.account_id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.amount);
            if (message.is_accepted != null && Object.hasOwnProperty.call(message, "is_accepted"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.is_accepted);
            if (message.contract_price != null && Object.hasOwnProperty.call(message, "contract_price"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.contract_price);
            return writer;
        };

        /**
         * Encodes the specified NormalBidHistory message, length delimited. Does not implicitly {@link main.NormalBidHistory.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.NormalBidHistory
         * @static
         * @param {main.INormalBidHistory} message NormalBidHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NormalBidHistory.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NormalBidHistory message from the specified reader or buffer.
         * @function decode
         * @memberof main.NormalBidHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.NormalBidHistory} NormalBidHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NormalBidHistory.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.NormalBidHistory();
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
                    message.price = reader.double();
                    break;
                case 4:
                    message.amount = reader.double();
                    break;
                case 5:
                    message.is_accepted = reader.bool();
                    break;
                case 6:
                    message.contract_price = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NormalBidHistory message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.NormalBidHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.NormalBidHistory} NormalBidHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NormalBidHistory.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NormalBidHistory message.
         * @function verify
         * @memberof main.NormalBidHistory
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NormalBidHistory.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                if (!$util.isString(message.account_id))
                    return "account_id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            if (message.is_accepted != null && message.hasOwnProperty("is_accepted"))
                if (typeof message.is_accepted !== "boolean")
                    return "is_accepted: boolean expected";
            if (message.contract_price != null && message.hasOwnProperty("contract_price"))
                if (typeof message.contract_price !== "number")
                    return "contract_price: number expected";
            return null;
        };

        /**
         * Creates a NormalBidHistory message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.NormalBidHistory
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.NormalBidHistory} NormalBidHistory
         */
        NormalBidHistory.fromObject = function fromObject(object) {
            if (object instanceof $root.main.NormalBidHistory)
                return object;
            let message = new $root.main.NormalBidHistory();
            if (object.id != null)
                message.id = String(object.id);
            if (object.account_id != null)
                message.account_id = String(object.account_id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            if (object.is_accepted != null)
                message.is_accepted = Boolean(object.is_accepted);
            if (object.contract_price != null)
                message.contract_price = Number(object.contract_price);
            return message;
        };

        /**
         * Creates a plain object from a NormalBidHistory message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.NormalBidHistory
         * @static
         * @param {main.NormalBidHistory} message NormalBidHistory
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NormalBidHistory.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.account_id = "";
                object.price = 0;
                object.amount = 0;
                object.is_accepted = false;
                object.contract_price = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                object.account_id = message.account_id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            if (message.is_accepted != null && message.hasOwnProperty("is_accepted"))
                object.is_accepted = message.is_accepted;
            if (message.contract_price != null && message.hasOwnProperty("contract_price"))
                object.contract_price = options.json && !isFinite(message.contract_price) ? String(message.contract_price) : message.contract_price;
            return object;
        };

        /**
         * Converts this NormalBidHistory to JSON.
         * @function toJSON
         * @memberof main.NormalBidHistory
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NormalBidHistory.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NormalBidHistory;
    })();

    /**
     * NormalAskHistoryType enum.
     * @name main.NormalAskHistoryType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} PRIMARYADDITIONAL=1 PRIMARYADDITIONAL value
     * @property {number} SECONDARY=2 SECONDARY value
     */
    main.NormalAskHistoryType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "PRIMARYADDITIONAL"] = 1;
        values[valuesById[2] = "SECONDARY"] = 2;
        return values;
    })();

    main.NormalAskHistory = (function() {

        /**
         * Properties of a NormalAskHistory.
         * @memberof main
         * @interface INormalAskHistory
         * @property {string|null} [id] NormalAskHistory id
         * @property {main.NormalAskHistoryType|null} [type] NormalAskHistory type
         * @property {string|null} [account_id] NormalAskHistory account_id
         * @property {number|null} [price] NormalAskHistory price
         * @property {number|null} [amount] NormalAskHistory amount
         * @property {boolean|null} [is_accepted] NormalAskHistory is_accepted
         * @property {number|null} [contract_price] NormalAskHistory contract_price
         */

        /**
         * Constructs a new NormalAskHistory.
         * @memberof main
         * @classdesc Represents a NormalAskHistory.
         * @implements INormalAskHistory
         * @constructor
         * @param {main.INormalAskHistory=} [properties] Properties to set
         */
        function NormalAskHistory(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NormalAskHistory id.
         * @member {string} id
         * @memberof main.NormalAskHistory
         * @instance
         */
        NormalAskHistory.prototype.id = "";

        /**
         * NormalAskHistory type.
         * @member {main.NormalAskHistoryType} type
         * @memberof main.NormalAskHistory
         * @instance
         */
        NormalAskHistory.prototype.type = 0;

        /**
         * NormalAskHistory account_id.
         * @member {string} account_id
         * @memberof main.NormalAskHistory
         * @instance
         */
        NormalAskHistory.prototype.account_id = "";

        /**
         * NormalAskHistory price.
         * @member {number} price
         * @memberof main.NormalAskHistory
         * @instance
         */
        NormalAskHistory.prototype.price = 0;

        /**
         * NormalAskHistory amount.
         * @member {number} amount
         * @memberof main.NormalAskHistory
         * @instance
         */
        NormalAskHistory.prototype.amount = 0;

        /**
         * NormalAskHistory is_accepted.
         * @member {boolean} is_accepted
         * @memberof main.NormalAskHistory
         * @instance
         */
        NormalAskHistory.prototype.is_accepted = false;

        /**
         * NormalAskHistory contract_price.
         * @member {number} contract_price
         * @memberof main.NormalAskHistory
         * @instance
         */
        NormalAskHistory.prototype.contract_price = 0;

        /**
         * Encodes the specified NormalAskHistory message. Does not implicitly {@link main.NormalAskHistory.verify|verify} messages.
         * @function encode
         * @memberof main.NormalAskHistory
         * @static
         * @param {main.INormalAskHistory} message NormalAskHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NormalAskHistory.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.account_id != null && Object.hasOwnProperty.call(message, "account_id"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.account_id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.amount);
            if (message.is_accepted != null && Object.hasOwnProperty.call(message, "is_accepted"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.is_accepted);
            if (message.contract_price != null && Object.hasOwnProperty.call(message, "contract_price"))
                writer.uint32(/* id 7, wireType 1 =*/57).double(message.contract_price);
            return writer;
        };

        /**
         * Encodes the specified NormalAskHistory message, length delimited. Does not implicitly {@link main.NormalAskHistory.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.NormalAskHistory
         * @static
         * @param {main.INormalAskHistory} message NormalAskHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NormalAskHistory.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NormalAskHistory message from the specified reader or buffer.
         * @function decode
         * @memberof main.NormalAskHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.NormalAskHistory} NormalAskHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NormalAskHistory.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.NormalAskHistory();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.account_id = reader.string();
                    break;
                case 4:
                    message.price = reader.double();
                    break;
                case 5:
                    message.amount = reader.double();
                    break;
                case 6:
                    message.is_accepted = reader.bool();
                    break;
                case 7:
                    message.contract_price = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NormalAskHistory message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.NormalAskHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.NormalAskHistory} NormalAskHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NormalAskHistory.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NormalAskHistory message.
         * @function verify
         * @memberof main.NormalAskHistory
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NormalAskHistory.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                if (!$util.isString(message.account_id))
                    return "account_id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            if (message.is_accepted != null && message.hasOwnProperty("is_accepted"))
                if (typeof message.is_accepted !== "boolean")
                    return "is_accepted: boolean expected";
            if (message.contract_price != null && message.hasOwnProperty("contract_price"))
                if (typeof message.contract_price !== "number")
                    return "contract_price: number expected";
            return null;
        };

        /**
         * Creates a NormalAskHistory message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.NormalAskHistory
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.NormalAskHistory} NormalAskHistory
         */
        NormalAskHistory.fromObject = function fromObject(object) {
            if (object instanceof $root.main.NormalAskHistory)
                return object;
            let message = new $root.main.NormalAskHistory();
            if (object.id != null)
                message.id = String(object.id);
            switch (object.type) {
            case "UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "PRIMARYADDITIONAL":
            case 1:
                message.type = 1;
                break;
            case "SECONDARY":
            case 2:
                message.type = 2;
                break;
            }
            if (object.account_id != null)
                message.account_id = String(object.account_id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            if (object.is_accepted != null)
                message.is_accepted = Boolean(object.is_accepted);
            if (object.contract_price != null)
                message.contract_price = Number(object.contract_price);
            return message;
        };

        /**
         * Creates a plain object from a NormalAskHistory message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.NormalAskHistory
         * @static
         * @param {main.NormalAskHistory} message NormalAskHistory
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NormalAskHistory.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.type = options.enums === String ? "UNKNOWN" : 0;
                object.account_id = "";
                object.price = 0;
                object.amount = 0;
                object.is_accepted = false;
                object.contract_price = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.main.NormalAskHistoryType[message.type] : message.type;
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                object.account_id = message.account_id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            if (message.is_accepted != null && message.hasOwnProperty("is_accepted"))
                object.is_accepted = message.is_accepted;
            if (message.contract_price != null && message.hasOwnProperty("contract_price"))
                object.contract_price = options.json && !isFinite(message.contract_price) ? String(message.contract_price) : message.contract_price;
            return object;
        };

        /**
         * Converts this NormalAskHistory to JSON.
         * @function toJSON
         * @memberof main.NormalAskHistory
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NormalAskHistory.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NormalAskHistory;
    })();

    /**
     * NormalAskType enum.
     * @name main.NormalAskType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} PRIMARYADDITIONAL=1 PRIMARYADDITIONAL value
     * @property {number} SECONDARY=2 SECONDARY value
     */
    main.NormalAskType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "PRIMARYADDITIONAL"] = 1;
        values[valuesById[2] = "SECONDARY"] = 2;
        return values;
    })();

    main.NormalAsk = (function() {

        /**
         * Properties of a NormalAsk.
         * @memberof main
         * @interface INormalAsk
         * @property {string|null} [id] NormalAsk id
         * @property {main.NormalAskType|null} [type] NormalAsk type
         * @property {string|null} [account_id] NormalAsk account_id
         * @property {number|null} [price] NormalAsk price
         * @property {number|null} [amount] NormalAsk amount
         */

        /**
         * Constructs a new NormalAsk.
         * @memberof main
         * @classdesc Represents a NormalAsk.
         * @implements INormalAsk
         * @constructor
         * @param {main.INormalAsk=} [properties] Properties to set
         */
        function NormalAsk(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NormalAsk id.
         * @member {string} id
         * @memberof main.NormalAsk
         * @instance
         */
        NormalAsk.prototype.id = "";

        /**
         * NormalAsk type.
         * @member {main.NormalAskType} type
         * @memberof main.NormalAsk
         * @instance
         */
        NormalAsk.prototype.type = 0;

        /**
         * NormalAsk account_id.
         * @member {string} account_id
         * @memberof main.NormalAsk
         * @instance
         */
        NormalAsk.prototype.account_id = "";

        /**
         * NormalAsk price.
         * @member {number} price
         * @memberof main.NormalAsk
         * @instance
         */
        NormalAsk.prototype.price = 0;

        /**
         * NormalAsk amount.
         * @member {number} amount
         * @memberof main.NormalAsk
         * @instance
         */
        NormalAsk.prototype.amount = 0;

        /**
         * Encodes the specified NormalAsk message. Does not implicitly {@link main.NormalAsk.verify|verify} messages.
         * @function encode
         * @memberof main.NormalAsk
         * @static
         * @param {main.INormalAsk} message NormalAsk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NormalAsk.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.account_id != null && Object.hasOwnProperty.call(message, "account_id"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.account_id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.amount);
            return writer;
        };

        /**
         * Encodes the specified NormalAsk message, length delimited. Does not implicitly {@link main.NormalAsk.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.NormalAsk
         * @static
         * @param {main.INormalAsk} message NormalAsk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NormalAsk.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NormalAsk message from the specified reader or buffer.
         * @function decode
         * @memberof main.NormalAsk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.NormalAsk} NormalAsk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NormalAsk.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.NormalAsk();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.account_id = reader.string();
                    break;
                case 4:
                    message.price = reader.double();
                    break;
                case 5:
                    message.amount = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NormalAsk message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.NormalAsk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.NormalAsk} NormalAsk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NormalAsk.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NormalAsk message.
         * @function verify
         * @memberof main.NormalAsk
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NormalAsk.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                if (!$util.isString(message.account_id))
                    return "account_id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            return null;
        };

        /**
         * Creates a NormalAsk message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.NormalAsk
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.NormalAsk} NormalAsk
         */
        NormalAsk.fromObject = function fromObject(object) {
            if (object instanceof $root.main.NormalAsk)
                return object;
            let message = new $root.main.NormalAsk();
            if (object.id != null)
                message.id = String(object.id);
            switch (object.type) {
            case "UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "PRIMARYADDITIONAL":
            case 1:
                message.type = 1;
                break;
            case "SECONDARY":
            case 2:
                message.type = 2;
                break;
            }
            if (object.account_id != null)
                message.account_id = String(object.account_id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            return message;
        };

        /**
         * Creates a plain object from a NormalAsk message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.NormalAsk
         * @static
         * @param {main.NormalAsk} message NormalAsk
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NormalAsk.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.type = options.enums === String ? "UNKNOWN" : 0;
                object.account_id = "";
                object.price = 0;
                object.amount = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.main.NormalAskType[message.type] : message.type;
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                object.account_id = message.account_id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            return object;
        };

        /**
         * Converts this NormalAsk to JSON.
         * @function toJSON
         * @memberof main.NormalAsk
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NormalAsk.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NormalAsk;
    })();

    main.NormalBid = (function() {

        /**
         * Properties of a NormalBid.
         * @memberof main
         * @interface INormalBid
         * @property {string|null} [id] NormalBid id
         * @property {string|null} [account_id] NormalBid account_id
         * @property {number|null} [price] NormalBid price
         * @property {number|null} [amount] NormalBid amount
         */

        /**
         * Constructs a new NormalBid.
         * @memberof main
         * @classdesc Represents a NormalBid.
         * @implements INormalBid
         * @constructor
         * @param {main.INormalBid=} [properties] Properties to set
         */
        function NormalBid(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NormalBid id.
         * @member {string} id
         * @memberof main.NormalBid
         * @instance
         */
        NormalBid.prototype.id = "";

        /**
         * NormalBid account_id.
         * @member {string} account_id
         * @memberof main.NormalBid
         * @instance
         */
        NormalBid.prototype.account_id = "";

        /**
         * NormalBid price.
         * @member {number} price
         * @memberof main.NormalBid
         * @instance
         */
        NormalBid.prototype.price = 0;

        /**
         * NormalBid amount.
         * @member {number} amount
         * @memberof main.NormalBid
         * @instance
         */
        NormalBid.prototype.amount = 0;

        /**
         * Encodes the specified NormalBid message. Does not implicitly {@link main.NormalBid.verify|verify} messages.
         * @function encode
         * @memberof main.NormalBid
         * @static
         * @param {main.INormalBid} message NormalBid message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NormalBid.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.account_id != null && Object.hasOwnProperty.call(message, "account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.account_id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.amount);
            return writer;
        };

        /**
         * Encodes the specified NormalBid message, length delimited. Does not implicitly {@link main.NormalBid.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.NormalBid
         * @static
         * @param {main.INormalBid} message NormalBid message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NormalBid.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NormalBid message from the specified reader or buffer.
         * @function decode
         * @memberof main.NormalBid
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.NormalBid} NormalBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NormalBid.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.NormalBid();
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
                    message.price = reader.double();
                    break;
                case 4:
                    message.amount = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NormalBid message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.NormalBid
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.NormalBid} NormalBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NormalBid.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NormalBid message.
         * @function verify
         * @memberof main.NormalBid
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NormalBid.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                if (!$util.isString(message.account_id))
                    return "account_id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            return null;
        };

        /**
         * Creates a NormalBid message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.NormalBid
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.NormalBid} NormalBid
         */
        NormalBid.fromObject = function fromObject(object) {
            if (object instanceof $root.main.NormalBid)
                return object;
            let message = new $root.main.NormalBid();
            if (object.id != null)
                message.id = String(object.id);
            if (object.account_id != null)
                message.account_id = String(object.account_id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            return message;
        };

        /**
         * Creates a plain object from a NormalBid message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.NormalBid
         * @static
         * @param {main.NormalBid} message NormalBid
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NormalBid.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.account_id = "";
                object.price = 0;
                object.amount = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                object.account_id = message.account_id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            return object;
        };

        /**
         * Converts this NormalBid to JSON.
         * @function toJSON
         * @memberof main.NormalBid
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NormalBid.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NormalBid;
    })();

    main.NormalSettlement = (function() {

        /**
         * Properties of a NormalSettlement.
         * @memberof main
         * @interface INormalSettlement
         * @property {string|null} [id] NormalSettlement id
         * @property {string|null} [bid_id] NormalSettlement bid_id
         * @property {string|null} [ask_id] NormalSettlement ask_id
         * @property {number|null} [price] NormalSettlement price
         * @property {number|null} [amount] NormalSettlement amount
         */

        /**
         * Constructs a new NormalSettlement.
         * @memberof main
         * @classdesc Represents a NormalSettlement.
         * @implements INormalSettlement
         * @constructor
         * @param {main.INormalSettlement=} [properties] Properties to set
         */
        function NormalSettlement(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NormalSettlement id.
         * @member {string} id
         * @memberof main.NormalSettlement
         * @instance
         */
        NormalSettlement.prototype.id = "";

        /**
         * NormalSettlement bid_id.
         * @member {string} bid_id
         * @memberof main.NormalSettlement
         * @instance
         */
        NormalSettlement.prototype.bid_id = "";

        /**
         * NormalSettlement ask_id.
         * @member {string} ask_id
         * @memberof main.NormalSettlement
         * @instance
         */
        NormalSettlement.prototype.ask_id = "";

        /**
         * NormalSettlement price.
         * @member {number} price
         * @memberof main.NormalSettlement
         * @instance
         */
        NormalSettlement.prototype.price = 0;

        /**
         * NormalSettlement amount.
         * @member {number} amount
         * @memberof main.NormalSettlement
         * @instance
         */
        NormalSettlement.prototype.amount = 0;

        /**
         * Encodes the specified NormalSettlement message. Does not implicitly {@link main.NormalSettlement.verify|verify} messages.
         * @function encode
         * @memberof main.NormalSettlement
         * @static
         * @param {main.INormalSettlement} message NormalSettlement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NormalSettlement.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.bid_id != null && Object.hasOwnProperty.call(message, "bid_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.bid_id);
            if (message.ask_id != null && Object.hasOwnProperty.call(message, "ask_id"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.ask_id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.amount);
            return writer;
        };

        /**
         * Encodes the specified NormalSettlement message, length delimited. Does not implicitly {@link main.NormalSettlement.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.NormalSettlement
         * @static
         * @param {main.INormalSettlement} message NormalSettlement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NormalSettlement.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NormalSettlement message from the specified reader or buffer.
         * @function decode
         * @memberof main.NormalSettlement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.NormalSettlement} NormalSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NormalSettlement.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.NormalSettlement();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.bid_id = reader.string();
                    break;
                case 3:
                    message.ask_id = reader.string();
                    break;
                case 4:
                    message.price = reader.double();
                    break;
                case 5:
                    message.amount = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NormalSettlement message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.NormalSettlement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.NormalSettlement} NormalSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NormalSettlement.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NormalSettlement message.
         * @function verify
         * @memberof main.NormalSettlement
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NormalSettlement.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.bid_id != null && message.hasOwnProperty("bid_id"))
                if (!$util.isString(message.bid_id))
                    return "bid_id: string expected";
            if (message.ask_id != null && message.hasOwnProperty("ask_id"))
                if (!$util.isString(message.ask_id))
                    return "ask_id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            return null;
        };

        /**
         * Creates a NormalSettlement message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.NormalSettlement
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.NormalSettlement} NormalSettlement
         */
        NormalSettlement.fromObject = function fromObject(object) {
            if (object instanceof $root.main.NormalSettlement)
                return object;
            let message = new $root.main.NormalSettlement();
            if (object.id != null)
                message.id = String(object.id);
            if (object.bid_id != null)
                message.bid_id = String(object.bid_id);
            if (object.ask_id != null)
                message.ask_id = String(object.ask_id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            return message;
        };

        /**
         * Creates a plain object from a NormalSettlement message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.NormalSettlement
         * @static
         * @param {main.NormalSettlement} message NormalSettlement
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NormalSettlement.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.bid_id = "";
                object.ask_id = "";
                object.price = 0;
                object.amount = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.bid_id != null && message.hasOwnProperty("bid_id"))
                object.bid_id = message.bid_id;
            if (message.ask_id != null && message.hasOwnProperty("ask_id"))
                object.ask_id = message.ask_id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            return object;
        };

        /**
         * Converts this NormalSettlement to JSON.
         * @function toJSON
         * @memberof main.NormalSettlement
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NormalSettlement.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NormalSettlement;
    })();

    main.PrimaryAsk = (function() {

        /**
         * Properties of a PrimaryAsk.
         * @memberof main
         * @interface IPrimaryAsk
         * @property {string|null} [id] PrimaryAsk id
         * @property {string|null} [account_id] PrimaryAsk account_id
         * @property {number|null} [price] PrimaryAsk price
         * @property {number|null} [amount] PrimaryAsk amount
         */

        /**
         * Constructs a new PrimaryAsk.
         * @memberof main
         * @classdesc Represents a PrimaryAsk.
         * @implements IPrimaryAsk
         * @constructor
         * @param {main.IPrimaryAsk=} [properties] Properties to set
         */
        function PrimaryAsk(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PrimaryAsk id.
         * @member {string} id
         * @memberof main.PrimaryAsk
         * @instance
         */
        PrimaryAsk.prototype.id = "";

        /**
         * PrimaryAsk account_id.
         * @member {string} account_id
         * @memberof main.PrimaryAsk
         * @instance
         */
        PrimaryAsk.prototype.account_id = "";

        /**
         * PrimaryAsk price.
         * @member {number} price
         * @memberof main.PrimaryAsk
         * @instance
         */
        PrimaryAsk.prototype.price = 0;

        /**
         * PrimaryAsk amount.
         * @member {number} amount
         * @memberof main.PrimaryAsk
         * @instance
         */
        PrimaryAsk.prototype.amount = 0;

        /**
         * Encodes the specified PrimaryAsk message. Does not implicitly {@link main.PrimaryAsk.verify|verify} messages.
         * @function encode
         * @memberof main.PrimaryAsk
         * @static
         * @param {main.IPrimaryAsk} message PrimaryAsk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PrimaryAsk.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.account_id != null && Object.hasOwnProperty.call(message, "account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.account_id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.amount);
            return writer;
        };

        /**
         * Encodes the specified PrimaryAsk message, length delimited. Does not implicitly {@link main.PrimaryAsk.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.PrimaryAsk
         * @static
         * @param {main.IPrimaryAsk} message PrimaryAsk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PrimaryAsk.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PrimaryAsk message from the specified reader or buffer.
         * @function decode
         * @memberof main.PrimaryAsk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.PrimaryAsk} PrimaryAsk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PrimaryAsk.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.PrimaryAsk();
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
                    message.price = reader.double();
                    break;
                case 4:
                    message.amount = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PrimaryAsk message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.PrimaryAsk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.PrimaryAsk} PrimaryAsk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PrimaryAsk.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PrimaryAsk message.
         * @function verify
         * @memberof main.PrimaryAsk
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PrimaryAsk.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                if (!$util.isString(message.account_id))
                    return "account_id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            return null;
        };

        /**
         * Creates a PrimaryAsk message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.PrimaryAsk
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.PrimaryAsk} PrimaryAsk
         */
        PrimaryAsk.fromObject = function fromObject(object) {
            if (object instanceof $root.main.PrimaryAsk)
                return object;
            let message = new $root.main.PrimaryAsk();
            if (object.id != null)
                message.id = String(object.id);
            if (object.account_id != null)
                message.account_id = String(object.account_id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            return message;
        };

        /**
         * Creates a plain object from a PrimaryAsk message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.PrimaryAsk
         * @static
         * @param {main.PrimaryAsk} message PrimaryAsk
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PrimaryAsk.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.account_id = "";
                object.price = 0;
                object.amount = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                object.account_id = message.account_id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            return object;
        };

        /**
         * Converts this PrimaryAsk to JSON.
         * @function toJSON
         * @memberof main.PrimaryAsk
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PrimaryAsk.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PrimaryAsk;
    })();

    main.PrimaryBid = (function() {

        /**
         * Properties of a PrimaryBid.
         * @memberof main
         * @interface IPrimaryBid
         * @property {string|null} [id] PrimaryBid id
         * @property {string|null} [account_id] PrimaryBid account_id
         * @property {number|null} [price] PrimaryBid price
         * @property {number|null} [amount] PrimaryBid amount
         */

        /**
         * Constructs a new PrimaryBid.
         * @memberof main
         * @classdesc Represents a PrimaryBid.
         * @implements IPrimaryBid
         * @constructor
         * @param {main.IPrimaryBid=} [properties] Properties to set
         */
        function PrimaryBid(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PrimaryBid id.
         * @member {string} id
         * @memberof main.PrimaryBid
         * @instance
         */
        PrimaryBid.prototype.id = "";

        /**
         * PrimaryBid account_id.
         * @member {string} account_id
         * @memberof main.PrimaryBid
         * @instance
         */
        PrimaryBid.prototype.account_id = "";

        /**
         * PrimaryBid price.
         * @member {number} price
         * @memberof main.PrimaryBid
         * @instance
         */
        PrimaryBid.prototype.price = 0;

        /**
         * PrimaryBid amount.
         * @member {number} amount
         * @memberof main.PrimaryBid
         * @instance
         */
        PrimaryBid.prototype.amount = 0;

        /**
         * Encodes the specified PrimaryBid message. Does not implicitly {@link main.PrimaryBid.verify|verify} messages.
         * @function encode
         * @memberof main.PrimaryBid
         * @static
         * @param {main.IPrimaryBid} message PrimaryBid message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PrimaryBid.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.account_id != null && Object.hasOwnProperty.call(message, "account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.account_id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.amount);
            return writer;
        };

        /**
         * Encodes the specified PrimaryBid message, length delimited. Does not implicitly {@link main.PrimaryBid.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.PrimaryBid
         * @static
         * @param {main.IPrimaryBid} message PrimaryBid message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PrimaryBid.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PrimaryBid message from the specified reader or buffer.
         * @function decode
         * @memberof main.PrimaryBid
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.PrimaryBid} PrimaryBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PrimaryBid.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.PrimaryBid();
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
                    message.price = reader.double();
                    break;
                case 4:
                    message.amount = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PrimaryBid message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.PrimaryBid
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.PrimaryBid} PrimaryBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PrimaryBid.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PrimaryBid message.
         * @function verify
         * @memberof main.PrimaryBid
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PrimaryBid.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                if (!$util.isString(message.account_id))
                    return "account_id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            return null;
        };

        /**
         * Creates a PrimaryBid message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.PrimaryBid
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.PrimaryBid} PrimaryBid
         */
        PrimaryBid.fromObject = function fromObject(object) {
            if (object instanceof $root.main.PrimaryBid)
                return object;
            let message = new $root.main.PrimaryBid();
            if (object.id != null)
                message.id = String(object.id);
            if (object.account_id != null)
                message.account_id = String(object.account_id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            return message;
        };

        /**
         * Creates a plain object from a PrimaryBid message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.PrimaryBid
         * @static
         * @param {main.PrimaryBid} message PrimaryBid
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PrimaryBid.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.account_id = "";
                object.price = 0;
                object.amount = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                object.account_id = message.account_id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            return object;
        };

        /**
         * Converts this PrimaryBid to JSON.
         * @function toJSON
         * @memberof main.PrimaryBid
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PrimaryBid.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PrimaryBid;
    })();

    main.RenewableBidHistory = (function() {

        /**
         * Properties of a RenewableBidHistory.
         * @memberof main
         * @interface IRenewableBidHistory
         * @property {string|null} [id] RenewableBidHistory id
         * @property {string|null} [account_id] RenewableBidHistory account_id
         * @property {number|null} [price] RenewableBidHistory price
         * @property {number|null} [amount] RenewableBidHistory amount
         * @property {boolean|null} [is_accepted] RenewableBidHistory is_accepted
         * @property {number|null} [contract_price] RenewableBidHistory contract_price
         */

        /**
         * Constructs a new RenewableBidHistory.
         * @memberof main
         * @classdesc Represents a RenewableBidHistory.
         * @implements IRenewableBidHistory
         * @constructor
         * @param {main.IRenewableBidHistory=} [properties] Properties to set
         */
        function RenewableBidHistory(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RenewableBidHistory id.
         * @member {string} id
         * @memberof main.RenewableBidHistory
         * @instance
         */
        RenewableBidHistory.prototype.id = "";

        /**
         * RenewableBidHistory account_id.
         * @member {string} account_id
         * @memberof main.RenewableBidHistory
         * @instance
         */
        RenewableBidHistory.prototype.account_id = "";

        /**
         * RenewableBidHistory price.
         * @member {number} price
         * @memberof main.RenewableBidHistory
         * @instance
         */
        RenewableBidHistory.prototype.price = 0;

        /**
         * RenewableBidHistory amount.
         * @member {number} amount
         * @memberof main.RenewableBidHistory
         * @instance
         */
        RenewableBidHistory.prototype.amount = 0;

        /**
         * RenewableBidHistory is_accepted.
         * @member {boolean} is_accepted
         * @memberof main.RenewableBidHistory
         * @instance
         */
        RenewableBidHistory.prototype.is_accepted = false;

        /**
         * RenewableBidHistory contract_price.
         * @member {number} contract_price
         * @memberof main.RenewableBidHistory
         * @instance
         */
        RenewableBidHistory.prototype.contract_price = 0;

        /**
         * Encodes the specified RenewableBidHistory message. Does not implicitly {@link main.RenewableBidHistory.verify|verify} messages.
         * @function encode
         * @memberof main.RenewableBidHistory
         * @static
         * @param {main.IRenewableBidHistory} message RenewableBidHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenewableBidHistory.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.account_id != null && Object.hasOwnProperty.call(message, "account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.account_id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.amount);
            if (message.is_accepted != null && Object.hasOwnProperty.call(message, "is_accepted"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.is_accepted);
            if (message.contract_price != null && Object.hasOwnProperty.call(message, "contract_price"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.contract_price);
            return writer;
        };

        /**
         * Encodes the specified RenewableBidHistory message, length delimited. Does not implicitly {@link main.RenewableBidHistory.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.RenewableBidHistory
         * @static
         * @param {main.IRenewableBidHistory} message RenewableBidHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenewableBidHistory.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RenewableBidHistory message from the specified reader or buffer.
         * @function decode
         * @memberof main.RenewableBidHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.RenewableBidHistory} RenewableBidHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenewableBidHistory.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.RenewableBidHistory();
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
                    message.price = reader.double();
                    break;
                case 4:
                    message.amount = reader.double();
                    break;
                case 5:
                    message.is_accepted = reader.bool();
                    break;
                case 6:
                    message.contract_price = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RenewableBidHistory message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.RenewableBidHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.RenewableBidHistory} RenewableBidHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenewableBidHistory.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RenewableBidHistory message.
         * @function verify
         * @memberof main.RenewableBidHistory
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RenewableBidHistory.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                if (!$util.isString(message.account_id))
                    return "account_id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            if (message.is_accepted != null && message.hasOwnProperty("is_accepted"))
                if (typeof message.is_accepted !== "boolean")
                    return "is_accepted: boolean expected";
            if (message.contract_price != null && message.hasOwnProperty("contract_price"))
                if (typeof message.contract_price !== "number")
                    return "contract_price: number expected";
            return null;
        };

        /**
         * Creates a RenewableBidHistory message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.RenewableBidHistory
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.RenewableBidHistory} RenewableBidHistory
         */
        RenewableBidHistory.fromObject = function fromObject(object) {
            if (object instanceof $root.main.RenewableBidHistory)
                return object;
            let message = new $root.main.RenewableBidHistory();
            if (object.id != null)
                message.id = String(object.id);
            if (object.account_id != null)
                message.account_id = String(object.account_id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            if (object.is_accepted != null)
                message.is_accepted = Boolean(object.is_accepted);
            if (object.contract_price != null)
                message.contract_price = Number(object.contract_price);
            return message;
        };

        /**
         * Creates a plain object from a RenewableBidHistory message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.RenewableBidHistory
         * @static
         * @param {main.RenewableBidHistory} message RenewableBidHistory
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RenewableBidHistory.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.account_id = "";
                object.price = 0;
                object.amount = 0;
                object.is_accepted = false;
                object.contract_price = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                object.account_id = message.account_id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            if (message.is_accepted != null && message.hasOwnProperty("is_accepted"))
                object.is_accepted = message.is_accepted;
            if (message.contract_price != null && message.hasOwnProperty("contract_price"))
                object.contract_price = options.json && !isFinite(message.contract_price) ? String(message.contract_price) : message.contract_price;
            return object;
        };

        /**
         * Converts this RenewableBidHistory to JSON.
         * @function toJSON
         * @memberof main.RenewableBidHistory
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RenewableBidHistory.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RenewableBidHistory;
    })();

    /**
     * RenewableAskHistoryType enum.
     * @name main.RenewableAskHistoryType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} PRIMARY=1 PRIMARY value
     * @property {number} SECONDARY=2 SECONDARY value
     */
    main.RenewableAskHistoryType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "PRIMARY"] = 1;
        values[valuesById[2] = "SECONDARY"] = 2;
        return values;
    })();

    main.RenewableAskHistory = (function() {

        /**
         * Properties of a RenewableAskHistory.
         * @memberof main
         * @interface IRenewableAskHistory
         * @property {string|null} [id] RenewableAskHistory id
         * @property {main.RenewableAskHistoryType|null} [type] RenewableAskHistory type
         * @property {string|null} [account_id] RenewableAskHistory account_id
         * @property {number|null} [price] RenewableAskHistory price
         * @property {number|null} [amount] RenewableAskHistory amount
         * @property {boolean|null} [is_accepted] RenewableAskHistory is_accepted
         * @property {number|null} [contract_price] RenewableAskHistory contract_price
         */

        /**
         * Constructs a new RenewableAskHistory.
         * @memberof main
         * @classdesc Represents a RenewableAskHistory.
         * @implements IRenewableAskHistory
         * @constructor
         * @param {main.IRenewableAskHistory=} [properties] Properties to set
         */
        function RenewableAskHistory(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RenewableAskHistory id.
         * @member {string} id
         * @memberof main.RenewableAskHistory
         * @instance
         */
        RenewableAskHistory.prototype.id = "";

        /**
         * RenewableAskHistory type.
         * @member {main.RenewableAskHistoryType} type
         * @memberof main.RenewableAskHistory
         * @instance
         */
        RenewableAskHistory.prototype.type = 0;

        /**
         * RenewableAskHistory account_id.
         * @member {string} account_id
         * @memberof main.RenewableAskHistory
         * @instance
         */
        RenewableAskHistory.prototype.account_id = "";

        /**
         * RenewableAskHistory price.
         * @member {number} price
         * @memberof main.RenewableAskHistory
         * @instance
         */
        RenewableAskHistory.prototype.price = 0;

        /**
         * RenewableAskHistory amount.
         * @member {number} amount
         * @memberof main.RenewableAskHistory
         * @instance
         */
        RenewableAskHistory.prototype.amount = 0;

        /**
         * RenewableAskHistory is_accepted.
         * @member {boolean} is_accepted
         * @memberof main.RenewableAskHistory
         * @instance
         */
        RenewableAskHistory.prototype.is_accepted = false;

        /**
         * RenewableAskHistory contract_price.
         * @member {number} contract_price
         * @memberof main.RenewableAskHistory
         * @instance
         */
        RenewableAskHistory.prototype.contract_price = 0;

        /**
         * Encodes the specified RenewableAskHistory message. Does not implicitly {@link main.RenewableAskHistory.verify|verify} messages.
         * @function encode
         * @memberof main.RenewableAskHistory
         * @static
         * @param {main.IRenewableAskHistory} message RenewableAskHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenewableAskHistory.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.account_id != null && Object.hasOwnProperty.call(message, "account_id"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.account_id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.amount);
            if (message.is_accepted != null && Object.hasOwnProperty.call(message, "is_accepted"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.is_accepted);
            if (message.contract_price != null && Object.hasOwnProperty.call(message, "contract_price"))
                writer.uint32(/* id 7, wireType 1 =*/57).double(message.contract_price);
            return writer;
        };

        /**
         * Encodes the specified RenewableAskHistory message, length delimited. Does not implicitly {@link main.RenewableAskHistory.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.RenewableAskHistory
         * @static
         * @param {main.IRenewableAskHistory} message RenewableAskHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenewableAskHistory.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RenewableAskHistory message from the specified reader or buffer.
         * @function decode
         * @memberof main.RenewableAskHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.RenewableAskHistory} RenewableAskHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenewableAskHistory.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.RenewableAskHistory();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.account_id = reader.string();
                    break;
                case 4:
                    message.price = reader.double();
                    break;
                case 5:
                    message.amount = reader.double();
                    break;
                case 6:
                    message.is_accepted = reader.bool();
                    break;
                case 7:
                    message.contract_price = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RenewableAskHistory message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.RenewableAskHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.RenewableAskHistory} RenewableAskHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenewableAskHistory.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RenewableAskHistory message.
         * @function verify
         * @memberof main.RenewableAskHistory
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RenewableAskHistory.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                if (!$util.isString(message.account_id))
                    return "account_id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            if (message.is_accepted != null && message.hasOwnProperty("is_accepted"))
                if (typeof message.is_accepted !== "boolean")
                    return "is_accepted: boolean expected";
            if (message.contract_price != null && message.hasOwnProperty("contract_price"))
                if (typeof message.contract_price !== "number")
                    return "contract_price: number expected";
            return null;
        };

        /**
         * Creates a RenewableAskHistory message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.RenewableAskHistory
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.RenewableAskHistory} RenewableAskHistory
         */
        RenewableAskHistory.fromObject = function fromObject(object) {
            if (object instanceof $root.main.RenewableAskHistory)
                return object;
            let message = new $root.main.RenewableAskHistory();
            if (object.id != null)
                message.id = String(object.id);
            switch (object.type) {
            case "UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "PRIMARY":
            case 1:
                message.type = 1;
                break;
            case "SECONDARY":
            case 2:
                message.type = 2;
                break;
            }
            if (object.account_id != null)
                message.account_id = String(object.account_id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            if (object.is_accepted != null)
                message.is_accepted = Boolean(object.is_accepted);
            if (object.contract_price != null)
                message.contract_price = Number(object.contract_price);
            return message;
        };

        /**
         * Creates a plain object from a RenewableAskHistory message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.RenewableAskHistory
         * @static
         * @param {main.RenewableAskHistory} message RenewableAskHistory
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RenewableAskHistory.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.type = options.enums === String ? "UNKNOWN" : 0;
                object.account_id = "";
                object.price = 0;
                object.amount = 0;
                object.is_accepted = false;
                object.contract_price = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.main.RenewableAskHistoryType[message.type] : message.type;
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                object.account_id = message.account_id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            if (message.is_accepted != null && message.hasOwnProperty("is_accepted"))
                object.is_accepted = message.is_accepted;
            if (message.contract_price != null && message.hasOwnProperty("contract_price"))
                object.contract_price = options.json && !isFinite(message.contract_price) ? String(message.contract_price) : message.contract_price;
            return object;
        };

        /**
         * Converts this RenewableAskHistory to JSON.
         * @function toJSON
         * @memberof main.RenewableAskHistory
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RenewableAskHistory.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RenewableAskHistory;
    })();

    /**
     * RenewableAskType enum.
     * @name main.RenewableAskType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} PRIMARY=1 PRIMARY value
     * @property {number} SECONDARY=2 SECONDARY value
     */
    main.RenewableAskType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "PRIMARY"] = 1;
        values[valuesById[2] = "SECONDARY"] = 2;
        return values;
    })();

    main.RenewableAsk = (function() {

        /**
         * Properties of a RenewableAsk.
         * @memberof main
         * @interface IRenewableAsk
         * @property {string|null} [id] RenewableAsk id
         * @property {main.RenewableAskType|null} [type] RenewableAsk type
         * @property {string|null} [account_id] RenewableAsk account_id
         * @property {number|null} [price] RenewableAsk price
         * @property {number|null} [amount] RenewableAsk amount
         */

        /**
         * Constructs a new RenewableAsk.
         * @memberof main
         * @classdesc Represents a RenewableAsk.
         * @implements IRenewableAsk
         * @constructor
         * @param {main.IRenewableAsk=} [properties] Properties to set
         */
        function RenewableAsk(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RenewableAsk id.
         * @member {string} id
         * @memberof main.RenewableAsk
         * @instance
         */
        RenewableAsk.prototype.id = "";

        /**
         * RenewableAsk type.
         * @member {main.RenewableAskType} type
         * @memberof main.RenewableAsk
         * @instance
         */
        RenewableAsk.prototype.type = 0;

        /**
         * RenewableAsk account_id.
         * @member {string} account_id
         * @memberof main.RenewableAsk
         * @instance
         */
        RenewableAsk.prototype.account_id = "";

        /**
         * RenewableAsk price.
         * @member {number} price
         * @memberof main.RenewableAsk
         * @instance
         */
        RenewableAsk.prototype.price = 0;

        /**
         * RenewableAsk amount.
         * @member {number} amount
         * @memberof main.RenewableAsk
         * @instance
         */
        RenewableAsk.prototype.amount = 0;

        /**
         * Encodes the specified RenewableAsk message. Does not implicitly {@link main.RenewableAsk.verify|verify} messages.
         * @function encode
         * @memberof main.RenewableAsk
         * @static
         * @param {main.IRenewableAsk} message RenewableAsk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenewableAsk.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.account_id != null && Object.hasOwnProperty.call(message, "account_id"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.account_id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.amount);
            return writer;
        };

        /**
         * Encodes the specified RenewableAsk message, length delimited. Does not implicitly {@link main.RenewableAsk.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.RenewableAsk
         * @static
         * @param {main.IRenewableAsk} message RenewableAsk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenewableAsk.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RenewableAsk message from the specified reader or buffer.
         * @function decode
         * @memberof main.RenewableAsk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.RenewableAsk} RenewableAsk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenewableAsk.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.RenewableAsk();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.account_id = reader.string();
                    break;
                case 4:
                    message.price = reader.double();
                    break;
                case 5:
                    message.amount = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RenewableAsk message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.RenewableAsk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.RenewableAsk} RenewableAsk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenewableAsk.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RenewableAsk message.
         * @function verify
         * @memberof main.RenewableAsk
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RenewableAsk.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                if (!$util.isString(message.account_id))
                    return "account_id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            return null;
        };

        /**
         * Creates a RenewableAsk message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.RenewableAsk
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.RenewableAsk} RenewableAsk
         */
        RenewableAsk.fromObject = function fromObject(object) {
            if (object instanceof $root.main.RenewableAsk)
                return object;
            let message = new $root.main.RenewableAsk();
            if (object.id != null)
                message.id = String(object.id);
            switch (object.type) {
            case "UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "PRIMARY":
            case 1:
                message.type = 1;
                break;
            case "SECONDARY":
            case 2:
                message.type = 2;
                break;
            }
            if (object.account_id != null)
                message.account_id = String(object.account_id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            return message;
        };

        /**
         * Creates a plain object from a RenewableAsk message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.RenewableAsk
         * @static
         * @param {main.RenewableAsk} message RenewableAsk
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RenewableAsk.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.type = options.enums === String ? "UNKNOWN" : 0;
                object.account_id = "";
                object.price = 0;
                object.amount = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.main.RenewableAskType[message.type] : message.type;
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                object.account_id = message.account_id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            return object;
        };

        /**
         * Converts this RenewableAsk to JSON.
         * @function toJSON
         * @memberof main.RenewableAsk
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RenewableAsk.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RenewableAsk;
    })();

    main.RenewableBid = (function() {

        /**
         * Properties of a RenewableBid.
         * @memberof main
         * @interface IRenewableBid
         * @property {string|null} [id] RenewableBid id
         * @property {string|null} [account_id] RenewableBid account_id
         * @property {number|null} [price] RenewableBid price
         * @property {number|null} [amount] RenewableBid amount
         */

        /**
         * Constructs a new RenewableBid.
         * @memberof main
         * @classdesc Represents a RenewableBid.
         * @implements IRenewableBid
         * @constructor
         * @param {main.IRenewableBid=} [properties] Properties to set
         */
        function RenewableBid(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RenewableBid id.
         * @member {string} id
         * @memberof main.RenewableBid
         * @instance
         */
        RenewableBid.prototype.id = "";

        /**
         * RenewableBid account_id.
         * @member {string} account_id
         * @memberof main.RenewableBid
         * @instance
         */
        RenewableBid.prototype.account_id = "";

        /**
         * RenewableBid price.
         * @member {number} price
         * @memberof main.RenewableBid
         * @instance
         */
        RenewableBid.prototype.price = 0;

        /**
         * RenewableBid amount.
         * @member {number} amount
         * @memberof main.RenewableBid
         * @instance
         */
        RenewableBid.prototype.amount = 0;

        /**
         * Encodes the specified RenewableBid message. Does not implicitly {@link main.RenewableBid.verify|verify} messages.
         * @function encode
         * @memberof main.RenewableBid
         * @static
         * @param {main.IRenewableBid} message RenewableBid message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenewableBid.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.account_id != null && Object.hasOwnProperty.call(message, "account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.account_id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.amount);
            return writer;
        };

        /**
         * Encodes the specified RenewableBid message, length delimited. Does not implicitly {@link main.RenewableBid.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.RenewableBid
         * @static
         * @param {main.IRenewableBid} message RenewableBid message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenewableBid.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RenewableBid message from the specified reader or buffer.
         * @function decode
         * @memberof main.RenewableBid
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.RenewableBid} RenewableBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenewableBid.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.RenewableBid();
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
                    message.price = reader.double();
                    break;
                case 4:
                    message.amount = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RenewableBid message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.RenewableBid
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.RenewableBid} RenewableBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenewableBid.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RenewableBid message.
         * @function verify
         * @memberof main.RenewableBid
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RenewableBid.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                if (!$util.isString(message.account_id))
                    return "account_id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            return null;
        };

        /**
         * Creates a RenewableBid message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.RenewableBid
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.RenewableBid} RenewableBid
         */
        RenewableBid.fromObject = function fromObject(object) {
            if (object instanceof $root.main.RenewableBid)
                return object;
            let message = new $root.main.RenewableBid();
            if (object.id != null)
                message.id = String(object.id);
            if (object.account_id != null)
                message.account_id = String(object.account_id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            return message;
        };

        /**
         * Creates a plain object from a RenewableBid message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.RenewableBid
         * @static
         * @param {main.RenewableBid} message RenewableBid
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RenewableBid.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.account_id = "";
                object.price = 0;
                object.amount = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.account_id != null && message.hasOwnProperty("account_id"))
                object.account_id = message.account_id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            return object;
        };

        /**
         * Converts this RenewableBid to JSON.
         * @function toJSON
         * @memberof main.RenewableBid
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RenewableBid.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RenewableBid;
    })();

    main.RenewableSettlement = (function() {

        /**
         * Properties of a RenewableSettlement.
         * @memberof main
         * @interface IRenewableSettlement
         * @property {string|null} [id] RenewableSettlement id
         * @property {string|null} [bid_id] RenewableSettlement bid_id
         * @property {string|null} [ask_id] RenewableSettlement ask_id
         * @property {number|null} [price] RenewableSettlement price
         * @property {number|null} [amount] RenewableSettlement amount
         */

        /**
         * Constructs a new RenewableSettlement.
         * @memberof main
         * @classdesc Represents a RenewableSettlement.
         * @implements IRenewableSettlement
         * @constructor
         * @param {main.IRenewableSettlement=} [properties] Properties to set
         */
        function RenewableSettlement(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RenewableSettlement id.
         * @member {string} id
         * @memberof main.RenewableSettlement
         * @instance
         */
        RenewableSettlement.prototype.id = "";

        /**
         * RenewableSettlement bid_id.
         * @member {string} bid_id
         * @memberof main.RenewableSettlement
         * @instance
         */
        RenewableSettlement.prototype.bid_id = "";

        /**
         * RenewableSettlement ask_id.
         * @member {string} ask_id
         * @memberof main.RenewableSettlement
         * @instance
         */
        RenewableSettlement.prototype.ask_id = "";

        /**
         * RenewableSettlement price.
         * @member {number} price
         * @memberof main.RenewableSettlement
         * @instance
         */
        RenewableSettlement.prototype.price = 0;

        /**
         * RenewableSettlement amount.
         * @member {number} amount
         * @memberof main.RenewableSettlement
         * @instance
         */
        RenewableSettlement.prototype.amount = 0;

        /**
         * Encodes the specified RenewableSettlement message. Does not implicitly {@link main.RenewableSettlement.verify|verify} messages.
         * @function encode
         * @memberof main.RenewableSettlement
         * @static
         * @param {main.IRenewableSettlement} message RenewableSettlement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenewableSettlement.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.bid_id != null && Object.hasOwnProperty.call(message, "bid_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.bid_id);
            if (message.ask_id != null && Object.hasOwnProperty.call(message, "ask_id"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.ask_id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.amount);
            return writer;
        };

        /**
         * Encodes the specified RenewableSettlement message, length delimited. Does not implicitly {@link main.RenewableSettlement.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.RenewableSettlement
         * @static
         * @param {main.IRenewableSettlement} message RenewableSettlement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenewableSettlement.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RenewableSettlement message from the specified reader or buffer.
         * @function decode
         * @memberof main.RenewableSettlement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.RenewableSettlement} RenewableSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenewableSettlement.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.RenewableSettlement();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.bid_id = reader.string();
                    break;
                case 3:
                    message.ask_id = reader.string();
                    break;
                case 4:
                    message.price = reader.double();
                    break;
                case 5:
                    message.amount = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RenewableSettlement message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.RenewableSettlement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.RenewableSettlement} RenewableSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenewableSettlement.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RenewableSettlement message.
         * @function verify
         * @memberof main.RenewableSettlement
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RenewableSettlement.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.bid_id != null && message.hasOwnProperty("bid_id"))
                if (!$util.isString(message.bid_id))
                    return "bid_id: string expected";
            if (message.ask_id != null && message.hasOwnProperty("ask_id"))
                if (!$util.isString(message.ask_id))
                    return "ask_id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            return null;
        };

        /**
         * Creates a RenewableSettlement message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.RenewableSettlement
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.RenewableSettlement} RenewableSettlement
         */
        RenewableSettlement.fromObject = function fromObject(object) {
            if (object instanceof $root.main.RenewableSettlement)
                return object;
            let message = new $root.main.RenewableSettlement();
            if (object.id != null)
                message.id = String(object.id);
            if (object.bid_id != null)
                message.bid_id = String(object.bid_id);
            if (object.ask_id != null)
                message.ask_id = String(object.ask_id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            return message;
        };

        /**
         * Creates a plain object from a RenewableSettlement message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.RenewableSettlement
         * @static
         * @param {main.RenewableSettlement} message RenewableSettlement
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RenewableSettlement.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.bid_id = "";
                object.ask_id = "";
                object.price = 0;
                object.amount = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.bid_id != null && message.hasOwnProperty("bid_id"))
                object.bid_id = message.bid_id;
            if (message.ask_id != null && message.hasOwnProperty("ask_id"))
                object.ask_id = message.ask_id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            return object;
        };

        /**
         * Converts this RenewableSettlement to JSON.
         * @function toJSON
         * @memberof main.RenewableSettlement
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RenewableSettlement.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RenewableSettlement;
    })();

    main.SinglePriceNormalSettlement = (function() {

        /**
         * Properties of a SinglePriceNormalSettlement.
         * @memberof main
         * @interface ISinglePriceNormalSettlement
         * @property {string|null} [id] SinglePriceNormalSettlement id
         * @property {number|null} [price] SinglePriceNormalSettlement price
         * @property {number|null} [amount] SinglePriceNormalSettlement amount
         */

        /**
         * Constructs a new SinglePriceNormalSettlement.
         * @memberof main
         * @classdesc Represents a SinglePriceNormalSettlement.
         * @implements ISinglePriceNormalSettlement
         * @constructor
         * @param {main.ISinglePriceNormalSettlement=} [properties] Properties to set
         */
        function SinglePriceNormalSettlement(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SinglePriceNormalSettlement id.
         * @member {string} id
         * @memberof main.SinglePriceNormalSettlement
         * @instance
         */
        SinglePriceNormalSettlement.prototype.id = "";

        /**
         * SinglePriceNormalSettlement price.
         * @member {number} price
         * @memberof main.SinglePriceNormalSettlement
         * @instance
         */
        SinglePriceNormalSettlement.prototype.price = 0;

        /**
         * SinglePriceNormalSettlement amount.
         * @member {number} amount
         * @memberof main.SinglePriceNormalSettlement
         * @instance
         */
        SinglePriceNormalSettlement.prototype.amount = 0;

        /**
         * Encodes the specified SinglePriceNormalSettlement message. Does not implicitly {@link main.SinglePriceNormalSettlement.verify|verify} messages.
         * @function encode
         * @memberof main.SinglePriceNormalSettlement
         * @static
         * @param {main.ISinglePriceNormalSettlement} message SinglePriceNormalSettlement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SinglePriceNormalSettlement.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.amount);
            return writer;
        };

        /**
         * Encodes the specified SinglePriceNormalSettlement message, length delimited. Does not implicitly {@link main.SinglePriceNormalSettlement.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.SinglePriceNormalSettlement
         * @static
         * @param {main.ISinglePriceNormalSettlement} message SinglePriceNormalSettlement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SinglePriceNormalSettlement.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SinglePriceNormalSettlement message from the specified reader or buffer.
         * @function decode
         * @memberof main.SinglePriceNormalSettlement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.SinglePriceNormalSettlement} SinglePriceNormalSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SinglePriceNormalSettlement.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.SinglePriceNormalSettlement();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.price = reader.double();
                    break;
                case 3:
                    message.amount = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SinglePriceNormalSettlement message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.SinglePriceNormalSettlement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.SinglePriceNormalSettlement} SinglePriceNormalSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SinglePriceNormalSettlement.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SinglePriceNormalSettlement message.
         * @function verify
         * @memberof main.SinglePriceNormalSettlement
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SinglePriceNormalSettlement.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            return null;
        };

        /**
         * Creates a SinglePriceNormalSettlement message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.SinglePriceNormalSettlement
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.SinglePriceNormalSettlement} SinglePriceNormalSettlement
         */
        SinglePriceNormalSettlement.fromObject = function fromObject(object) {
            if (object instanceof $root.main.SinglePriceNormalSettlement)
                return object;
            let message = new $root.main.SinglePriceNormalSettlement();
            if (object.id != null)
                message.id = String(object.id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            return message;
        };

        /**
         * Creates a plain object from a SinglePriceNormalSettlement message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.SinglePriceNormalSettlement
         * @static
         * @param {main.SinglePriceNormalSettlement} message SinglePriceNormalSettlement
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SinglePriceNormalSettlement.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.price = 0;
                object.amount = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            return object;
        };

        /**
         * Converts this SinglePriceNormalSettlement to JSON.
         * @function toJSON
         * @memberof main.SinglePriceNormalSettlement
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SinglePriceNormalSettlement.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SinglePriceNormalSettlement;
    })();

    main.SinglePriceRenewableSettlement = (function() {

        /**
         * Properties of a SinglePriceRenewableSettlement.
         * @memberof main
         * @interface ISinglePriceRenewableSettlement
         * @property {string|null} [id] SinglePriceRenewableSettlement id
         * @property {number|null} [price] SinglePriceRenewableSettlement price
         * @property {number|null} [amount] SinglePriceRenewableSettlement amount
         */

        /**
         * Constructs a new SinglePriceRenewableSettlement.
         * @memberof main
         * @classdesc Represents a SinglePriceRenewableSettlement.
         * @implements ISinglePriceRenewableSettlement
         * @constructor
         * @param {main.ISinglePriceRenewableSettlement=} [properties] Properties to set
         */
        function SinglePriceRenewableSettlement(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SinglePriceRenewableSettlement id.
         * @member {string} id
         * @memberof main.SinglePriceRenewableSettlement
         * @instance
         */
        SinglePriceRenewableSettlement.prototype.id = "";

        /**
         * SinglePriceRenewableSettlement price.
         * @member {number} price
         * @memberof main.SinglePriceRenewableSettlement
         * @instance
         */
        SinglePriceRenewableSettlement.prototype.price = 0;

        /**
         * SinglePriceRenewableSettlement amount.
         * @member {number} amount
         * @memberof main.SinglePriceRenewableSettlement
         * @instance
         */
        SinglePriceRenewableSettlement.prototype.amount = 0;

        /**
         * Encodes the specified SinglePriceRenewableSettlement message. Does not implicitly {@link main.SinglePriceRenewableSettlement.verify|verify} messages.
         * @function encode
         * @memberof main.SinglePriceRenewableSettlement
         * @static
         * @param {main.ISinglePriceRenewableSettlement} message SinglePriceRenewableSettlement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SinglePriceRenewableSettlement.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.amount);
            return writer;
        };

        /**
         * Encodes the specified SinglePriceRenewableSettlement message, length delimited. Does not implicitly {@link main.SinglePriceRenewableSettlement.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.SinglePriceRenewableSettlement
         * @static
         * @param {main.ISinglePriceRenewableSettlement} message SinglePriceRenewableSettlement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SinglePriceRenewableSettlement.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SinglePriceRenewableSettlement message from the specified reader or buffer.
         * @function decode
         * @memberof main.SinglePriceRenewableSettlement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.SinglePriceRenewableSettlement} SinglePriceRenewableSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SinglePriceRenewableSettlement.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.SinglePriceRenewableSettlement();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.price = reader.double();
                    break;
                case 3:
                    message.amount = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SinglePriceRenewableSettlement message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.SinglePriceRenewableSettlement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.SinglePriceRenewableSettlement} SinglePriceRenewableSettlement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SinglePriceRenewableSettlement.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SinglePriceRenewableSettlement message.
         * @function verify
         * @memberof main.SinglePriceRenewableSettlement
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SinglePriceRenewableSettlement.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            return null;
        };

        /**
         * Creates a SinglePriceRenewableSettlement message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.SinglePriceRenewableSettlement
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.SinglePriceRenewableSettlement} SinglePriceRenewableSettlement
         */
        SinglePriceRenewableSettlement.fromObject = function fromObject(object) {
            if (object instanceof $root.main.SinglePriceRenewableSettlement)
                return object;
            let message = new $root.main.SinglePriceRenewableSettlement();
            if (object.id != null)
                message.id = String(object.id);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.amount != null)
                message.amount = Number(object.amount);
            return message;
        };

        /**
         * Creates a plain object from a SinglePriceRenewableSettlement message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.SinglePriceRenewableSettlement
         * @static
         * @param {main.SinglePriceRenewableSettlement} message SinglePriceRenewableSettlement
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SinglePriceRenewableSettlement.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.price = 0;
                object.amount = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            return object;
        };

        /**
         * Converts this SinglePriceRenewableSettlement to JSON.
         * @function toJSON
         * @memberof main.SinglePriceRenewableSettlement
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SinglePriceRenewableSettlement.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SinglePriceRenewableSettlement;
    })();

    main.SolarPower = (function() {

        /**
         * Properties of a SolarPower.
         * @memberof main
         * @interface ISolarPower
         * @property {string|null} [id] SolarPower id
         * @property {string|null} [student_account_id] SolarPower student_account_id
         * @property {number|null} [amount_kwh] SolarPower amount_kwh
         * @property {number|null} [price] SolarPower price
         * @property {string|null} [denom] SolarPower denom
         */

        /**
         * Constructs a new SolarPower.
         * @memberof main
         * @classdesc Represents a SolarPower.
         * @implements ISolarPower
         * @constructor
         * @param {main.ISolarPower=} [properties] Properties to set
         */
        function SolarPower(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SolarPower id.
         * @member {string} id
         * @memberof main.SolarPower
         * @instance
         */
        SolarPower.prototype.id = "";

        /**
         * SolarPower student_account_id.
         * @member {string} student_account_id
         * @memberof main.SolarPower
         * @instance
         */
        SolarPower.prototype.student_account_id = "";

        /**
         * SolarPower amount_kwh.
         * @member {number} amount_kwh
         * @memberof main.SolarPower
         * @instance
         */
        SolarPower.prototype.amount_kwh = 0;

        /**
         * SolarPower price.
         * @member {number} price
         * @memberof main.SolarPower
         * @instance
         */
        SolarPower.prototype.price = 0;

        /**
         * SolarPower denom.
         * @member {string} denom
         * @memberof main.SolarPower
         * @instance
         */
        SolarPower.prototype.denom = "";

        /**
         * Encodes the specified SolarPower message. Does not implicitly {@link main.SolarPower.verify|verify} messages.
         * @function encode
         * @memberof main.SolarPower
         * @static
         * @param {main.ISolarPower} message SolarPower message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolarPower.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.student_account_id != null && Object.hasOwnProperty.call(message, "student_account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.student_account_id);
            if (message.amount_kwh != null && Object.hasOwnProperty.call(message, "amount_kwh"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.amount_kwh);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.price);
            if (message.denom != null && Object.hasOwnProperty.call(message, "denom"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.denom);
            return writer;
        };

        /**
         * Encodes the specified SolarPower message, length delimited. Does not implicitly {@link main.SolarPower.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.SolarPower
         * @static
         * @param {main.ISolarPower} message SolarPower message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SolarPower.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SolarPower message from the specified reader or buffer.
         * @function decode
         * @memberof main.SolarPower
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.SolarPower} SolarPower
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolarPower.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.SolarPower();
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
                    message.amount_kwh = reader.double();
                    break;
                case 4:
                    message.price = reader.double();
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
         * Decodes a SolarPower message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.SolarPower
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.SolarPower} SolarPower
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SolarPower.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SolarPower message.
         * @function verify
         * @memberof main.SolarPower
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SolarPower.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                if (!$util.isString(message.student_account_id))
                    return "student_account_id: string expected";
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                if (typeof message.amount_kwh !== "number")
                    return "amount_kwh: number expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.denom != null && message.hasOwnProperty("denom"))
                if (!$util.isString(message.denom))
                    return "denom: string expected";
            return null;
        };

        /**
         * Creates a SolarPower message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.SolarPower
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.SolarPower} SolarPower
         */
        SolarPower.fromObject = function fromObject(object) {
            if (object instanceof $root.main.SolarPower)
                return object;
            let message = new $root.main.SolarPower();
            if (object.id != null)
                message.id = String(object.id);
            if (object.student_account_id != null)
                message.student_account_id = String(object.student_account_id);
            if (object.amount_kwh != null)
                message.amount_kwh = Number(object.amount_kwh);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.denom != null)
                message.denom = String(object.denom);
            return message;
        };

        /**
         * Creates a plain object from a SolarPower message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.SolarPower
         * @static
         * @param {main.SolarPower} message SolarPower
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SolarPower.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.student_account_id = "";
                object.amount_kwh = 0;
                object.price = 0;
                object.denom = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                object.student_account_id = message.student_account_id;
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                object.amount_kwh = options.json && !isFinite(message.amount_kwh) ? String(message.amount_kwh) : message.amount_kwh;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.denom != null && message.hasOwnProperty("denom"))
                object.denom = message.denom;
            return object;
        };

        /**
         * Converts this SolarPower to JSON.
         * @function toJSON
         * @memberof main.SolarPower
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SolarPower.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SolarPower;
    })();

    main.StudentAccount = (function() {

        /**
         * Properties of a StudentAccount.
         * @memberof main
         * @interface IStudentAccount
         * @property {string|null} [id] StudentAccount id
         * @property {Array.<string>|null} [user_ids] StudentAccount user_ids
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
            this.user_ids = [];
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
         * StudentAccount user_ids.
         * @member {Array.<string>} user_ids
         * @memberof main.StudentAccount
         * @instance
         */
        StudentAccount.prototype.user_ids = $util.emptyArray;

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
            if (message.user_ids != null && message.user_ids.length)
                for (let i = 0; i < message.user_ids.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.user_ids[i]);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.payment_method != null && Object.hasOwnProperty.call(message, "payment_method"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.payment_method);
            if (message.xrp_address != null && Object.hasOwnProperty.call(message, "xrp_address"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.xrp_address);
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
                    if (!(message.user_ids && message.user_ids.length))
                        message.user_ids = [];
                    message.user_ids.push(reader.string());
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.payment_method = reader.string();
                    break;
                case 5:
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
            if (message.user_ids != null && message.hasOwnProperty("user_ids")) {
                if (!Array.isArray(message.user_ids))
                    return "user_ids: array expected";
                for (let i = 0; i < message.user_ids.length; ++i)
                    if (!$util.isString(message.user_ids[i]))
                        return "user_ids: string[] expected";
            }
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
            if (object.user_ids) {
                if (!Array.isArray(object.user_ids))
                    throw TypeError(".main.StudentAccount.user_ids: array expected");
                message.user_ids = [];
                for (let i = 0; i < object.user_ids.length; ++i)
                    message.user_ids[i] = String(object.user_ids[i]);
            }
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
            if (options.arrays || options.defaults)
                object.user_ids = [];
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.payment_method = "";
                object.xrp_address = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.user_ids && message.user_ids.length) {
                object.user_ids = [];
                for (let j = 0; j < message.user_ids.length; ++j)
                    object.user_ids[j] = message.user_ids[j];
            }
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
         * @property {boolean|null} [status] Transaction status
         * @property {string|null} [id] Transaction id
         * @property {string|null} [sender_account_id] Transaction sender_account_id
         * @property {string|null} [sender_xrp_address] Transaction sender_xrp_address
         * @property {string|null} [recipient_account_id] Transaction recipient_account_id
         * @property {string|null} [recipient_xrp_address] Transaction recipient_xrp_address
         * @property {number|null} [amount] Transaction amount
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
         * Transaction status.
         * @member {boolean} status
         * @memberof main.Transaction
         * @instance
         */
        Transaction.prototype.status = false;

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
         * @member {number} amount
         * @memberof main.Transaction
         * @instance
         */
        Transaction.prototype.amount = 0;

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
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.status);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.id);
            if (message.sender_account_id != null && Object.hasOwnProperty.call(message, "sender_account_id"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.sender_account_id);
            if (message.sender_xrp_address != null && Object.hasOwnProperty.call(message, "sender_xrp_address"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.sender_xrp_address);
            if (message.recipient_account_id != null && Object.hasOwnProperty.call(message, "recipient_account_id"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.recipient_account_id);
            if (message.recipient_xrp_address != null && Object.hasOwnProperty.call(message, "recipient_xrp_address"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.recipient_xrp_address);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 7, wireType 1 =*/57).double(message.amount);
            if (message.denom != null && Object.hasOwnProperty.call(message, "denom"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.denom);
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
                    message.status = reader.bool();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.sender_account_id = reader.string();
                    break;
                case 4:
                    message.sender_xrp_address = reader.string();
                    break;
                case 5:
                    message.recipient_account_id = reader.string();
                    break;
                case 6:
                    message.recipient_xrp_address = reader.string();
                    break;
                case 7:
                    message.amount = reader.double();
                    break;
                case 8:
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
            if (message.status != null && message.hasOwnProperty("status"))
                if (typeof message.status !== "boolean")
                    return "status: boolean expected";
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
                if (typeof message.amount !== "number")
                    return "amount: number expected";
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
            if (object.status != null)
                message.status = Boolean(object.status);
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
                message.amount = Number(object.amount);
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
                object.status = false;
                object.id = "";
                object.sender_account_id = "";
                object.sender_xrp_address = "";
                object.recipient_account_id = "";
                object.recipient_xrp_address = "";
                object.amount = 0;
                object.denom = "";
            }
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
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
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
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

    main.User = (function() {

        /**
         * Properties of a User.
         * @memberof main
         * @interface IUser
         * @property {string|null} [id] User id
         * @property {string|null} [current_account_id] User current_account_id
         * @property {Array.<string>|null} [account_ids_order] User account_ids_order
         */

        /**
         * Constructs a new User.
         * @memberof main
         * @classdesc Represents a User.
         * @implements IUser
         * @constructor
         * @param {main.IUser=} [properties] Properties to set
         */
        function User(properties) {
            this.account_ids_order = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * User id.
         * @member {string} id
         * @memberof main.User
         * @instance
         */
        User.prototype.id = "";

        /**
         * User current_account_id.
         * @member {string} current_account_id
         * @memberof main.User
         * @instance
         */
        User.prototype.current_account_id = "";

        /**
         * User account_ids_order.
         * @member {Array.<string>} account_ids_order
         * @memberof main.User
         * @instance
         */
        User.prototype.account_ids_order = $util.emptyArray;

        /**
         * Encodes the specified User message. Does not implicitly {@link main.User.verify|verify} messages.
         * @function encode
         * @memberof main.User
         * @static
         * @param {main.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.current_account_id != null && Object.hasOwnProperty.call(message, "current_account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.current_account_id);
            if (message.account_ids_order != null && message.account_ids_order.length)
                for (let i = 0; i < message.account_ids_order.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.account_ids_order[i]);
            return writer;
        };

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link main.User.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.User
         * @static
         * @param {main.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a User message from the specified reader or buffer.
         * @function decode
         * @memberof main.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.User();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.current_account_id = reader.string();
                    break;
                case 3:
                    if (!(message.account_ids_order && message.account_ids_order.length))
                        message.account_ids_order = [];
                    message.account_ids_order.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a User message.
         * @function verify
         * @memberof main.User
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        User.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.current_account_id != null && message.hasOwnProperty("current_account_id"))
                if (!$util.isString(message.current_account_id))
                    return "current_account_id: string expected";
            if (message.account_ids_order != null && message.hasOwnProperty("account_ids_order")) {
                if (!Array.isArray(message.account_ids_order))
                    return "account_ids_order: array expected";
                for (let i = 0; i < message.account_ids_order.length; ++i)
                    if (!$util.isString(message.account_ids_order[i]))
                        return "account_ids_order: string[] expected";
            }
            return null;
        };

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.User
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.User} User
         */
        User.fromObject = function fromObject(object) {
            if (object instanceof $root.main.User)
                return object;
            let message = new $root.main.User();
            if (object.id != null)
                message.id = String(object.id);
            if (object.current_account_id != null)
                message.current_account_id = String(object.current_account_id);
            if (object.account_ids_order) {
                if (!Array.isArray(object.account_ids_order))
                    throw TypeError(".main.User.account_ids_order: array expected");
                message.account_ids_order = [];
                for (let i = 0; i < object.account_ids_order.length; ++i)
                    message.account_ids_order[i] = String(object.account_ids_order[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.User
         * @static
         * @param {main.User} message User
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        User.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.account_ids_order = [];
            if (options.defaults) {
                object.id = "";
                object.current_account_id = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.current_account_id != null && message.hasOwnProperty("current_account_id"))
                object.current_account_id = message.current_account_id;
            if (message.account_ids_order && message.account_ids_order.length) {
                object.account_ids_order = [];
                for (let j = 0; j < message.account_ids_order.length; ++j)
                    object.account_ids_order[j] = message.account_ids_order[j];
            }
            return object;
        };

        /**
         * Converts this User to JSON.
         * @function toJSON
         * @memberof main.User
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        User.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return User;
    })();

    main.UtilityPower = (function() {

        /**
         * Properties of an UtilityPower.
         * @memberof main
         * @interface IUtilityPower
         * @property {string|null} [id] UtilityPower id
         * @property {string|null} [student_account_id] UtilityPower student_account_id
         * @property {number|null} [amount_kwh] UtilityPower amount_kwh
         * @property {number|null} [price] UtilityPower price
         * @property {string|null} [denom] UtilityPower denom
         */

        /**
         * Constructs a new UtilityPower.
         * @memberof main
         * @classdesc Represents an UtilityPower.
         * @implements IUtilityPower
         * @constructor
         * @param {main.IUtilityPower=} [properties] Properties to set
         */
        function UtilityPower(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UtilityPower id.
         * @member {string} id
         * @memberof main.UtilityPower
         * @instance
         */
        UtilityPower.prototype.id = "";

        /**
         * UtilityPower student_account_id.
         * @member {string} student_account_id
         * @memberof main.UtilityPower
         * @instance
         */
        UtilityPower.prototype.student_account_id = "";

        /**
         * UtilityPower amount_kwh.
         * @member {number} amount_kwh
         * @memberof main.UtilityPower
         * @instance
         */
        UtilityPower.prototype.amount_kwh = 0;

        /**
         * UtilityPower price.
         * @member {number} price
         * @memberof main.UtilityPower
         * @instance
         */
        UtilityPower.prototype.price = 0;

        /**
         * UtilityPower denom.
         * @member {string} denom
         * @memberof main.UtilityPower
         * @instance
         */
        UtilityPower.prototype.denom = "";

        /**
         * Encodes the specified UtilityPower message. Does not implicitly {@link main.UtilityPower.verify|verify} messages.
         * @function encode
         * @memberof main.UtilityPower
         * @static
         * @param {main.IUtilityPower} message UtilityPower message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UtilityPower.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.student_account_id != null && Object.hasOwnProperty.call(message, "student_account_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.student_account_id);
            if (message.amount_kwh != null && Object.hasOwnProperty.call(message, "amount_kwh"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.amount_kwh);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.price);
            if (message.denom != null && Object.hasOwnProperty.call(message, "denom"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.denom);
            return writer;
        };

        /**
         * Encodes the specified UtilityPower message, length delimited. Does not implicitly {@link main.UtilityPower.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.UtilityPower
         * @static
         * @param {main.IUtilityPower} message UtilityPower message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UtilityPower.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UtilityPower message from the specified reader or buffer.
         * @function decode
         * @memberof main.UtilityPower
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.UtilityPower} UtilityPower
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UtilityPower.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.UtilityPower();
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
                    message.amount_kwh = reader.double();
                    break;
                case 4:
                    message.price = reader.double();
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
         * Decodes an UtilityPower message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.UtilityPower
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.UtilityPower} UtilityPower
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UtilityPower.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UtilityPower message.
         * @function verify
         * @memberof main.UtilityPower
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UtilityPower.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                if (!$util.isString(message.student_account_id))
                    return "student_account_id: string expected";
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                if (typeof message.amount_kwh !== "number")
                    return "amount_kwh: number expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.denom != null && message.hasOwnProperty("denom"))
                if (!$util.isString(message.denom))
                    return "denom: string expected";
            return null;
        };

        /**
         * Creates an UtilityPower message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.UtilityPower
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.UtilityPower} UtilityPower
         */
        UtilityPower.fromObject = function fromObject(object) {
            if (object instanceof $root.main.UtilityPower)
                return object;
            let message = new $root.main.UtilityPower();
            if (object.id != null)
                message.id = String(object.id);
            if (object.student_account_id != null)
                message.student_account_id = String(object.student_account_id);
            if (object.amount_kwh != null)
                message.amount_kwh = Number(object.amount_kwh);
            if (object.price != null)
                message.price = Number(object.price);
            if (object.denom != null)
                message.denom = String(object.denom);
            return message;
        };

        /**
         * Creates a plain object from an UtilityPower message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.UtilityPower
         * @static
         * @param {main.UtilityPower} message UtilityPower
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UtilityPower.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.student_account_id = "";
                object.amount_kwh = 0;
                object.price = 0;
                object.denom = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.student_account_id != null && message.hasOwnProperty("student_account_id"))
                object.student_account_id = message.student_account_id;
            if (message.amount_kwh != null && message.hasOwnProperty("amount_kwh"))
                object.amount_kwh = options.json && !isFinite(message.amount_kwh) ? String(message.amount_kwh) : message.amount_kwh;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.denom != null && message.hasOwnProperty("denom"))
                object.denom = message.denom;
            return object;
        };

        /**
         * Converts this UtilityPower to JSON.
         * @function toJSON
         * @memberof main.UtilityPower
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UtilityPower.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UtilityPower;
    })();

    return main;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                let message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
