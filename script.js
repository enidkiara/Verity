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
    const explanationDiv = document.getElementById("explanation");
    const text = userInput.value.trim();
  
    if (!text) {
      resultDiv.innerHTML = "Please paste some text first!";
      explanationDiv.innerHTML = "";
      return;
    }
  
    resultDiv.innerHTML = "Asking the AI to scan...";
    explanationDiv.innerHTML = "";
  
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
  
      const riskFill = document.querySelector(".risk-fill");
    const riskPercent = document.querySelector(".risk-percent");

    const risk = prediction.label === "LABEL_1"
        ? confidence
        : 100 - confidence;

    riskFill.style.width = risk + "%";
    riskPercent.textContent = risk + "% risk";

    if (risk < 30) {
        riskFill.style.background = "var(--olive-petal)";
    } else if (risk < 60) {
        riskFill.style.background = "var(--golden-clover)";
    } else {
        riskFill.style.background = "var(--peach-blossom)";
    }

      // Explanation logic
      const reasons = [];
  
      if (/http(s)?:\/\//i.test(text)) {
        reasons.push("Contains a link, which is common in scam messages.");
      }
  
      if (/urgent|immediately|act now|limited time|suspended/i.test(text)) {
        reasons.push("Uses urgent language to pressure the reader.");
      }
  
      if (/password|ssn|social security|bank|credit card/i.test(text)) {
        reasons.push("Mentions sensitive personal information.");
      }
  
      if (/verify|confirm|login|reset/i.test(text)) {
        reasons.push("Asks the user to verify or reset an account.");
      }
  
      explanationDiv.innerHTML = reasons.length
        ? `<strong>Why this may be unsafe:</strong><ul>${reasons.map(r => `<li>${r}</li>`).join("")}</ul>`
        : `<strong>Why this looks safe:</strong><ul>
            <li>No suspicious links detected</li>
            <li>No urgent language</li>
            <li>No personal info requests</li>
          </ul>`;
  
    } catch (err) {
      console.error(err);
      resultDiv.innerHTML = "Error talking to AI.";
    }
  }