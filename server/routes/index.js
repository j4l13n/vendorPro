import express from 'express';
//import all controllers here
import Members from '../controllers/member';
import Vendors from '../controllers/vendor';
import validate from '../middlewares/vendor'


//import all middlewares needed here

const router = express.Router();

router.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to VendorPro API',
}));
router.get('/api/members', Members.list);
router.get('/api/vendors', Vendors.list);
<<<<<<< HEAD
router.post('/api/vendors',validate.signup, Vendors.signup);
=======
router.post('/api/vendors', Vendors.signup);
>>>>>>> 4fa32371fa6b8dbde2c0b3601ab6f838c2d8b25c

export default router;
