const WEB3FORMS_KEY = "b28972bc-8e15-4fe5-86b7-82b12ee0e82b";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

async function test() {
    const payload = {
        access_key: WEB3FORMS_KEY,
        subject: "Test Lead",
        from_name: "Life Republic Portal",
        "Full Name": "Test User",
        "Mobile Number": "1234567890"
    };

    try {
        const response = await fetch(WEB3FORMS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        console.log("Status:", response.status);
        console.log("Response:", text);
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
