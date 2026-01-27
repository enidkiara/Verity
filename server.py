from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI(title="Verity")

# Allow frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class TextRequest(BaseModel):
    text: str

print("🔥 Loading phishbot/ScamLLM model... this may take a minute 🔥")
pipe = pipeline("text-classification", model="phishbot/ScamLLM")
print("✅ Model loaded!")

# API ROUTE FIRST
@app.post("/analyze")
def analyze_text(req: TextRequest):
    text = req.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="No text provided")
    return pipe(text)

# STATIC FILES LAST (IMPORTANT)
app.mount("/", StaticFiles(directory=".", html=True), name="static")