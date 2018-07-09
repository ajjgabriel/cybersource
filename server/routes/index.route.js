/**
 * Created by gaang on 18/4/18.
 */
const express = require('express'),
    paymentController = require('../controllers/payment.controller');

const router = express.Router();


router.get('/health-check', (req, res) => {
    res.send('OK')
});

//New routes
router.route('/helloworld').post(paymentController.helloworld);
router.route('/payment').post(paymentController.payment);

//===== generator hook - route =====//

module.exports = router;