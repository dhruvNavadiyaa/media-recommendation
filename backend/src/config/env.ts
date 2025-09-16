const MONGO_URI = process.env.MONGO_URI as string;

const PORT = process.env.PORT as unknown as number;

const TOKEN_SECRATE = process.env.TOKEN_SECARTE as unknown as string;

const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES as unknown as number;

const CLOUDINARY_CLOUD_NAME = process.env
  .CLOUDINARY_CLOUD_NAME as unknown as string;

const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as unknown as string;

const CLOUDINARY_API_SECRET = process.env
  .CLOUDINARY_API_SECRET as unknown as string;

export {
  MONGO_URI,
  PORT,
  TOKEN_SECRATE,
  TOKEN_EXPIRES,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};
