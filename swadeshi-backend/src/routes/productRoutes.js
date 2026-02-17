const router = require('express').Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', productController.getAllProducts);
router.post('/', authMiddleware, productController.createProduct);

module.exports = router;
