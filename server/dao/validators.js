function validatePassword(password) {
    if (password.length < 6) {
        throw new Error('Password length must be >=6');
    }
}

module.exports = {
    validatePassword,
};
