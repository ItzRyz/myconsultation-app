import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { IKonselor } from "@/interfaces/KonselorInterface";

const secret = process.env.JWT_SECRET as string;

const signKonselorToken = (konselor: IKonselor) => {
  return jwt.sign(
    {
      _id: konselor._id,
      username: konselor.username,
      email: konselor.email,
    },
    secret,
    {
      expiresIn: "30d",
    }
  );
};

const isKonselorAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, secret, (err: any, decode: any) => {
      if (err) res.status(401).send({ message: "Token is not valid" });
      else {
        req.body.konselor = decode;
        next();
      }
    });
  } else res.status(401).send({ message: "Token is not supplied" });
};

export { signKonselorToken, isKonselorAuth };
