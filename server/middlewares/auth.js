import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @return next if token passed
 */
const verifyToken = (req, res, next) => {
    const head = req.headers.token;
    jwt.verify(head, process.env.SECRET_KEY, (err, crypt) => {
        if (err) {
            return res.status(401).json({
                status: 401,
                message: 'please signin or signup',
            });
        }
        req.user = crypt;
        next();
    });
};
export default verifyToken;
