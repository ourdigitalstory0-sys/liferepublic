export const emailService = {
    sendLeadNotification: async (lead: {
        name: string;
        phone: string;
        email?: string;
        message?: string;
        project?: string;
        source?: string;
    }) => {
        try {
            const response = await fetch("https://formsubmit.co/ajax/propsmartrealty@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    _subject: `Official Lead: ${lead.name} | ${lead.project || 'Life Republic'}`,
                    _template: "table",
                    _captcha: "false",
                    _autoresponse: "Thank you for your enquiry for Life Republic. Our sales desk will contact you with the official price list and brochure shortly.",
                    "Full Name": lead.name,
                    "Mobile": lead.phone,
                    "Email": lead.email || 'N/A',
                    "Project/Segment": lead.project || 'General Inquiry',
                    "Source Domain": lead.source || window.location.hostname,
                    "Lead Message": lead.message || 'No message provided',
                    "Timestamp": new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Email service error:", errorData);
                throw new Error("Failed to send email notification");
            }

            return true;
        } catch (error) {
            console.error("Error sending lead email:", error);
            // We don't want to block the UI flow if email fails, but we log it.
            return false;
        }
    }
};
