
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import fetch from "node-fetch";
import fs from "fs";

export const postToLinkedIn = catchAsyncErrors(async (req, res, next) => {
  const { caption } = req.body;
  if (!req.files || !req.files.image) {
    return next(new ErrorHandler("No file uploaded", 400));
  }

  const image = req.files.image;
  const imagePath = `./uploads/${image.name}`;
  await image.mv(imagePath);

  const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
  const AUTHOR_URN = process.env.LINKEDIN_AUTHOR_URN;

  if (!ACCESS_TOKEN || !AUTHOR_URN) {
    return next(new ErrorHandler("LinkedIn API credentials are not set in .env file", 500));
  }

  try {
    // 1) Register upload
    const registerUploadResponse = await fetch("https://api.linkedin.com/v2/assets?action=registerUpload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        registerUploadRequest: {
          recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
          owner: AUTHOR_URN,
          serviceRelationships: [
            {
              relationshipType: "OWNER",
              identifier: "urn:li:userGeneratedContent",
            },
          ],
        },
      }),
    });

    if (!registerUploadResponse.ok) {
      const errorText = await registerUploadResponse.text();
      throw new Error(`Register upload failed: ${registerUploadResponse.status} ${errorText}`);
    }

    const uploadData = await registerUploadResponse.json();
    const uploadUrl = uploadData.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;
    const asset = uploadData.value.asset;

    // 2) Upload the image as binary
    const fileBuffer = fs.readFileSync(imagePath);
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": image.mimetype,
        "Content-Length": fileBuffer.length.toString(),
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: fileBuffer,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Image upload failed: ${uploadResponse.status} ${errorText}`);
    }

    // 2.5) Short delay to ensure LinkedIn processes image
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 3) Create post referring to the asset
    const postResponse = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        author: AUTHOR_URN,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text: caption },
            shareMediaCategory: "IMAGE",
            media: [
              {
                status: "READY",
                description: { text: caption },
                media: asset,
                title: { text: "LinkedIn Image" },
              },
            ],
          },
        },
        visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
      }),
    });

    if (!postResponse.ok) {
      const errorText = await postResponse.text();
      throw new Error(`Create post failed: ${postResponse.status} ${errorText}`);
    }

    const postJson = await postResponse.json();

    // 4) Cleanup temp file
    fs.unlinkSync(imagePath);

    res.status(200).json({
      success: true,
      message: "Posted to LinkedIn successfully!",
      post: postJson,
    });
  } catch (error) {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    return next(new ErrorHandler(error.message, 500));
  }
});
