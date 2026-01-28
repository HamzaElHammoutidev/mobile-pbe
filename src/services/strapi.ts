import qs from "qs";

export const getStrapiURL = (path = "") => {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${path}`;
};

export const fetchAPI = async (path: string, urlParamsObject = {}, options = {}) => {
    const mergedOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        ...options,
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

    try {
        const response = await fetch(requestUrl, mergedOptions);

        if (!response.ok) {
            if (response.status === 404) return null;
            console.error(`Error fetching from Strapi (${response.status} ${response.statusText}):`, requestUrl);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error("Strapi Connection Failed (Frontend-only mode active):", error);
        return null;
    }
};

export function getMediaUrl(url: string | undefined): string {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }
    return `${getStrapiURL()}${url}`;
}
