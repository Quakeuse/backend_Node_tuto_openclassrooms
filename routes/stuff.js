const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.get('/', stuffCtrl.getAllStuff);
router.get('/:id', stuffCtrl.getOneThing);
router.post('/', multer, stuffCtrl.createThing);
router.put('/:id', multer, stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);

// to export this app to access it from the other files and specially the server Node
module.exports = router;