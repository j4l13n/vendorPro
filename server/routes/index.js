import express from 'express';
//import all controllers here
import Members from '../controllers/member';
import Vendors from '../controllers/vendor';
import auth from '../middlewares/auth';
import Validate from '../middlewares/vendor';


const router = express.Router();

router.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to VendorPro API',
}));
router.get('/api/members', auth, Members.list);
router.get('/api/vendors', auth, Vendors.list);
router.post('/api/login', Validate.checkLoginData, Vendors.login);
router.post('/api/vendors', Validate.signup, Vendors.signup);

export default router;
