/**
 * Sovereign Commercial Compliance Registry: Life Republic 2026
 * Validated MahaRERA Registration Numbers for all Active Clusters
 */

export const RERA_REGISTRY = [
    { title: "Atmos (Sector R22)", rera: "P52100051765", status: "Active" },
    { title: "Qrious Smart Homes", rera: "P52100079623", status: "Active" },
    { title: "Canvas (Sector R13)", rera: "P52100077008", status: "Active" },
    { title: "The Universe (Sector R10)", rera: "P52100027629", status: "Active" },
    { title: "Arezo (Sector R16)", rera: "P52100018539", status: "Active" },
    { title: "24K Espada (Villas)", rera: "P52100002646", status: "Completed" },
    { title: "Sound of Soul (Row Houses)", rera: "P52100079424", status: "Active" },
    { title: "Oro Avenue (Sector R9)", rera: "P52100017116", status: "Active" },
    { title: "Nora (Sector R11)", rera: "P52100022278", status: "Active" },
    { title: "iTowers (Sector R7)", rera: "P52100022154", status: "Active" },
    { title: "First Avenue (R1)", rera: "P52100002646", status: "Completed" },
    { title: "Third Avenue (R3)", rera: "P52100016987", status: "Completed" },
    { title: "Sixteenth Avenue (R16)", rera: "P52100009640", status: "Completed" }
];

export const getReraLink = (rera: string) => `https://maharera.mahaonline.gov.in/SearchList/Search?rera=${rera}`;

export const RERA_DISCLAIMER = "Disclaimer: All project information, including but not limited to the RERA registration numbers, specifications, and layout plans, is synchronized with the official MahaRERA portal. Life Republic is a 390-acre township by Kolte-Patil Developers. Verify all details on maharera.mahaonline.gov.in.";
