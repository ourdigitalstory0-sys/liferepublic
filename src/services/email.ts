import { personalizationStore } from '../lib/personalizationStore';

const WEB3FORMS_KEY = "b28972bc-8e15-4fe5-86b7-82b12ee0e82b";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export const emailService = {
    sendLeadNotification: async (lead: {
        name: string;
        phone: string;
        email?: string;
        message?: string;
        project?: string;
        source?: string;
    }) => {
        const history = personalizationStore.getHistory();
        const behavioralContext = {
            intentScore: history.intentScore || 0,
            sentiment: history.sentiment,
            lastSector: history.lastSector,
            viewCount: history.recentlyViewed.length,
            viewedItems: history.recentlyViewed.join(', ')
        };

        // Lead Rating Logic
        let stars = "★";
        if (behavioralContext.intentScore > 500) stars = "★★★★★";
        else if (behavioralContext.intentScore > 300) stars = "★★★★";
        else if (behavioralContext.intentScore > 150) stars = "★★★";
        else if (behavioralContext.intentScore > 50) stars = "★★";

        const isPremium = lead.project?.toLowerCase().includes('4bhk') || 
                          lead.project?.toLowerCase().includes('4-bhk') ||
                          lead.project?.toLowerCase().includes('24k') ||
                          lead.message?.toLowerCase().includes('4bhk');

        const subjectTag = isPremium ? "★ PLATINUM ★" : stars;
        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        const payload = {
            access_key: WEB3FORMS_KEY,
            subject: `${subjectTag} Lead: ${lead.name} | ${lead.project || 'Life Republic'}`,
            from_name: "Life Republic Portal",
            "Full Name": lead.name,
            "Mobile Number": lead.phone,
            "Email Address": lead.email || 'N/A',
            "Project Interest": lead.project || 'Life Republic Township',
            "Source": lead.source || window.location.hostname,
            "Timestamp": timestamp,
            "Message/Details": lead.message || 'No additional message'
        };

        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        let emailSent = false;

        // === TIER 1: Web3Forms Instant Dispatch ===
        try {
            const response = await fetch(WEB3FORMS_URL, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    emailSent = true;
                    console.log("[Email Tier 1] Web3Forms dispatch successful.");
                } else {
                    console.warn("[Email Tier 1] Web3Forms returned non-success:", result);
                }
            } else {
                console.warn("[Email Tier 1] Web3Forms HTTP error:", response.status);
            }
        } catch (error) {
            console.error("[Email Tier 1] Web3Forms failed:", error);
        }

        // === TIER 2: FormSubmit Fallback ===
        if (!emailSent) {
            try {
                const formSubmitUrl = "https://formsubmit.co/ajax/propsmartrealty@gmail.com";
                const response = await fetch(formSubmitUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        _subject: payload.subject,
                        _template: "table",
                        ...payload
                    })
                });
                
                if (response.ok) {
                    emailSent = true;
                    console.log("[Email Tier 2] FormSubmit dispatch successful.");
                } else {
                    console.warn("[Email Tier 2] FormSubmit returned non-success:", await response.text());
                }
            } catch (error) {
                console.error("[Email Tier 2] FormSubmit failed:", error);
            }
        }

        return emailSent;
    }
};
