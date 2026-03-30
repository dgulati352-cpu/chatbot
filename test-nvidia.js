const apiKey = "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";

async function testNvidiAPI() {
  try {
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta/llama2-70b-chat-q4",
        messages: [{ role: "user", content: "What is 2+2?" }],
        max_tokens: 50
      })
    });

    const text = await response.text();
    console.log("Status:", response.status);
    console.log("Headers:", Object.fromEntries(response.headers));
    console.log("Body:", text.substring(0, 500));
    
    if (response.ok) {
      try {
        const data = JSON.parse(text);
        console.log("✅ API KEY WORKS!");
        console.log("Response:", JSON.stringify(data, null, 2));
      } catch (e) {
        console.log("❌ Invalid JSON response");
      }
    } else {
      console.log("❌ API Error (Status " + response.status + ")");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

testNvidiAPI();
