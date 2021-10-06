import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});
// console.log(process.env.NODE_ENV);
const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "yourtube/images",
  acl: "public-read",
});

const s3VideoUploader = multer({
  s3: s3,
  bucket: "yourtube/videos",
  acl: "public-read",
});

export const isHeroku = process.env.NODE_ENV === "production";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "YourTube";
  res.locals.loggedInUser = req.session.user || {};
  // res.locals.isLocal = isLocal;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Log in first"); //msg를 만들기만 한것이다 보여주는건아니다.
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUploadMiddleware = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
  storage: isHeroku ? s3ImageUploader : undefined,
});

export const videoUploadMiddleware = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 100000000,
  },
  storage: isHeroku ? s3VideoUploader : undefined,
});
