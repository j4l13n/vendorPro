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
    static list(req, res) {
        // Get all members
        return Member
            .findAll()
            .then(members => res.status(200).send({
                data: members
            }));
    }
}

export default Members;