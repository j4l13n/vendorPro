// import validation package to be used
import Joi from "@hapi/joi";

class MemberValidations {
  static async registerMember(req, res, next) {
    const registerMemberSchema = Joi.object().keys({
      firstname: Joi.string()
        .regex(/^\S+$/)
        .min(3)
        .required()
        .label("First Name :")
        .options({
          language: {
            string: { regex: { base: "Please remove spaces between word!" } }
          }
        }),
      lastname: Joi.string()
        .regex(/^\S+$/)
        .min(3)
        .required()
        .label("Last Name :")
        .options({
          language: {
            string: { regex: { base: "Please remove spaces between word!" } }
          }
        }),
      type: Joi.string()
        .regex(/^\S+$/)
        .min(3)
        .required()
        .label("Type :")
        .valid("paying", "non-paying")
        .options({
          language: {
            string: { regex: { base: "Please remove spaces between word!" } }
          }
        }),
      email: Joi.string()
        .email()
        .insensitive()
        .required()
        .label("Email :")
    });
    const { firstname, lastname, email, type } = req.body;
    const member = {
      firstname,
      lastname,
      email,
      type
    };
    const checkMember = Joi.validate(member, registerMemberSchema, {
      abortEarly: false
    });

    if (checkMember.error) {
      const Errors = [];
      for (let i = 0; i < checkMember.error.details.length; i++) {
        Errors.push(
          checkMember.error.details[i].message
            .replace('"', " ")
            .replace('"', " ")
        );
      }
      return res.status(400).json({ status: 400, Errors });
    }
    req.member = checkMember.value;
    next();
  }

    static async updateMember(req, res, next) {
        const updateMemberSchema = Joi.object().keys({
            firstname: Joi.string().regex(/^\S+$/).min(3).label("First Name :").options({ language: { string: { regex: { base: 'Please remove spaces between word!' } } } }),
            lastname: Joi.string().regex(/^\S+$/).min(3).label("Last Name :").options({ language: { string: { regex: { base: 'Please remove spaces between word!' } } } }),
            type: Joi.string().regex(/^\S+$/).min(3).label("Type :").valid('paying','non-paying').options({ language: { string: { regex: { base: 'Please remove spaces between word!' } } } }),
            email: Joi.string().email().insensitive().label("Email :"),
            isactive: Joi.boolean()
        });
        const { firstname, lastname, type, email, isactive } = req.body;
        const member = { firstname, lastname, type, email, isactive };
        const checkMember = Joi.validate(member, updateMemberSchema, {
            abortEarly: false
        });

        if (checkMember.error) {
            const Errors = [];
            for (let i = 0; i < checkMember.error.details.length; i++) {
                Errors.push(checkMember.error.details[i].message.replace('"', ' ').replace('"', ' '));
            }
            return res.status(400).json({ status: 400, Errors });
        }
        req.member = checkMember.value;
        next();
    }
}

export default MemberValidations;
