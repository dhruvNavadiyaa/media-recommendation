import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface IOtp {
  sendAt: Date | null;
  code: string | null;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  otp: IOtp;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      sendAt: {
        type: Date,
        default: null,
      },
      code: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
