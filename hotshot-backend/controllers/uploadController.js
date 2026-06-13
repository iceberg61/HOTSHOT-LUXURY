import { Buffer } from 'buffer'
import { cloudinary } from '../middleware/uploadMiddleware.js'

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  try {
    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64')
    const dataURI = `data:${req.file.mimetype};base64,${b64}`

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'hotshot-luxury',
      transformation: [
        { width: 800, height: 800, crop: 'limit', quality: 'auto' }
      ],
    })

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    })
  } catch (err) {
    console.error('Cloudinary upload error:', err)
    res.status(500).json({ message: 'Image upload failed' })
  }
}

export { uploadImage }