const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Set up multer to store files in memory
const storage = multer.memoryStorage();

// Create a multer instance with the storage option
const upload = multer({ storage });

// Image upload utility function
// async function imageUploadUtil(file, folder, type) {
//   const result = await cloudinary.uploader.upload(file, {
//     resource_type: type,
//     folder, // Upload to a specific folder in Cloudinary
//   });
//   return result;
// }

async function imageUploadUtil(file, folder, fileType) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder,
    format: "pdf",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  });
  console.log(result);

  return result;
}

module.exports = { upload, imageUploadUtil };
