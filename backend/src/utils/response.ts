import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  status: number = 200,
  message: string = "Success",
  data?: T
): Response =>
  res.status(status).json({
    success: true,
    message,
    data,
  });

export const errorResponse = <T>(
  res: Response,
  status: number = 400,
  message: string = "Failed",
  data: T
): Response =>
  res.status(status).json({
    success: true,
    message,
    data,
  });
