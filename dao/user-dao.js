const AnonymousDriver = require('./anonymous-dao');
const { insertCustomer, updateCustomer, upsertCustomer } = require('./shared-functions');

class UserDriver extends AnonymousDriver {
    constructor(db) {
        super();
        this.db = db;
    }

    async insertCustomer({ firstName, lastName, address, phoneNo, creditCardNo, userId }) {
        const bindedFunction = insertCustomer.bind(this);
        return await bindedFunction({ firstName, lastName, address, phoneNo, creditCardNo, userId });
    }

    async updateCustomer({ id, firstName, lastName, address, phoneNo, creditCardNo, userId }) {
        const bindedFunction = updateCustomer.bind(this);
        return await bindedFunction({ id, firstName, lastName, address, phoneNo, creditCardNo, userId });
    }
    async upsertCustomer({ firstName, lastName, address, phoneNo, creditCardNo, userId }) {
        const bindedFunction = upsertCustomer.bind(this);
        return await bindedFunction({ firstName, lastName, address, phoneNo, creditCardNo, userId });
    }
}

module.exports = UserDriver;
