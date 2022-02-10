import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Leaderboard from "../components/Leaderboard";
import { connectToDatabase } from "../lib/db";

export default function LeaderboardPage(props) {
  const scoreArray = Object.entries(props);

  return (
    <div id="profil">
      <Navbar />
      <div className="flex justify-center items-center p-10">
        <h1 id="choose" className="text-2xl font-bold text-black">
          TOP 5 des meilleurs scores par zones
        </h1>
      </div>
      <div className="grid gap-5 grid-cols-3 grid-rows-2 mb-10 mx-10">
        {scoreArray.map((key, zone) => {
          return <Leaderboard zone={key[0]} scores={key[1]} />;
        })}
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = await connectToDatabase();
  const db = client.db(process.env.MONGODB_DB);

  const scoreEurope = await db
    .collection("Score")
    .find({ zone: "Europe" })
    .sort({ score: -1 })
    .limit(5)
    .toArray();
  const scoreAfrica = await db
    .collection("Score")
    .find({ zone: "Africa" })
    .sort({ score: -1 })
    .limit(5)
    .toArray();
  const scoreAmericas = await db
    .collection("Score")
    .find({ zone: "Americas" })
    .sort({ score: -1 })
    .limit(5)
    .toArray();
  const scoreAsia = await db
    .collection("Score")
    .find({ zone: "Asia" })
    .sort({ score: -1 })
    .limit(5)
    .toArray();
  const scoreOceania = await db
    .collection("Score")
    .find({ zone: "Oceania" })
    .sort({ score: -1 })
    .limit(5)
    .toArray();
  const scoreWorld = await db
    .collection("Score")
    .find({ zone: "World" })
    .sort({ score: -1 })
    .limit(5)
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
