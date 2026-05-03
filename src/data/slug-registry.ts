export const ID_TO_SLUG: Record<string, string> = {
    'duet': 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi',
    'arezo': 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi',
    'canvas': 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi',
    'atmos': 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi',
    '24k-espada': 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi',
    'sound-of-soul': 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi',
    'aros': 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi',
    'universe': 'kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi',
    'first-avenue': 'kolte-patil-life-republic-first-avenue-premium-2-3-bhk-hinjewadi',
    'villas': 'kolte-patil-life-republic-villas-hinjewadi',
    'bungalows': 'kolte-patil-life-republic-bungalows-hinjewadi',
    'echoes': 'kolte-patil-life-republic-echoes-new-launch-2-2-5-bhk-hinjewadi',
    'qrious': 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi',
    'oro-avenue': 'kolte-patil-life-republic-oro-avenue-premium-1-2-bhk-hinjewadi',
    'i-towers': 'kolte-patil-life-republic-i-towers-high-rise-living-hinjewadi'
};

export const getProjectSlug = (id: string) => ID_TO_SLUG[id] || id;
