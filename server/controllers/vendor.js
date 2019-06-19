// import vendor model
import model from "../models";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

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
    return Vendor.findAll().then(vendors =>
      res.status(200).send({
        data: vendors
      })
    );
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns object when vendor is signed up
   */
  static signup(req, res) {
    const vendorData = {
      firstname: req.vendor.firstname,
      lastname: req.vendor.lastname,
      email: req.vendor.email.toLowerCase(),
      password: req.vendor.password,
      isadmin: false
    };
    Vendor.findOne({
      where: {
        email: req.vendor.email
      }
    })
      .then(vendor => {
        if (!vendor) {
          Vendor.create(vendorData)
            .then(vendor => {
              return res.status(201).json({
                data: vendor
              });
            })
            .catch(err => {
              res.status(400).send("error" + err);
            });
        } else {
          res.status(409).json({ status: 409, error: "user already exist" });
        }
      })
      .catch(err => {
        res.status(400).send("error" + err);
        console.log(err);
      });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns object when vendor is logged in
   */
  static async login(req, res) {
    try {
      const findVendor = await Vendor.findOne({
        where: { email: req.vendor.email }
      });

      if (findVendor) {
        const {
          id,
          firstname,
          lastname,
          email,
          isadmin,
          password
        } = findVendor;
        const vendorData = {
          id,
          firstname,
          lastname,
          email,
          isadmin
        };
        if (bcrypt.compareSync(req.vendor.password, password)) {
          const token = jwt.sign(vendorData, process.env.SECRET_KEY);
          return res.status(200).json({
            data: {
              token,
              vendorData
            }
          });
        }
        return res.status(401).json({
          status: 401,
          error: "incorrect password"
        });
      }
      return res.status(404).json({
        status: 404,
        message: `user with email: '${req.body.email}' doesn't exist`
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "internal server error! please try again later"
      });
    }
  }
}

export default Vendors;
