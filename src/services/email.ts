import { personalizationStore } from '../lib/personalizationStore';

const FORMSUBMIT_URL = "https://formsubmit.co/ajax/propsmartrealty@gmail.com";
const WHATSAPP_NUMBER = "919579250011"; // Fallback WhatsApp

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
            _subject: `${subjectTag} Lead: ${lead.name} | ${lead.project || 'Life Republic'}`,
            _template: "table",
            _captcha: "false",
            "Full Name": lead.name,
            "Mobile": lead.phone,
            "Email": lead.email || 'N/A',
            "Project Interest": lead.project || 'Life Republic Township',
            "Source": lead.source || window.location.hostname,
            "Timestamp": timestamp
        };

        let emailSent = false;

        // === TIER 1: FormSubmit.co ===
        try {
            const response = await fetch(FORMSUBMIT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    emailSent = true;
                    console.log("[Email Tier 1] FormSubmit dispatch successful.");
                } else {
                    console.warn("[Email Tier 1] FormSubmit returned non-success:", result);
                }
            } else {
                console.warn("[Email Tier 1] FormSubmit HTTP error:", response.status);
            }
        } catch (error) {
            console.error("[Email Tier 1] FormSubmit failed:", error);
        }

        // === TIER 2: Direct WhatsApp Notification (Always fires as backup) ===
        if (!emailSent) {
            try {
                const whatsappMessage = [
                    `🏠 *New Lead - Life Republic*`,
                    ``,
                    `👤 *Name:* ${lead.name}`,
                    `📱 *Phone:* ${lead.phone}`,
                    `📧 *Email:* ${lead.email || 'N/A'}`,
                    `🏗️ *Project:* ${lead.project || 'Life Republic'}`,
                    `⏰ *Time:* ${timestamp}`,
                    `📊 *Source:* ${lead.source || window.location.hostname}`
                ].join('\n');

                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
                
                // Auto-open WhatsApp in a new tab
                window.open(whatsappUrl, '_blank');
                console.log("[Email Tier 2] WhatsApp fallback triggered.");
            } catch (e) {
                console.error("[Email Tier 2] WhatsApp fallback failed:", e);
            }
        }

        return emailSent;
    }
};
