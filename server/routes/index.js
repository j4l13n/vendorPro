import express from 'express';
//import all controllers here


//import all middlewares needed here

const router = express.Router();

router.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to VendorPro API',
}));