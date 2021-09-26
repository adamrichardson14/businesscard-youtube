import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ProfilePage({ profile }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  console.log(profile);
  return (
    <>
      <Head>
        <title>{profile.name} - Contact Information</title>
      </Head>
      <div className="text-gray-800 text-lg text-left max-w-2xl mx-auto mt-10">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p>{profile.bio}</p>
          <Image src={profile.user.image} width={100} height={100} />
        </div>

        <ul>
          <li>
            <span className="font-bold">Email:</span> {profile.email}
          </li>
          <li>
            <span className="font-bold">Phone:</span> {profile.phone}
          </li>
          <li>
            <span className="font-bold">Twitter:</span> {profile.twitter}
          </li>
          <li>
            <span className="font-bold">Facebook:</span> {profile.facebook}
          </li>
          <li>
            <span className="font-bold">Instagram:</span> {profile.instagram}
          </li>
        </ul>
      </div>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const prisma = new PrismaClient();

  const profile = await prisma.profile.findFirst({
    where: { slug: params.slug },
    select: {
      email: true,
      name: true,
      bio: true,
      slug: true,
      facebook: true,
      twitter: true,
      instagram: true,
      phone: true,
      user: { select: { image: true } },
    },
  });

  console.log(profile);

  return {
    props: {
      profile,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
