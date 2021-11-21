const { insertCustomer, updateCustomer, upsertCustomer } = require('./shared-functions');
const { getCustomerById } = require('./anonymous-dao');

module.exports = { insertCustomer, updateCustomer, upsertCustomer, getCustomerById };
