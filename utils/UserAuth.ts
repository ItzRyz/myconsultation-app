/* eslint-disable no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { IUser } from "@/interfaces/UserInterface";

const secret = process.env.JWT_SECRET as string;

const signUserToken = (user: IUser) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    secret,
    {
      expiresIn: "30d",
    }
  );
};

const isUserAuth = async (req: any, res: NextApiResponse, next: any) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, secret, (err: any, decode: any) => {
      if (err) {
        res.status(401).send({ message: "Token is not valid" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Token is not suppiled" });
  }
};

export { signUserToken, isUserAuth };
