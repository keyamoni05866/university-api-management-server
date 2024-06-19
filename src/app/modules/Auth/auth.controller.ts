import config from '../../config';
import catchAsync from '../../middlewares/utils/catchAsync';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { user, accessToken, refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });
  res.status(200).json({
    success: true,
    message: 'Auth login successful',
    data: { user, accessToken },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  await AuthServices.changePassword(req.user, passwordData);
  // console.log(req.user, req.body);
  // const { user, accessToken } = result;
  res.status(200).json({
    success: true,
    message: 'Password change  successful',
    data: null,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  res.status(200).json({
    success: true,
    message: 'New Access Token Retrieved successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
};
