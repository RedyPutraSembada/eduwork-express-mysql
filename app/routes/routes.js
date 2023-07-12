//* mmebuat rungsi router
const router = require('express').Router();
//*
const multer = require('multer');
//* membnuat fungsi upload untuk membaca file yang di kirim dari user
const upload = multer({ dest: 'uploads' });
const ProductController = require('../controller/ProductController');


router.get('/', (req, res) => {
    ProductController.index(res);
});

router.post('/product', upload.single('image'), (req, res) => {
    ProductController.store(req, res);
});

router.get('/product/:id', (req, res) => {
    ProductController.show(req, res);
});

router.put('/product/:id', upload.single('image'), (req, res) => {
    ProductController.update(req, res);
});

router.delete('/product/:id', (req, res) => {
    ProductController.destroy(req, res);
});

module.exports = router;