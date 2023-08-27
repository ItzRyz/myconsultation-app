import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import bcryptjs from "bcryptjs";
import User from "@/models/User";
import db from "@/utils/Database";
import { signUserToken } from "@/utils/UserAuth";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await db.connect();
  const email: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  let user = await User.findOne({ email: req.body.ue });
  if (email.test(req.body.ue.toLowerCase())) {
    user = await User.findOne({ email: req.body.ue });
  } else {
    user = await User.findOne({ username: req.body.ue });
  }
  await db.disconnect();
  if (user && bcryptjs.compareSync(req.body.password, user.password)) {
    const token = signUserToken(user);
    res.send({
      token,
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401).send({ message: "Invalid user or password" });
  }
});

export default router;
