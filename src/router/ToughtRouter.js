const router = require('express').Router();
const verifyToken = require('../helpers/verify-token');

const ToughtController = require('../controllers/ToughtController');

router.post('/', verifyToken, ToughtController.store);
router.put('/:id', verifyToken, ToughtController.edit);
router.delete('/:id', verifyToken, ToughtController.delete);
router.get('/', verifyToken, ToughtController.show);
router.get('/search', verifyToken, ToughtController.search);

module.exports = router;
