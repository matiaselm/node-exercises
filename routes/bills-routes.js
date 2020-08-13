const express = require('express');
const billsControllers = require('../controllers/bills-controllers');

// Routing for bills-requests to be made here

const router = express.Router();

router.get('/', billsControllers.getAllBills);

router.get('/:_id', billsControllers.getBillById);

router.post('/', billsControllers.createBill);

router.patch(':_id', billsControllers.updateBillById);

router.delete('/:_id', billsControllers.deleteBillById);

module.exports = router;