async function test() {
    const payload = {
        access_key: "b28972bc-8e15-4fe5-86b7-82b12ee0e82b",
        subject: "🚨 CRITICAL TEST: Lead Dispatch Check",
        from_name: "Antigravity Diagnostic",
        "Full Name": "Test Lead (Internal)",
        "Mobile Number": "9999999999",
        "Email Address": "test@example.com",
        "Message": "This is a diagnostic test from the AI assistant to verify if the Web3Forms key is active and delivering to propsmartrealty@gmail.com."
    };

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log("Status:", response.status);
        console.log("Result:", result);
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
