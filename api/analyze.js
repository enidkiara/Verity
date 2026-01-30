export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { text } = req.body;
  
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/phishbot/ScamLLM",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: text })
      }
    );
  
    const data = await hfRes.json();
    res.status(200).json(data);
  }