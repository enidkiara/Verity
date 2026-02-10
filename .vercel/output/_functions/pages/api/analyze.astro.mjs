export { renderers } from '../../renderers.mjs';

/*export default async function handler(req, res) {
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
  }*/

    const prerender = false;

    async function post({ request }) {
      try {
        const { text } = await request.json();
    
        const hfRes = await fetch(
          "https://api-inference.huggingface.co/models/phishbot/ScamLLM",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${process.env.HF_TOKEN}`,
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  post,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
