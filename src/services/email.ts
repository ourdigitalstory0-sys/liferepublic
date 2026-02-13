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
                    _subject: `New Lead: ${lead.name} - ${lead.project || 'General Inquiry'}`,
                    _template: "table",
                    _captcha: "false", // Disable captcha for API usage
                    _autoresponse: "Thank you for your enquiry. Our team will contact you shortly.",
                    ...lead,
                    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
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
