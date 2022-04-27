const express = require("express");
const app = require("../app");
const router = express.Router();
const dbModel = require("../databaseAccessLayer")
const database = require("../databaseConnection");
const imageController= require('../controllers/image-controller');



router.get('/store-image', imageController.imageUploadForm);

router.post('/store-image', imageController.storeImage);

module.exports = router;
