export const prerender = false;
console.log("HF KEY EXISTS:", !!process.env.HF_API_KEY);

export async function POST({ request }) {
  try {
    const { text } = await request.json();

    const hfRes = await fetch(
      "https://router.huggingface.co/hf-inference/models/phishbot/ScamLLM",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const data = await hfRes.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to call API" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}