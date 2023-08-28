// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcryptjs from "bcryptjs";
import User from "@/models/User";
import db from "@/utils/Database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db.connect();
  const newUser = new User({
    username: "testuser",
    email: "testuser@gmail.com",
    password: bcryptjs.hashSync("testpw123"),
  });
  const user = newUser.save();
  db.disconnect();
  res.send({
    _id: user._id,
    username: user.username,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
}
