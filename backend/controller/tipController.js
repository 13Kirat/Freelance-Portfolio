import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Tip } from "../models/tipSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewTip = catchAsyncErrors(async (req, res, next) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return next(new ErrorHandler("Please Provide All Details!", 400));
  }

  let images = [];
  if (req.files && req.files.images) {
    const imageFiles = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

    for (const imageFile of imageFiles) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        imageFile.tempFilePath,
        { folder: "PORTFOLIO TIP IMAGES" }
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload some images to Cloudinary", 500));
      }
      images.push({
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      });
    }
  }

  const tip = await Tip.create({
    title,
    description,
    category,
    images,
  });
  res.status(201).json({
    success: true,
    message: "New Tip Added!",
    tip,
  });
});

export const updateTip = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let tip = await Tip.findById(id);
  if (!tip) {
    return next(new ErrorHandler("Tip not found!", 404));
  }

  const { title, description, category, deletedImages } = req.body;

  // Delete images from Cloudinary and remove from tip.images array
  if (deletedImages && deletedImages.length > 0) {
    for (const public_id of deletedImages) {
      await cloudinary.uploader.destroy(public_id);
    }
    tip.images = tip.images.filter(
      (image) => !deletedImages.includes(image.public_id)
    );
  }

  // Add new images
  if (req.files && req.files.images) {
    const imageFiles = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
    for (const imageFile of imageFiles) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        imageFile.tempFilePath,
        { folder: "PORTFOLIO TIP IMAGES" }
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload some images to Cloudinary", 500));
      }
      tip.images.push({
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      });
    }
  }

  tip.title = title;
  tip.description = description;
  tip.category = category;

  await tip.save();

  res.status(200).json({
    success: true,
    message: "Tip Updated!",
    tip,
  });
});

export const deleteTip = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const tip = await Tip.findById(id);
  if (!tip) {
    return next(new ErrorHandler("Already Deleted!", 404));
  }
  if (tip.images && tip.images.length > 0) {
    for (const image of tip.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }
  }
  await tip.deleteOne();
  res.status(200).json({
    success: true,
    message: "Tip Deleted!",
  });
});

export const getAllTips = catchAsyncErrors(async (req, res, next) => {
  const tips = await Tip.find();
  res.status(200).json({
    success: true,
    tips,
  });
});

export const getSingleTip = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const tip = await Tip.findById(id);
    res.status(200).json({
      success: true,
      tip,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});
