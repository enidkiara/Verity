/*async function analyzeText() {
    const userInput = document.getElementById('userInput');
    const resultDiv = document.getElementById('result');
    const text = userInput.value.trim();

    if (!text) {
        resultDiv.innerHTML = "Please paste some text first!";
        return;
    }

    resultDiv.innerHTML = "Asking the AI to scan...";

    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const result = await response.json();

        const prediction = result[0];
        const confidence = Math.round(prediction.score * 100);

        if (prediction.label === "LABEL_1") {
            resultDiv.innerHTML = `⚠️ SCAM DETECTED (${confidence}%)`;
        } else {
            resultDiv.innerHTML = `✅ LOOKS SAFE (${100 - confidence}%)`;
        }

    } catch (err) {
        console.error(err);
        resultDiv.innerHTML = "Error talking to AI.";
    }
}*/

async function analyzeText() {
    const userInput = document.getElementById("userInput");
    const resultDiv = document.getElementById("result");
    const text = userInput.value.trim();
  
    if (!text) {
      resultDiv.innerHTML = "Please paste some text first!";
      return;
    }
  
    resultDiv.innerHTML = "Asking the AI to scan...";
  
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
  
      const result = await response.json();
  
      const prediction = result[0];
      const confidence = Math.round(prediction.score * 100);
  
      if (prediction.label === "LABEL_1") {
        resultDiv.innerHTML = `⚠️ SCAM DETECTED (${confidence}%)`;
      } else {
        resultDiv.innerHTML = `✅ LOOKS SAFE (${100 - confidence}%)`;
      }
    } catch (err) {
      console.error(err);
      resultDiv.innerHTML = "Error talking to AI.";
    }
  }
  