import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.intereface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './auth.util';
const loginUser = async (payload: TLoginUser) => {
  //check user exists or not
  const user = await User.findOne({ id: payload?.id }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  //check user is deleted or not
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }
  //check user is block or not
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked');
  }
  //check password right or wrong
  const isPassMatch = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!isPassMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password does not matched');
  }

  //Access Granted: Sent AccessToken, RefreshToken
  //create token, sent to the client

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    user,
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  //check user exists or not
  const user = await User.isUserExistsByCustomId(userData.userId);
  console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  //check user is deleted or not
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }
  //check user is block or not
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked');
  }
  //check password right or wrong
  const isPassMatch = await User.isPasswordMatched(
    payload.oldPassword,
    user?.password,
  );
  if (!isPassMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password does not matched');
  }

  //hashed new password

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

const refreshToken = async (token: string) => {
  //check token not sent from the client
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not  authorized');
  }

  //check token validate or not

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
  const { userId, iat } = decoded;

  const user = await User.isUserExistsByCustomId(userId);
  // console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  //check user is deleted or not
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }
  //check user is block or not
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};
export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
