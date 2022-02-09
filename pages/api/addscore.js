import { connectToDatabase } from "../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { name, score, time, zone } = data;

  const client = await connectToDatabase();

  const result = await client
    .db(process.env.MONGODB_DB)
    .collection("Score")
    .insertOne({
      name: name,
      score: score,
      time: time,
      zone: zone,
    });

  res.status(201).json({ message: "Score enregistré" });
  client.close();
}

export default handler;
