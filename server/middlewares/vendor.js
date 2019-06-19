// import validations package
import Joi from '@hapi/joi';

class VendorValidations {
    //  validation for signup ----------------------------------------
    static async signup(req, res, next) {
        const signupSchema = Joi.object().keys({
            firstname: Joi.string().regex(/^\S+$/).required().options({ language: { string: { regex: { base: 'Please remove spaces and try again!!' } } } }),
            lastname: Joi.string().regex(/^\S+$/).required().options({ language: { string: { regex: { base: 'Please remove spaces and try again!!' } } } }),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().options({ language: { string: { regex: { base: 'Your password is not Strong!!Try Again with 1 upper case , 1 lower case and a number' } } } }),
            email: Joi.string().email().insensitive().required()
        });
        const {
            firstname, lastname, email, password
        } = req.body;
        const vendor = {
            firstname, lastname, email, password
        };
        const checkVendor = Joi.validate(vendor, signupSchema, {
            abortEarly: false
        });

        if (checkVendor.error) {
            const Errors = [];
            for (let i = 0; i < checkVendor.error.details.length; i++) {
                Errors.push(checkVendor.error.details[i].message.replace('"', ' ').replace('"', ' '));
            }
            return res.status(400).json({ status: 400, Errors });
        }
        req.vendor = checkVendor.value;
        next();
    }

    //  validation for signin
    static checkLoginData(req, res, next) {
        const loginSchema = Joi.object().keys({
            email: Joi.string().email().insensitive().required(),
            password: Joi.string().min(6).required(),
        });
        const {
             email, password
        } = req.body;
        const credentials = {
            email, password
        };
        const checkCredentials = Joi.validate(credentials, loginSchema, {
            abortEarly: false
        });

        if (checkCredentials.error) {
            const Errors = [];
            for (let i = 0; i < checkCredentials.error.details.length; i++) {
                Errors.push(checkCredentials.error.details[i].message.replace('"', ' ').replace('"', ' '));
            }
            return res.status(400).json({ status: 400, Errors });
        }
        req.vendor = checkCredentials.value;
        next();
    }
}

export default VendorValidations;
