async function insertCustomer({ firstName, lastName, address, phoneNo, creditCardNo, userId }) {
    const result = await this.db.raw(
        `select * from sp_insert_customer('${firstName}', '${lastName}', '${address}', '${phoneNo}', '${creditCardNo}', '${userId}');`
    );
    return result['rows'][0]['sp_insert_customer'];
}
async function updateCustomer({ id, firstName, lastName, address, phoneNo, creditCardNo, userId }) {
    await this.db.raw(
        `call sp_update_customer(${id}, '${firstName}', '${lastName}', '${address}', '${phoneNo}', '${creditCardNo}', ${userId} );`
    );
}

async function upsertCustomer({ firstName, lastName, address, phoneNo, creditCardNo, userId }) {
    const result = await this.db.raw(
        `select * from sp_upsert_customer('${firstName}', '${lastName}', '${address}', '${phoneNo}', '${creditCardNo}', ${userId} );`
    );
    return result.rows[0]['sp_upsert_customer'];
}

module.exports = {
    insertCustomer,
    updateCustomer,
    upsertCustomer,
};
