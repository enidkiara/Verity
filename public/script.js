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
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    console.log(data); // check the response

    if (!data || data.error) {
      resultDiv.innerHTML = "Error from AI: " + (data?.error || "Unknown error");
      return;
    }

// Normalize HuggingFace router output
    let prediction;

// Case 1: Array response
    if (Array.isArray(data)) {
      prediction = data[0];
    }
// Case 2: { outputs: [...] }
    else if (data.outputs && Array.isArray(data.outputs)) {
     prediction = data.outputs[0];
    }
// Case 3: { results: [...] }
    else if (data.results && Array.isArray(data.results)) {
      prediction = data.results[0];
    }
// Case 4: { predictions: [...] } — some HF models use this
    else if (data.predictions && Array.isArray(data.predictions)) {
      prediction = data.predictions[0];
    }
// Case 5: { generated_text: ... } — fallback for text models
    else if (data.generated_text) {
      prediction = { label: "text", score: 0.5 };
    }
// Final fallback
    else {
      prediction = data;
    }

// Safely convert score
    const rawScore = Number(prediction.score);
    const confidence = isNaN(rawScore) ? 0 : Math.round(rawScore * 100);



// Normalize label
    const label = String(prediction.label).toLowerCase();

// Your scam logic
    const heuristicScam =
      /http(s)?:\/\//i.test(text) ||
      /urgent|immediately|act now|suspended/i.test(text) ||
      /password|ssn|bank|credit card/i.test(text) ||
      /verify|confirm|login|reset/i.test(text);

    const isScam = prediction.label === "spam" || heuristicScam;
  



// Display result
    if (isScam) {
      resultDiv.innerHTML = `⚠️ SCAM DETECTED (${confidence}%)`;
    } else {
      resultDiv.innerHTML = `✅ LOOKS SAFE (${confidence}%)`;
    }

    const riskFill = document.querySelector(".risk-fill");
    const riskPercent = document.querySelector(".risk-percent");
    const risk = isScam ? confidence : 100 - confidence;

    riskFill.style.width = risk + "%";
    riskPercent.textContent = risk + "% risk";

    if (risk < 30) riskFill.style.background = "var(--olive-petal)";
    else if (risk < 60) riskFill.style.background = "var(--golden-clover)";
    else riskFill.style.background = "var(--peach-blossom)";

    const reasons = [];
    if (/http(s)?:\/\//i.test(text)) reasons.push("Contains a link, which is common in scam messages.");
    if (/urgent|immediately|act now|limited time|suspended/i.test(text))
      reasons.push("Uses urgent language to pressure the reader.");
    if (/password|ssn|social security|bank|credit card/i.test(text))
      reasons.push("Mentions sensitive personal information.");
    if (/verify|confirm|login|reset/i.test(text)) reasons.push("Asks the user to verify or reset an account.");

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
    resultDiv.style.opacity = "1";
    resultDiv.style.transform = "translateY(0)";

  }
}

function quizAnswer(isScam) {
  const alertBox = document.getElementById("quiz-alert");
  alertBox.classList.remove("hidden");

  if (isScam) {
    alertBox.textContent =
      "Correct! This email uses urgency, threats, and a fake sender address to pressure you into clicking a link";
    alertBox.className = "site-alert correct";
  } else {
    alertBox.textContent =
      "Not quite. Legitimate companies don't threaten account suspension or ask you to verify through urgent emails";
    alertBox.className = "site-alert wrong";
  }
}

window.analyzeText = analyzeText;
window.quizAnswer = quizAnswer;