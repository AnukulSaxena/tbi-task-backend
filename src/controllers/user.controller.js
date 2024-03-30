import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  deleteFileOnCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already existed");
  }

  if (!req?.files?.avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatarLocalPath = req?.files?.avatar[0]?.path;

  if (!avatarLocalPath && !req.files.avatar[0].mimetype.includes("image")) {
    throw new ApiError(400, "Avatar file is required or Invalid file Type");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  console.log(avatar);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
  });

  const userCreated = await User.findById(user._id).select("-password");

  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while user creation");
  }
  res
    .status(201)
    .json(new ApiResponse(200, userCreated, "User created Successfully"));
});

export { registerUser };
