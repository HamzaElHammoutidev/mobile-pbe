import qs from "qs";
import type { StrapiResponse, StrapiSingleResponse, StrapiMedia } from "@/types/strapi";

// Cache configuration for different content types
const CACHE_DURATIONS = {
  static: 3600,      // 1 hour for mostly static content
  dynamic: 300,      // 5 minutes for dynamic content
  realtime: 60,      // 1 minute for frequently changing content
  none: 0,           // No caching
} as const;

type CacheDuration = keyof typeof CACHE_DURATIONS;

interface FetchOptions extends RequestInit {
  revalidate?: number;
  tags?: string[];
}

interface StrapiQueryParams {
  populate?: string | string[] | Record<string, unknown>;
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string[];
  locale?: string;
  publicationState?: 'live' | 'preview';
}

/**
 * Get the Strapi base URL
 */
export function getStrapiURL(path = ""): string {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return `${baseUrl}${path}`;
}

/**
 * Get full media URL from Strapi media object or path
 */
export function getMediaUrl(media: StrapiMedia | string | undefined | null): string {
  if (!media) return "";
  
  const url = typeof media === "string" ? media : media.url;
  
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return getStrapiURL(url);
}

/**
 * Get optimized image URL with format options
 */
export function getOptimizedImageUrl(
  media: StrapiMedia | undefined,
  size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'
): string {
  if (!media) return "";
  
  if (size === 'original' || !media.formats) {
    return getMediaUrl(media);
  }
  
  const format = media.formats[size];
  return format ? getMediaUrl(format.url) : getMediaUrl(media);
}

/**
 * Build API request headers
 */
function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  const token = process.env.STRAPI_API_TOKEN;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Core API fetch function with caching support
 */
export async function fetchAPI<T>(
  path: string,
  params: StrapiQueryParams = {},
  options: FetchOptions = {}
): Promise<T | null> {
  const { revalidate = CACHE_DURATIONS.static, tags = [], ...fetchOpts } = options;
  
  const queryString = qs.stringify(params, {
    encodeValuesOnly: true,
    arrayFormat: 'brackets',
  });
  
  const requestUrl = getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`);

  const fetchOptions: any = {
    headers: buildHeaders(),
    ...fetchOpts,
  };

  // Add Next.js caching options
  if (typeof revalidate === 'number') {
    fetchOptions.next = {
      revalidate,
      ...(tags.length > 0 && { tags }),
    };
  }
  
  try {
    const response = await fetch(requestUrl, fetchOptions);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[Strapi] Resource not found: ${path}`);
        return null;
      }
      console.error(`[Strapi] Error ${response.status}: ${response.statusText} - ${requestUrl}`);
      return null;
    }
    
    const data = await response.json();
    return data as T;
  } catch (error) {
    // Suppress Strapi connection errors in development (fallback hardcoded content is used)
    const isDev = process.env.NODE_ENV === 'development';
    const isConnectionError = error instanceof Error && error.message.includes('ECONNREFUSED');

    if (!isDev || !isConnectionError) {
      console.warn(`[Strapi] Connection failed for ${path} - using fallback content`);
    }
    return null;
  }
}

/**
 * Fetch a single type from Strapi
 */
export async function fetchSingleType<T>(
  endpoint: string,
  params: StrapiQueryParams = {},
  cacheDuration: CacheDuration = 'static'
): Promise<T | null> {
  const response = await fetchAPI<StrapiSingleResponse<T>>(
    `/${endpoint}`,
    params,
    { revalidate: CACHE_DURATIONS[cacheDuration], tags: [endpoint] }
  );
  
  return response?.data ?? null;
}

/**
 * Fetch a collection from Strapi
 */
export async function fetchCollection<T>(
  endpoint: string,
  params: StrapiQueryParams = {},
  cacheDuration: CacheDuration = 'static'
): Promise<T[]> {
  const response = await fetchAPI<StrapiResponse<T[]>>(
    `/${endpoint}`,
    params,
    { revalidate: CACHE_DURATIONS[cacheDuration], tags: [endpoint] }
  );
  
  return response?.data ?? [];
}

/**
 * Fetch a single item by ID from a collection
 */
export async function fetchById<T>(
  endpoint: string,
  id: string | number,
  params: StrapiQueryParams = {},
  cacheDuration: CacheDuration = 'static'
): Promise<T | null> {
  const response = await fetchAPI<StrapiSingleResponse<T>>(
    `/${endpoint}/${id}`,
    params,
    { revalidate: CACHE_DURATIONS[cacheDuration], tags: [endpoint, `${endpoint}-${id}`] }
  );
  
  return response?.data ?? null;
}

/**
 * Fetch a single item by a unique field value
 */
export async function fetchByField<T>(
  endpoint: string,
  field: string,
  value: string | number,
  params: StrapiQueryParams = {},
  cacheDuration: CacheDuration = 'static'
): Promise<T | null> {
  const items = await fetchCollection<T>(
    endpoint,
    {
      ...params,
      filters: {
        ...params.filters,
        [field]: { $eq: value },
      },
      pagination: { limit: 1 },
    },
    cacheDuration
  );
  
  return items[0] ?? null;
}

/**
 * Submit data to Strapi (POST request)
 */
export async function submitToStrapi<T>(
  endpoint: string,
  data: Record<string, unknown>
): Promise<T | null> {
  try {
    const response = await fetch(getStrapiURL(`/api/${endpoint}`), {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify({ data }),
    });
    
    if (!response.ok) {
      console.error(`[Strapi] Submit failed ${response.status}: ${response.statusText}`);
      return null;
    }
    
    const result = await response.json();
    return result.data as T;
  } catch (error) {
    console.error(`[Strapi] Submit error for ${endpoint}:`, error);
    return null;
  }
}

/**
 * Upload file to Strapi media library
 */
export async function uploadMedia(file: File): Promise<StrapiMedia | null> {
  const formData = new FormData();
  formData.append('files', file);
  
  try {
    const token = process.env.STRAPI_API_TOKEN;
    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await fetch(getStrapiURL('/api/upload'), {
      method: 'POST',
      headers,
      body: formData,
    });
    
    if (!response.ok) {
      console.error(`[Strapi] Upload failed: ${response.status}`);
      return null;
    }
    
    const result = await response.json();
    return result[0] as StrapiMedia;
  } catch (error) {
    console.error('[Strapi] Upload error:', error);
    return null;
  }
}

// Deep populate helper for nested relations
export const populateDeep = (depth: number = 3): Record<string, unknown> => {
  if (depth <= 0) return {};
  
  return {
    populate: {
      '*': {
        populate: depth > 1 ? populateDeep(depth - 1) : undefined,
      },
    },
  };
};

// Common populate configurations
export const POPULATE = {
  all: '*',
  media: {
    populate: ['icon', 'image', 'logo', 'badge', 'video', 'gallery', 'teamImages', 'mobileWorkshopImages'],
  },
  relations: {
    populate: {
      certifications: { populate: '*' },
      insurancePartners: { populate: '*' },
      events: { populate: '*' },
    },
  },
} as const;
