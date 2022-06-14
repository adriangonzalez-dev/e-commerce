const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsControllers');


router.get("/all", productsController.all)
router.get('/:id', productsController.productDetail);

module.exports = router

