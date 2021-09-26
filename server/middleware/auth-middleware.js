const jwt = require('jsonwebtoken');
const config = require('config');
const jwtConfig = config.get('jwt');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtConfig.secret, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                res.locals.token = decodedToken;
                next();
            }
        });
    } else {
        res.redirect('/login'); // in ajax act differently
    }
};

// const checkUser = (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (token) {
//         jwt.verify(token, secretKey, async (err, decodedToken) => {
//             if (err) {
//                 next();
//             } else {
//                 const user = await User.findById(decodedToken.id);
//                 res.locals.user = user; // ? . better user-id, name
//                 next();
//             }
//         });
//     } else {
//         next();
//     }
// };

module.exports = { requireAuth };
