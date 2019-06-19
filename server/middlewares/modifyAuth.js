import model from '../models';

const { Member } = model;

class VenderAuth {
    static async isOwner(req, res, next){
        try{
            const member = await Member.findOne({ where: {id: req.params.memberId}});
            if(req.user.id !== member.dataValues.owner){
                res.json({ message: 'You are not authorized to update this member'});
            }
            next();
        }catch(error){
            res.send(error);
        }
    }
}

export default VenderAuth;