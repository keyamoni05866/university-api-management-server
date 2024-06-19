import { NextFunction, Request, Response } from 'express';
import catchAsync from './utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    //check token not sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not  authorized');
    }

    //check token validate or not

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, userId, iat } = decoded;

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
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not  authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
