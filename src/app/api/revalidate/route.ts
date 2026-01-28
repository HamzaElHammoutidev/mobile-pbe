import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Map Strapi content types to Next.js paths and cache tags.
// Tags must match API client (fetchSingleType/fetchCollection endpoint names).
const CONTENT_TYPE_MAPPING: Record<string, { paths: string[]; tags: string[] }> = {
    // Single Types (endpoint = tag)
    'homepage': { paths: ['/'], tags: ['homepage'] },
    'about-page': { paths: ['/about'], tags: ['about-page'] },
    'engagement-page': { paths: ['/engagement'], tags: ['engagement-page'] },
    'contact-page': { paths: ['/contact'], tags: ['contact-page'] },
    'legal-page': { paths: ['/mentions-legales'], tags: ['legal-page'] },
    'network-page': { paths: ['/centres'], tags: ['network-page'] },
    'global-settings': { paths: ['/', '/about', '/services', '/contact'], tags: ['global-settings'] },
    // Collections (plural endpoint = tag)
    'certification': { paths: ['/about', '/engagement'], tags: ['certifications'] },
    'insurance-partner': { paths: ['/'], tags: ['insurance-partners'] },
    'event': { paths: ['/services'], tags: ['events'] },
    'job': { paths: ['/carrieres'], tags: ['jobs'] },
    'centre': { paths: ['/centres', '/contact', '/booking'], tags: ['centres'] },
    'service': { paths: ['/services'], tags: ['services'] },
    'booking-service-type': { paths: ['/booking'], tags: ['booking-service-types'] },
    'time-slot-template': { paths: ['/booking'], tags: ['time-slot-templates'] },
    'page-seo': { paths: [], tags: ['page-seos'] },
};

interface StrapiWebhookPayload {
    event: string;
    model: string;
    entry?: {
        id: number;
        slug?: string;
        [key: string]: unknown;
    };
}

export async function POST(request: NextRequest) {
    try {
        // Validate webhook secret
        const webhookSecret = request.headers.get('x-strapi-webhook-secret');
        const expectedSecret = process.env.STRAPI_WEBHOOK_SECRET;
        
        if (expectedSecret && webhookSecret !== expectedSecret) {
            return NextResponse.json(
                { error: 'Invalid webhook secret' },
                { status: 401 }
            );
        }

        const payload: StrapiWebhookPayload = await request.json();
        const { model, entry } = payload;

        // Get mapping for this content type
        const mapping = CONTENT_TYPE_MAPPING[model];
        
        if (!mapping) {
            console.log(`[Revalidate] Unknown model: ${model}`);
            return NextResponse.json({ 
                message: 'Model not configured for revalidation',
                model 
            });
        }

        const revalidatedPaths: string[] = [];
        const revalidatedTags: string[] = [];

        // Revalidate by tags first (more efficient)
        for (const tag of mapping.tags) {
            revalidateTag(tag, 'layout');
            revalidatedTags.push(tag);
        }

        // Revalidate specific paths
        for (const path of mapping.paths) {
            revalidatePath(path, 'layout');
            revalidatedPaths.push(path);
        }

        // Handle dynamic routes (e.g., job detail pages)
        if (model === 'job' && entry?.id) {
            const jobPath = `/carrieres/${entry.id}`;
            revalidatePath(jobPath, 'layout');
            revalidatedPaths.push(jobPath);
        }

        // Handle page-specific SEO updates
        if (model === 'page-seo' && entry?.slug) {
            const pagePath = `/${entry.slug}`;
            revalidatePath(pagePath, 'layout');
            revalidatedPaths.push(pagePath);
        }

        console.log(`[Revalidate] Model: ${model}, Paths: ${revalidatedPaths.join(', ')}, Tags: ${revalidatedTags.join(', ')}`);

        return NextResponse.json({
            success: true,
            model,
            revalidatedPaths,
            revalidatedTags,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('[Revalidate] Error:', error);
        return NextResponse.json(
            { error: 'Failed to revalidate' },
            { status: 500 }
        );
    }
}

// Also support GET for manual revalidation (with secret)
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get('secret');
    const path = searchParams.get('path');
    const tag = searchParams.get('tag');

    // Validate secret
    const expectedSecret = process.env.REVALIDATION_SECRET;
    if (expectedSecret && secret !== expectedSecret) {
        return NextResponse.json(
            { error: 'Invalid secret' },
            { status: 401 }
        );
    }

    if (!path && !tag) {
        return NextResponse.json(
            { error: 'Missing path or tag parameter' },
            { status: 400 }
        );
    }

    if (tag) {
        revalidateTag(tag, 'layout');
        return NextResponse.json({
            success: true,
            revalidatedTag: tag,
            timestamp: new Date().toISOString()
        });
    }

    if (path) {
        revalidatePath(path, 'layout');
        return NextResponse.json({
            success: true,
            revalidatedPath: path,
            timestamp: new Date().toISOString()
        });
    }

    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
}
