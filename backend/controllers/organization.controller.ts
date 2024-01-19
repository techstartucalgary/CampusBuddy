import prisma from '../prisma/client';
import { IdParamSchema } from '@shared/zodSchemas';
import { NextFunction, Request, Response } from 'express';
import { AppError, AppErrorName } from 'utils/AppError';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// nodemailer config -> transport
const config = {
    service: 'email',
    auth: {
        user: 'nomansanjari2001@gmail.com',
        pass: 'ttfgnbtjykxedjzp'
    }
}

// mail transporter
let transporter = nodemailer.createTransport(config);

// register new org
// request will require
// org name
// org description
// admins -> users
// tags -> later after search is finalized
// events
// list of subscribers -> users
// verified
// check if user is valid -> user ID exists AND isVerified === true
export const createOrg = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // shape and property check -> Zod
        // since were using parse instead of safeParse it will throw error
        const userID = IdParamSchema.parse(req.params).id;

        // check if user ID is valid
        // check if user with given ID exists
        const user = await prisma.user.findFirst({
            where: {
                id: userID,
            },
        });

        // check if user exists
        // if user doesn't exist
        if (!user) {
            // throw invalid user error
            const invalidUserError = new AppError(
                AppErrorName.UNAUTHORIZED_ACCESS_ERROR,
                `User with ID ${userID} not found`,
                404,
                true
            );

            throw invalidUserError;
        }
        // if user exists
        else {
            const isVerified = user.isVerified;
            
            // check if user is verified
            // if user isn't verified -> don't allow to create new organizations
            if (!isVerified) {
                // throw invalid user permissions error
                const invalidUserPermissionError = new AppError(
                    AppErrorName.PERMISSION_ERROR,
                    `User with ID ${userID} is not verified`,
                    403,
                    true
                );

                throw invalidUserPermissionError;
            }
            // if user is verified
            else {
                // select data and write to db
                const orgName = req.body.orgName;
                const orgDescription = req.body.orgDescription;
                
                
                const verified = false;
            }
        }
        
        

    } catch (error) {
        next(error);
    }
};

// verify new org

// 