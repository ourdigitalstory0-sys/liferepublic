-- Fix broken master layout image for Qrious project
UPDATE public.projects
SET master_layout = NULL
WHERE id = 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi';
