import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CloudinaryUploadImage = async (filePath) => {
  try {
    if (!filePath) return null;

    const result = await cloudinary.uploader.upload(filePath);
    console.log("Cloudinary Upload Success:", result.secure_url);

    // delete from local after uploading
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message);

    // clean up if something goes wrong
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    return null;
  }
};

export default CloudinaryUploadImage;
