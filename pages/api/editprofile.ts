import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  try {
    const { name, bio, phone, facebook, twitter, instagram, slug } = req.body;

    const session = await getSession({ req });

    if (!session) {
      return res.status(401);
    }

    const profile = await prisma.profile.update({
      where: {
        email: session.user.email,
      },
      data: {
        name,
        bio,
        slug,
        phone,
        email: session.user.email,
        facebook,
        twitter,
        instagram,
      },
    });

    console.log(profile);
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
