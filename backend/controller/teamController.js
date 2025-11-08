import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Team } from "../models/teamSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addTeamMember = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Image is required", 400));
  }
  const { image } = req.files;
  const { name, email, description } = req.body;
  if (!name || !email || !description) {
    return next(new ErrorHandler("Please provide all details", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    image.tempFilePath,
    { folder: "team_images" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
  }
  const teamMember = await Team.create({
    name,
    email,
    description,
    image: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "Team Member Added",
    teamMember,
  });
});

export const deleteTeamMember = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const teamMember = await Team.findById(id);
  if (!teamMember) {
    return next(new ErrorHandler("Team member not found", 404));
  }
  const imageId = teamMember.image.public_id;
  await cloudinary.uploader.destroy(imageId);
  await teamMember.deleteOne();
  res.status(200).json({
    success: true,
    message: "Team Member Deleted",
  });
});

export const updateTeamMember = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let teamMember = await Team.findById(id);
  if (!teamMember) {
    return next(new ErrorHandler("Team member not found", 404));
  }
  const { name, email, description } = req.body;
  let newImage = {};
  if (req.files && req.files.image) {
    const imageId = teamMember.image.public_id;
    await cloudinary.uploader.destroy(imageId);
    const newImageUpload = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      { folder: "team_images" }
    );
    newImage = {
      public_id: newImageUpload.public_id,
      url: newImageUpload.secure_url,
    };
  }
  const updatedData = {
    name: name || teamMember.name,
    email: email || teamMember.email,
    description: description || teamMember.description,
  };
  if (newImage.public_id) {
    updatedData.image = newImage;
  }
  teamMember = await Team.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Team Member Updated",
    teamMember,
  });
});

export const getAllTeamMembers = catchAsyncErrors(async (req, res, next) => {
  const teamMembers = await Team.find();
  res.status(200).json({
    success: true,
    teamMembers,
  });
});
