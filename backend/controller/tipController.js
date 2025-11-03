import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Tip } from "../models/tipSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewTip = catchAsyncErrors(async (req, res, next) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return next(new ErrorHandler("Please Provide All Details!", 400));
  }
  let tipImage = {};
  if (req.files && req.files.tipImage) {
    const { tipImage: imageFile } = req.files;
    const cloudinaryResponse = await cloudinary.uploader.upload(
      imageFile.tempFilePath,
      { folder: "PORTFOLIO TIP IMAGES" }
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
    }
    tipImage = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const tip = await Tip.create({
    title,
    description,
    category,
    tipImage,
  });
  res.status(201).json({
    success: true,
    message: "New Tip Added!",
    tip,
  });
});

export const updateTip = catchAsyncErrors(async (req, res, next) => {
  const newTipData = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
  };
  if (req.files && req.files.tipImage) {
    const { tipImage: imageFile } = req.files;
    const tip = await Tip.findById(req.params.id);
    if (tip.tipImage && tip.tipImage.public_id) {
      const tipImageId = tip.tipImage.public_id;
      await cloudinary.uploader.destroy(tipImageId);
    }
    const newTipImage = await cloudinary.uploader.upload(
      imageFile.tempFilePath,
      {
        folder: "PORTFOLIO TIP IMAGES",
      }
    );
    newTipData.tipImage = {
      public_id: newTipImage.public_id,
      url: newTipImage.secure_url,
    };
  }
  const tip = await Tip.findByIdAndUpdate(req.params.id, newTipData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
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
  if (tip.tipImage && tip.tipImage.public_id) {
    const tipImageId = tip.tipImage.public_id;
    await cloudinary.uploader.destroy(tipImageId);
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
