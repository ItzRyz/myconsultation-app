import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { IAdmin } from "@/interfaces/AdminInterface";

const secret = process.env.JWT_SECRET as string;

const signAdminToken = (admin: IAdmin) => {
  return jwt.sign(
    {
      _id: admin._id,
      username: admin.username,
      email: admin.email,
    },
    secret,
    {
      expiresIn: "30d",
    }
  );
};

const isAdminAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, secret, (err: any, decode: any) => {
      if (err) {
        res.status(401).send({ message: "Token is not valid" });
      } else {
        req.body.admin = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Token is not suppiled" });
  }
};

export { signAdminToken, isAdminAuth };
