-- Fix broken images (Master Layout & Floor Plans) for Qrious project
UPDATE public.projects
SET
  master_layout = NULL,
  floor_plans = '[]'::jsonb
WHERE id = 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi';
