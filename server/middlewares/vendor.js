// import validations package
import Joi from '@hapi/joi';

class VendorValidations {
    signup(vendor) {
        const schema = {
            firstname:Joi.string().regex(/^\S+$/).required().options({language:{string:{regex:{base:'Please remove spaces and try again!!'}}}}),
            lastname:Joi.string().regex(/^\S+$/).required().options({language:{string:{regex:{base:'Please remove spaces and try again!!'}}}}),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().options({language:{string:{regex:{base:'Your password is not Strong!!Try Again with 1 upper case , 1 lower case and a number'}}}}),
            email: Joi.string().email().insensitive().required()
        };
        return Joi.validate(vendor, schema);
    }
}

const vendorValidation = new VendorValidations();
export default vendorValidation;