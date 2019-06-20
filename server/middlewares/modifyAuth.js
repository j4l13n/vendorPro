import model from '../models';

const { Member } = model;

class VenderAuth {
    static async isOwner(req, res, next){
        try{
            const member = await Member.findOne({ where: {id: req.params.memberId}});
            if(member === null) {
                return res.status(404).send({
                    message : "Member was not found"
                });
            }else if(req.user.id !== member.dataValues.owner){
                return res.json({ message: 'You are not authorized to update this member'});
            }
            next();
        }catch(error){
            return res.send(error);
        }
    }
}

export default VenderAuth;