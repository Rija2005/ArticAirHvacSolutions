// import "dotenv/config";
// import fs from "fs";
// import path from "path";
// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// const hasCloudinaryConfig =
//   process.env.CLOUDINARY_CLOUD_NAME &&
//   process.env.CLOUDINARY_API_KEY &&
//   process.env.CLOUDINARY_API_SECRET;

// let storage;

// if (hasCloudinaryConfig) {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

//   storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//       folder: "arcticair-hvac",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       transformation: [{ width: 1600, height: 1600, crop: "limit" }],
//     },
//   });
// } else {
//   console.warn("[UPLOAD] Cloudinary credentials missing; falling back to local uploads folder.");
//   storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, uploadDir),
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//       cb(null, uniqueName);
//     },
//   });
// }
// const fileFilter = (req, file, cb) => {
//   const allowed = /jpeg|jpg|png|webp/;
//   const isValid = allowed.test(path.extname(file.originalname).toLowerCase());
//   if (isValid) cb(null, true);
//   else cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed"));
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// export default upload;
import "dotenv/config";
import fs from "fs";
import path from "path";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const uploadDir = "uploads";

const hasCloudinaryConfig =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

let storage;

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "arcticair-hvac",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: 1600, height: 1600, crop: "limit" }],
    },
  });
} else {
  // Only touch the local filesystem when we're actually going to use it —
  // this branch never runs on Vercel (which always has Cloudinary configured
  // in production) and Vercel's filesystem is read-only anyway, so creating
  // this directory unconditionally at module load crashed every request.
  console.warn("[UPLOAD] Cloudinary credentials missing; falling back to local uploads folder.");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, uniqueName);
    },
  });
}
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const isValid = allowed.test(path.extname(file.originalname).toLowerCase());
  if (isValid) cb(null, true);
  else cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;