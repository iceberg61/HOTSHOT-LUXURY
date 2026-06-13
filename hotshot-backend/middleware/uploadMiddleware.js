import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import process from 'process'

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Memory storage (keeps file in RAM before uploading to Cloudinary)
const storage = multer.memoryStorage()

// Multer upload config
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only jpg, png, and webp images are allowed'))
    }
  },
})

export default upload
export { cloudinary }