import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import bcryptjs from "bcryptjs";
import db from "@/utils/Database";
import Konselor from "@/models/Konselor";
import { signKonselorToken } from "@/utils/KonselorAuth";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await db.connect();
  const email: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  let konselor = null;
  if (email.test(req.body.ue.toLowerCase()))
    konselor = await Konselor.findOne({ email: req.body.ue });
  else konselor = await Konselor.findOne({ username: req.body.ue });
  await db.disconnect();
  if (konselor && bcryptjs.compareSync(req.body.password, konselor.password)) {
    const token = signKonselorToken(konselor);
    res.send({
      token,
      _id: konselor._id,
      username: konselor.username,
      email: konselor.email,
    });
  } else {
    res.status(401).send({ message: "Invalid user or password" });
  }
});
