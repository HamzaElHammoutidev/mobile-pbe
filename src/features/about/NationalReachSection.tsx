'use client';
import type { AboutPageContent } from '@/lib/api/about';

interface NationalReachSectionProps {
    content: AboutPageContent['nationalReach'];
}

// Default fallback nodes
const DEFAULT_NODES = [
    { id: 'casablanca', x: '28%', y: '38%', size: 24 },
    { id: 'rabat', x: '30%', y: '32%', size: 22 },
    { id: 'tangier', x: '36%', y: '10%', size: 18 },
    { id: 'fes', x: '48%', y: '28%', size: 16 },
    { id: 'marrakech', x: '38%', y: '52%', size: 18 },
    { id: 'agadir', x: '26%', y: '62%', size: 14 },
];

const DEFAULT_MAP_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Morocco_location_map.svg/800px-Morocco_location_map.svg.png';

export default function NationalReachSection({ content }: NationalReachSectionProps) {
    const nodes = content.mapNodes.length > 0 ? content.mapNodes : DEFAULT_NODES;
    const mapUrl = content.mapImageUrl || DEFAULT_MAP_IMAGE;

    return (
        <section className="bg-white py-12 px-4">
            <div className="max-w-[380px] mx-auto">

                {/* Section Header - Centered */}
                <div className="flex flex-col items-center text-center mb-8">
                    {/* Title */}
                    <h2 style={{ fontWeight: 800, fontSize: '32px', color: '#0F172A', lineHeight: 1.2 }}>
                        {content.title}
                    </h2>

                    {/* Highlight Tag */}
                    <span
                        className="inline-block mt-1"
                        style={{
                            backgroundColor: '#000000',
                            color: '#FFD200',
                            fontWeight: 800,
                            fontSize: '32px',
                            padding: '4px 12px',
                            transform: 'skewX(-3deg) rotate(-2deg)'
                        }}
                    >
                        {content.subtitle}
                    </span>

                    {/* Subtitle */}
                    <p
                        style={{
                            fontWeight: 400,
                            fontSize: '16px',
                            color: '#6B7280',
                            marginTop: '16px',
                            maxWidth: '400px'
                        }}
                    >
                        {content.description}
                    </p>
                </div>

                {/* Map Visual */}
                <div
                    className="relative w-full rounded-[24px] overflow-hidden"
                    style={{
                        aspectRatio: '4/5',
                        background: 'linear-gradient(180deg, #FEF7E0 0%, #E0F2FE 100%)'
                    }}
                >
                    {/* Morocco Map Image */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${mapUrl})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: '85% auto',
                            opacity: 0.78,
                            filter: 'grayscale(35%) contrast(1)',
                        }}
                        aria-hidden="true"
                    />

                    {/* Network Nodes - positioned absolutely */}
                    {nodes.map((node) => (
                        <div
                            key={node.id}
                            className="absolute"
                            style={{
                                left: node.x,
                                top: node.y,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            {/* Glow effect */}
                            <div
                                className="absolute rounded-full animate-pulse"
                                style={{
                                    width: (node.size ?? 20) + 16,
                                    height: (node.size ?? 20) + 16,
                                    backgroundColor: 'rgba(255, 210, 0, 0.3)',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            />
                            {/* Main dot */}
                            <div
                                className="relative rounded-full"
                                style={{
                                    width: node.size ?? 20,
                                    height: node.size ?? 20,
                                    backgroundColor: '#FFD200',
                                    boxShadow: '0 0 12px rgba(255, 210, 0, 0.6)'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
