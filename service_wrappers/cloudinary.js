const config = require('../config.js');
const cloudinaryModule  = require('cloudinary');
const api_key = config.cloudinary_API 
const api_secret = config.cloudinary_SECRET 
const cloud_name = config.cloudinary_cloud_name 

cloudinaryModule.config({
  cloud_name,
  api_key,
  api_secret,
});

module.exports = cloudinaryModule;