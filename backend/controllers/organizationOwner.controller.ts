import { Request, Response, NextFunction } from "express";
import prisma from '../prisma/client';

// create new Organization Admin
export const createNewOwner = async (req: Request, res: Response) => {
    const { schoolName,
        email,
        firstName,
        lastName,
        username,
        yearOfStudy,
        password } = req.body;

    
}