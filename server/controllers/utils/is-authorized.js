function isAuthorized(role, minimumRole) {
    if (role === 'admin') return;
    if (role === minimumRole) return;

    throw Error(`User with role "${role}" is not authorized`);
}

module.exports = { isAuthorized };
