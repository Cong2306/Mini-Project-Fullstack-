const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dr5jwp87j",
  api_key: "979824119971933",
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
