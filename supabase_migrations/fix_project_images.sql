-- Fix broken images for Qrious project
UPDATE public.projects
SET 
  master_layout = '/images/gallery/qrious/master-layout.webp',
  floor_plans = ARRAY['/images/gallery/qrious/2bhk-plan.webp', '/images/gallery/qrious/3bhk-plan.webp']
WHERE id = 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi';
