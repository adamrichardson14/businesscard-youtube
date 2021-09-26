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

    const profile = await prisma.profile.create({
      data: {
        name,
        bio,
        phone,
        email: session.user.email,
        facebook,
        slug,
        twitter,
        instagram,
        user: { connect: { email: session.user.email } },
      },
    });

    console.log(profile);
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).send(error);
  }
}
