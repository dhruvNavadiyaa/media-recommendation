import { RequestHandler } from "express";
import cloudinary from "../config/cloudinaryConfig";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../config/env";
import { successResponse } from "../utils/response";
import Video from "../model/video.,model";
import { AppError } from "../utils/AppError";

const getUploadSignature: RequestHandler = async (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "videos" },
    CLOUDINARY_API_SECRET!
  );

  successResponse(res, 200, "Upload signature created successfully.", {
    timestamp,
    signature,
    apiKey: CLOUDINARY_API_KEY,
    cloudName: CLOUDINARY_CLOUD_NAME,
  });
};

const createVideo: RequestHandler = async (req, res) => {
  const { publicId, title, description } = req.body;

  const result = await cloudinary.api.resource(publicId, {
    resource_type: "video",
  });

  const playbackUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/sp_auto/${publicId}.m3u8`;

  const availableResolutions = [1440, 1080, 720, 480];
  const resolutions: { [key: string]: string } = {};

  availableResolutions.forEach((h) => {
    if (result.height >= h) {
      const w = Math.round((result.width / result.height) * h); // maintain aspect ratio
      resolutions[
        `${h}p`
      ] = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/w_${w},h_${h},c_limit/${publicId}.mp4`;
    }
  });

  const thumbnail = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${publicId}.jpg`;

  const video = await Video.create({
    title,
    description,
    publicId: result.public_id,
    url: result.secure_url,
    playbackUrl,
    resolutions,
    thumbnail,
    duration: result.duration,
    width: result.width,
    height: result.height,
    uploadedBy: "68c96c3aadf4f075684489b9",
  });

  successResponse(res, 201, "Video created successfully", {
    video,
  });
};

const editVideo: RequestHandler = async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;

  const video = await Video.findById(videoId);

  if (!video) throw new AppError("Video not found", 404);

  video.title = title;
  video.description = description;

  await video.save();

  successResponse(res, 200, "Video updated successfully", { video });
};

export { getUploadSignature, createVideo, editVideo };
