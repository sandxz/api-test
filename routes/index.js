import express from "express";
import { Register, getUsers, Login, Logout, getUserById } from "../controllers/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { getLaundry, getLaundryById, laundry } from "../controllers/laundry.js";
const bucketStorage = require('../modules/bucketStorage')

const router = express.Router();



router.get('/users', verifyToken, getUsers);
router.get('/users/:id', getUserById);
router.post('/users', Register);

router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/laundry', getLaundry);
router.get('/laundry/:id', getLaundryById);
router.post('/laundry', laundry);

router.post("/uploadImage", multer.single('image'), bucketStorage.uploadToGcs, (req, res, next) => {
    const data = req.body
    if (req.file && req.file.cloudStoragePublicUrl) {
        data.imageUrl = req.file.cloudStoragePublicUrl
    }

    res.send(data)
})


module.exports = bucketStorage
export default router;

