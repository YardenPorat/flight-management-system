const jwt = require('jsonwebtoken');
const config = require('config');
const { tryLogin } = require('../services/login-service');
const jwtConfig = config.get('jwt');

const maxAge = 3 * 24 * 60 * 60;

function createToken(id, role) {
    return jwt.sign({ id, role }, jwtConfig.secret, {
        expiresIn: maxAge,
    });
}

async function login(req, res) {
    const { username, password } = req.body;
    const user = await tryLogin(username.toLowerCase(), password);
    if (user instanceof Error) {
        res.status(401).json({ message: 'Invalid username or password' });
    } else {
        const token = createToken(user.id, user.role);
        const tokenAge = user.role === 'admin' ? 99999999999999999999999999 : maxAge * 1000;
        res.cookie('jwt', token, { httpOnly: true, maxAge: tokenAge });
        res.status(201).json({ user: user.id });
    }
}

async function logout(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    // res.redirect('/');
    res.send('Logged out');
}

module.exports = { login, logout };
