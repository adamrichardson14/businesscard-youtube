import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import { getSession, signIn, signOut } from "next-auth/client";
import { useState } from "react";

import CreateProfile from "../components/CreateProfile";
import DisplayProfile from "../components/DisplayProfile";
import EditProfile from "../components/EditProfile";

export default function Home({ session, profile }) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="">
      <Head>
        <title>Business Card Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {!session && (
          <>
            Not signed in <br /> <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
            {!profile && <CreateProfile />}
            {profile && !editing && (
              <div className="flex flex-col justify-center">
                <DisplayProfile profile={profile} />
                <button
                  className="bg-indigo-700 text-white rounded-md px-4 py-2 max-w-sm mx-auto hover:bg-indigo-600 mt-4"
                  onClick={() => {
                    setEditing(true);
                  }}>
                  Edit Profile
                </button>
              </div>
            )}
            {profile && editing && <EditProfile profile={profile} setEditing={setEditing} />}
          </>
        )}
      </>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }

  const profile = await prisma.profile.findUnique({
    where: { email: session.user.email },
    select: {
      email: true,
      facebook: true,
      instagram: true,
      phone: true,
      bio: true,
      slug: true,
      name: true,
      twitter: true,
    },
  });

  return {
    props: {
      session,
      profile,
    },
  };
};
