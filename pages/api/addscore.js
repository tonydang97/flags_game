import { connectToDatabase } from "../../lib/db";

async function handler(req, res) {
  console.log("ça passe combien de fois dans handler ?");
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { name, email, score, time, zone } = data;

  const client = await connectToDatabase();

  const result = await client
    .db(process.env.MONGODB_DB)
    .collection("Score")
    .insertOne({
      name: name,
      email: email,
      score: score,
      time: time,
      zone: zone,
    });
  console.log(result);
  res.status(201).json({ message: "Score enregistré" });
  client.close();
}

export default handler;
