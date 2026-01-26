async function analyzeText() {
    const userInput = document.getElementById('userInput');
    const resultDiv = document.getElementById('result');
    const text = userInput.value.trim();
 
 
    if (!text) {
        resultDiv.innerHTML = "Please paste some text first!";
        return;
    }
 
 
    resultDiv.innerHTML = "Asking the AI to scan...";
 
 
    try {
        const response = await fetch('http://localhost:3000/analyze', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });
 
 
        const result = await response.json();
 
 
        if (response.status === 503 || result.error) {
            resultDiv.innerHTML = result.error || "AI is booting up... wait a few seconds!";
            return;
        }
 
 
        const prediction = result[0]; // Hugging Face response
        const isScam = prediction.label === "LABEL_1"; // check mapping
        const confidence = Math.round(prediction.score * 100);
 
 
        if (isScam) {
            resultDiv.innerHTML = `<span class="scam">⚠️ SCAM DETECTED (${confidence}%)</span><br>
                                   This looks like an AI-generated phishing attempt.`;
        } else {
            resultDiv.innerHTML = `<span class="safe">✅ LOOKS SAFE (${100 - confidence}%)</span><br>
                                   Always verify the sender before clicking!`;
        }
 
 
    } catch (err) {
        console.error(err);
        resultDiv.innerHTML = "An error occurred. Check console for details.";
    }
 }
 