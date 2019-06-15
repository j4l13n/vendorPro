import express from 'express';
//import all controllers here
import Members from '../controllers/member';
import Vendors from '../controllers/vendor';


//import all middlewares needed here

const router = express.Router();

router.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to VendorPro API',
}));
router.get('/api/members', Members.list);
router.get('/api/vendors', Vendors.list);

export default router;
