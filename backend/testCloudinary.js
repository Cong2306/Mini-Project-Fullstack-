require("dotenv").config();
const cloudinary = require("./config/cloudinary");

(async () => {
  try {
    console.log("API SECRET:", process.env.CLOUDINARY_API_SECRET);

    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg"
    );

    console.log("✅ Upload OK");
    console.log(result.secure_url);
  } catch (err) {
    console.error("❌ Upload thất bại");
    console.error(err);
  }
})();
