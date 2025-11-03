import { asyncHandler } from "../utils/asyncHandler.js";
import { userModel } from "../Models/user.model.js";
import { generateAccessAndRefereshTokens } from "../middlewares/auth.js";

const userSignUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  console.log(req.body);

  if ([username, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  let userExists = await userModel.findOne({ email });

  if (userExists) {
    return res.status(409).json({
      success: false,
      message: "User already exists. Try new email",
    });
  }

  let createdUser = await userModel.create({
    username,
    email,
    password,
  });

  let user = await userModel
    .findById(createdUser._id)
    .select("-password -refreshToken");

  if (!user) {
    return res.status(409).json({
      success: false,
      message: "Something went wrong with SignUp. Try again",
    });
  }

  return res.status(200).json({
    success: true,
    data: user,
    message: "User registered successfully",
  });
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "") {
    return res.status(400).json({
      success: false,
      message: "Both fields are required",
    });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Wrong Email",
    });
  }

  const passIsCorrect = await user.isPasswordCorrect(password);
  if (!passIsCorrect) {
    return res.status(400).json({
      success: false,
      message: "Incorrect Password",
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

const logoutUser = asyncHandler(async (req, res) => {
  console.log("lpogout called");
  
  await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.clearCookie("accessToken", options).clearCookie("refreshToken", options);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

const check = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "Verified",
    success: true,
    data: req.user,
  });
});

const changePassword = asyncHandler(async (req, res) => {
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

  const isCorrect = await user.isPasswordCorrect(currentPassword);
  if (!isCorrect) {
    return res.status(401).json({
      success: false,
      message: "Wrong password",
    });
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export { userSignUp, userLogin, logoutUser, changePassword, check };
