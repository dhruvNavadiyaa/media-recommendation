import { Response } from "express";

export const success = <T>(
  res: Response,
  data: T,
  message: string = "Success",
  status: number = 200
): Response =>
  res.status(status).json({
    success: true,
    message,
    data,
  });
