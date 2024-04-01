import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessToken = async (user_id) => {
  try {
    const user = await User.findById(user_id);
    const accessToken = user.generateAccessToken();

    return { accessToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong during token generation");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already existed");
  }

  const avatarLocalPath = req.file?.path;

  if (avatarLocalPath && !req.file?.mimetype.includes("image")) {
    throw new ApiError(400, "Invalid file Type");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (avatarLocalPath && !avatar) {
    throw new ApiError(500, "Something went wrong while uploading Avatar");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar?.url || "",
  });

  const userCreated = await User.findById(user._id).select("-password");

  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while user creation");
  }
  res
    .status(201)
    .json(new ApiResponse(200, userCreated, "User created Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isAuth = await user.isPasswordCorrect(password);

  if (!isAuth) {
    throw new ApiError(400, "Invalid credentials");
  }

  const { accessToken } = await generateAccessToken(user._id);

  const options = {
    httpOnly: true,
    maxAge: 3600000 * 5,
    secure: true,
    sameSite: "none",
  };
  const responseData = {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, responseData, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    maxAge: 3600000 * 5,
    secure: true,
    sameSite: "none",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const currentUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export { registerUser, loginUser, logoutUser, changePassword, currentUser };
