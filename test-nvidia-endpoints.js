const apiKey = "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";

async function testEndpoint(url, model) {
  try {
    console.log(`\nTesting: ${url}`);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: "Hi" }],
        max_tokens: 20
      })
    });

    console.log(`Status: ${response.status}`);
    const text = await response.text();
    console.log(`Response: ${text.substring(0, 200)}`);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function testAll() {
  // Try different endpoints
  await testEndpoint("https://integrate.api.nvidia.com/v1/chat/completions", "meta/llama2-70b-chat-q4");
  await testEndpoint("https://api.nvidia.com/v1/chat/completions", "meta/llama2-70b-chat-q4");
  await testEndpoint("https://api.nvcf.nvidia.com/execution/v1/chat/completions", "meta/llama2-70b-chat-q4");
}

testAll();
