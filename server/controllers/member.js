// import member model
import model from '../models';

const { Member } = model;

class Members {
    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     * return all members
     */
    static async list(req, res) {
        return await Member
            .findAll()
            .then(members => res.status(200).send({
                data: members
            }));
    }

    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @returns an object when member is registered
     */
    static async registerMember(req, res) {
        const memberData = {
            firstname: req.member.firstname,
            lastname: req.member.lastname,
            email: req.member.email.toLowerCase(),
            type: req.member.type,
            isactive: true,
            owner:req.user.id
        };

        Member.findOne({
            where: {
                email: req.member.email,
            }
        })
        .then(member => {
            if (member) {
                res.status(409).json({ error: 'Member already recorded!' });
            }
            else{
                Member.create(memberData)
                .then(member => {
                    return res.status(201).json({
                        message:"Member Created successfully",
                        data: memberData
                    });
                })
                .catch(err => {
                    res.status(400).send('error' + err);
                });
            }
        });
    }
}

export default Members;
