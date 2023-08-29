import { NextApiRequest, NextApiResponse } from "next";
import Konselor from "@/models/Konselor";
import { signKonselorToken } from "@/utils/KonselorAuth";
import bcryptjs from "bcryptjs";
import db from "@/utils/Database";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await db.connect();
  const newKonselor = new Konselor({
    username: req.body.username,
    email: req.body.email,
    password: bcryptjs.hashSync(req.body.password),
  });
  const konselor = await newKonselor.save();
  await db.disconnect();
  const token = signKonselorToken(konselor);
  res.send({
    token,
    _id: konselor._id,
    username: konselor.username,
    email: konselor.email,
  });
});

export default router.handler();
