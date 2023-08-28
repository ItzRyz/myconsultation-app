import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import bcryptjs from "bcryptjs";
import User from "@/models/User";
import db from "@/utils/Database";
import { signUserToken } from "@/utils/UserAuth";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcryptjs.hashSync(req.body.password),
  });
  const user = await newUser.save();
  await db.disconnect();
  const token = signUserToken(user);
  res.send({
    token,
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

export default router.handler();
