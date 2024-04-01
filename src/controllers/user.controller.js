// Import necessary modules and utilities
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Function to generate access token for a given user ID
const generateAccessToken = async (user_id) => {
  try {
    const user = await User.findById(user_id);

    // Generate access token for the user
    const accessToken = user.generateAccessToken();

    return { accessToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong during token generation");
  }
};

// Route handler to register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  // Check if user with provided email or username already exists
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already existed");
  }

  // Create new user
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  // Find newly created user by ID, excluding password field
  const userCreated = await User.findById(user._id).select("-password");

  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while user creation");
  }

  // Respond with success message and created user data
  res
    .status(201)
    .json(new ApiResponse(200, userCreated, "User created Successfully"));
});

// Route handler to login user
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  // Find user by username or email
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  // Validate user password
  const isAuth = await user.isPasswordCorrect(password);

  if (!isAuth) {
    throw new ApiError(400, "Invalid credentials");
  }

  // Generate access token for user
  const { accessToken } = await generateAccessToken(user._id);

  // Define cookie options
  const options = {
    httpOnly: true,
    maxAge: 3600000 * 5,
    secure: true,
    sameSite: "none",
  };

  // Prepare response data
  const responseData = {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken,
  };

  // Respond with success message, set access token cookie, and send response
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, responseData, "User logged in successfully"));
});

// Route handler to logout user
const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    maxAge: 3600000 * 5,
    secure: true,
    sameSite: "none",
  };

  // Clear access token cookie and respond with success message
  res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

// Route handler to change user password
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // Find user by ID
  const user = await User.findById(req.user?._id);

  // Validate old password
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  // Throw error if old password is incorrect
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  // Update user password and save changes
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  // Respond with success message
  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// Route handler to get current user
const currentUser = asyncHandler(async (req, res) => {
  // Respond with success message and current user data
  res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

// Export route handlers
export { registerUser, loginUser, logoutUser, changePassword, currentUser };
