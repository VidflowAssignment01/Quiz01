import { asyncHandler } from "../utils/asyncHandler.js";
import { userModel } from "../Models/user.model.js";
import { generateAccessAndRefereshTokens } from "../middlewares/auth.js";

// =======================
// USER REGISTRATION
// =======================
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  console.log(req.body);

  if ([username, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User already exists. Try a new email",
    });
  }

  const newUser = await userModel.create({
    username,
    email,
    password,
  });

  const savedUser = await userModel
    .findById(newUser._id)
    .select("-password -refreshToken");

  if (!savedUser) {
    return res.status(409).json({
      success: false,
      message: "Something went wrong during registration. Try again",
    });
  }

  return res.status(200).json({
    success: true,
    data: savedUser,
    message: "User registered successfully",
  });
});

// =======================
// USER LOGIN
// =======================
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Both fields are required",
    });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
    });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: "Incorrect password",
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await userModel
    .findById(user._id)
    .select("-password -refreshToken -watchHistory -createdAt -updatedAt");

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  return res.status(200).json({
    success: true,
    data: loggedInUser,
    message: "Login successful",
  });
});

// =======================
// USER LOGOUT
// =======================
const logoutUser = asyncHandler(async (req, res) => {
  console.log("Logout called");

  await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  res.clearCookie("accessToken", cookieOptions).clearCookie("refreshToken", cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// =======================
// TOKEN VERIFICATION
// =======================
const verifyUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "User verified",
    success: true,
    data: req.user,
  });
});

// =======================
// CHANGE PASSWORD
// =======================
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Both fields are required",
    });
  }

  const user = await userModel.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isCurrentPasswordValid = await user.isPasswordCorrect(currentPassword);
  if (!isCurrentPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Current password is incorrect",
    });
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export { registerUser, loginUser, logoutUser, updatePassword, verifyUser };
