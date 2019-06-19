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

    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @returns an object after update
     */
    static updateMember(req, res) {
        const { firstname, lastname, email, type, isactive } = req.body;
        Member
            .findOne({ where: {id: req.params.memberId} })
            .then((member) => {
            member.update({
                firstname: firstname || member.firstname,
                lastname: lastname || member.lastname,
                email: email || member.email,
                type: type || member.type,
                isactive: isactive || member.isactive
            })
                .then((updatedMember) => {
                    return res.status(200).json({
                    message: `Member with id ${req.params.memberId} was updated successfully`,
                    data: {
                        firstname: firstname || updatedMember.firstname,
                        lastname: lastname || updatedMember.lastname,
                        email: email || updatedMember.email,
                        type: type || updatedMember.type,
                        isactive: isactive || updatedMember.isactive
                    }
                    });
                })
                .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
}

export default Members;
