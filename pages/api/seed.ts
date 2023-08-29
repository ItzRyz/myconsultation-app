import bcryptjs from "bcryptjs";
import User from "@/models/User";
import db from "@/utils/Database";
import type { NextApiRequest, NextApiResponse } from "next";
import Admin from "@/models/Admin";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    username: "testuser",
    email: "testuser@gmail.com",
    password: bcryptjs.hashSync("testpw123"),
  });
  const newAdmin = new Admin({
    username: "testadmin",
    email: "testadmin@gmail.com",
    password: bcryptjs.hashSync("testpw123"),
  });
  // const user = newUser.save();
  const admin = newAdmin.save();
  db.disconnect();
  res.send({
    _id: admin._id,
    username: admin.username,
    email: admin.email,
    password: admin.password,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  });
});

export default router.handler();
