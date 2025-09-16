import mongoose, { Document, Model } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description?: string;

  publicId: string;
  url: string;
  playbackUrl: string;
  resolutions?: {
    "1440p"?: string;
    "1080p"?: string;
    "720p"?: string;
    "480p"?: string;
  };
  thumbnail?: string;
  duration?: number;
  width?: number;
  height?: number;
  views: number;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const videoSchema = new mongoose.Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String },
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    playbackUrl: { type: String, required: true },
    resolutions: {
      "1440p": { type: String },
      "1080p": { type: String },
      "720p": { type: String },
      "480p": { type: String },
    },
    thumbnail: { type: String },
    duration: { type: Number },
    width: { type: Number },
    height: { type: Number },
    views: { type: Number, default: 0 },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Video: Model<IVideo> = mongoose.model<IVideo>("Video", videoSchema);

export default Video;
