// import vendor model
import model from '../models';
import VendorValidations from '../middlewares/vendor';

const { Vendor } = model;

class Vendors {
    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     * returns all Vendors
     */
    static list(req, res) {
        return Vendor
            .findAll()
            .then(vendors => res.status(200).send({
                data: vendors
            }));
    }
    static signup(req, res){
        const result = VendorValidations.signup(req.body);
        if (result.error) {
            return res.status(400).json({ status: 400, error: result.error.details[0].message });
        }
        const vendorData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            isadmin: false
    
        };
        Vendor.findOne({
            where:{
                email : req.body.email,
            }
        })
        .then(vendor =>{
            if(!vendor){
                Vendor.create(vendorData)
                .then(vendor => {
                    return res.status(201).json({
                        status:201,
                        data:vendorData
                    })
                })
                .catch(err =>{
                    res.status(400).send('error' + err);
                })
            }
                else{
                    res.status(400).json({status:400, error: 'user already exist'})
                }
        })
        .catch(err =>{
            res.status(400).send('error' + err);
            console.log(err)
        })
    }
}

export default Vendors;