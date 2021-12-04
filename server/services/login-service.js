const { getUserByUsername } = require('../flight-service-bl');

async function tryLogin(username, password) {
    const user = await getUserByUsername(JSON.stringify({ username }));
    if (user instanceof Error) {
        return user;
    }
    if (user.password !== password) {
        return Error('incorrect password');
    }
    return user;
}

module.exports = {
    tryLogin,
};
