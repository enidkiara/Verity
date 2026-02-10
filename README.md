# Verity — AI Scam & Identity Theft Detector

Verity is a web app that helps you identify scam emails, phishing messages, and identity theft attempts before they cause harm. Paste any suspicious message and get an instant AI-powered safety rating.

---

## What It Does

Verity analyzes text messages and emails for common scam patterns, including:

- **Suspicious links** — flags URLs commonly used in phishing attacks
- **Urgency language** — detects phrases like "act now", "suspended", or "immediately"
- **Sensitive info requests** — catches messages asking for passwords, SSNs, bank info, or credit card details
- **Verification/login prompts** — identifies fake login or account reset attempts

It returns a **risk score**, a **safety rating**, and a plain-English explanation of why a message looks dangerous or safe.

---

## How It Works

1. Paste a suspicious email or text into the Verity Detector
2. Click **Analyze for Threats**
3. Verity sends the text to an AI model (Facebook BART, via HuggingFace) for zero-shot classification
4. A heuristic layer runs in parallel to catch common scam patterns
5. You get a risk percentage, a color-coded risk meter, and a breakdown of red flags

---

## Tech Stack

- **Frontend** — Astro, vanilla JS, CSS
- **Backend** — Astro API route (`/api/analyze`)
- **AI Model** — `facebook/bart-large-mnli` via HuggingFace Inference Router
- **Deployment** — Vercel (serverless, Node runtime)

---

## Features

- AI + heuristic hybrid detection for better accuracy
- Risk meter with color-coded levels (safe / warning / danger)
- Explanation of exactly why a message was flagged
- Built-in scam education guide covering common tactics
- Interactive quiz to test your scam-spotting skills
- Real scam examples with annotations
