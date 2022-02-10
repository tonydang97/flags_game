import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSession, useSession } from "next-auth/client";
import { connectToDatabase } from "../lib/db";
import Profile from "../components/Profil";

export default function Profil(props) {
  const [session] = useSession();
  const scoreArray = Object.entries(props);
  return (
    <div id="profil">
      <Navbar />
      <div className="flex justify-center items-center p-10">
        <h1 className="text-2xl font-bold text-black">
          Bonjour {session.user.name}
        </h1>
      </div>
      <Profile score={scoreArray} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  const client = await connectToDatabase();
  const db = client.db(process.env.MONGODB_DB);
  const scoreEurope = await db
    .collection("Score")
    .find({ name: session.user.name, zone: "Europe" })
    .sort({ score: -1 })
    .limit(1)
    .toArray();
  const scoreAfrica = await db
    .collection("Score")
    .find({ name: session.user.name, zone: "Africa" })
    .sort({ score: -1 })
    .limit(1)
    .toArray();
  const scoreAmericas = await db
    .collection("Score")
    .find({ name: session.user.name, zone: "Americas" })
    .sort({ score: -1 })
    .limit(1)
    .toArray();
  const scoreAsia = await db
    .collection("Score")
    .find({ name: session.user.name, zone: "Asia" })
    .sort({ score: -1 })
    .limit(1)
    .toArray();
  const scoreOceania = await db
    .collection("Score")
    .find({ name: session.user.name, zone: "Oceania" })
    .sort({ score: -1 })
    .limit(1)
    .toArray();
  const scoreWorld = await db
    .collection("Score")
    .find({ name: session.user.name, zone: "World" })
    .sort({ score: -1 })
    .limit(1)
    .toArray();

  return {
    props: {
      Europe: JSON.parse(JSON.stringify(scoreEurope)),
      Africa: JSON.parse(JSON.stringify(scoreAfrica)),
      Americas: JSON.parse(JSON.stringify(scoreAmericas)),
      Asia: JSON.parse(JSON.stringify(scoreAsia)),
      Oceania: JSON.parse(JSON.stringify(scoreOceania)),
      World: JSON.parse(JSON.stringify(scoreWorld)),
    },
  };
}
