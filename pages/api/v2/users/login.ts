import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import bcryptjs from "bcryptjs";
import User from "@/models/User";
import db from "@/utils/Database";
import { signAdminToken } from "@/utils/AdminAuth";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await db.connect();
  const email: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  let admin = null;
  if (email.test(req.body.ue.toLowerCase())) {
    admin = await User.findOne({ email: req.body.ue });
  } else {
    admin = await User.findOne({ username: req.body.ue });
  }
  await db.disconnect();
  if (admin && bcryptjs.compareSync(req.body.password, admin.password)) {
    const token = signAdminToken(admin);
    res.send({
      token,
      _id: admin._id,
      username: admin.username,
      email: admin.email,
    });
  } else {
    res.status(401).send({ message: "Invalid user or password" });
  }
});
