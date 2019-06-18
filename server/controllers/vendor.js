// import vendor model
import model from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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

    // vendor sign in --------------------------------------------------------------------------
    static async login(req, res) {
        try {
            const findVendor = await Vendor.findOne({
                where: { "email": req.body.email }
            });

            if (findVendor) {
                const { id, firstname, lastname, email, isadmin, password } = findVendor;
                const vendorData = {
                    id, firstname, lastname, email, isadmin
                };
                if (req.body.password === password) {
                    const token = jwt.sign(vendorData, process.env.SECRET_KEY);
                    return res.status(200).json({
                        status: 200,
                        data: {
                            token, vendorData
                        }
                    });
                }
                return res.status(401).json({
                    status: 401,
                    error: 'incorrect password'
                });

            }
            return res.status(404).json({
                status: 404,
                message: `user with email: '${req.body.email}' doesn't exist`
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: 'internal server error! please try again later'
            });
        }

    }
}

export default Vendors;