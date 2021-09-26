function isAuthorized(role, minimumRole) {
    if (role === 'admin') return;
    if (role === minimumRole) return;

    throw Error('User not authorized');
}

module.exports = { isAuthorized };
