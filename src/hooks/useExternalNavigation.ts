'use client';

/**
 * Utility functions for external navigation (maps, phone, email)
 */

interface DirectionsOptions {
  latitude: number;
  longitude: number;
  label?: string;
  /** When provided, directions show itinerary from this position to the destination */
  origin?: { latitude: number; longitude: number };
}

/**
 * Detects if the user is on an Apple device
 */
function isAppleDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod|Mac/.test(navigator.userAgent);
}

/**
 * Opens directions to a location in the appropriate maps application.
 * When origin is provided, shows itinerary from your position to the centre.
 * - Apple devices: Apple Maps
 * - Other devices: Google Maps
 */
export function openDirections({
  latitude,
  longitude,
  label,
  origin,
}: DirectionsOptions): void {
  const dest = `${latitude},${longitude}`;

  if (isAppleDevice()) {
    let appleMapsUrl = `maps://maps.apple.com/?daddr=${dest}`;
    if (origin) {
      appleMapsUrl = `maps://maps.apple.com/?saddr=${origin.latitude},${origin.longitude}&daddr=${dest}`;
    }
    if (label) appleMapsUrl += `&q=${encodeURIComponent(label)}`;
    window.location.href = appleMapsUrl;
  } else {
    let googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
    if (origin) {
      googleMapsUrl += `&origin=${origin.latitude},${origin.longitude}`;
    }
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Opens the location in maps without directions
 */
export function openLocationInMaps({ latitude, longitude, label }: DirectionsOptions): void {
  const encodedLabel = label ? encodeURIComponent(label) : '';
  
  if (isAppleDevice()) {
    const appleMapsUrl = label
      ? `maps://maps.apple.com/?ll=${latitude},${longitude}&q=${encodedLabel}`
      : `maps://maps.apple.com/?ll=${latitude},${longitude}`;
    window.location.href = appleMapsUrl;
  } else {
    const googleMapsUrl = label
      ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${encodedLabel}`
      : `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Opens the phone dialer with the specified number
 */
export function openPhoneDialer(phoneNumber: string): void {
  // Remove spaces and special characters except + for international
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
  window.location.href = `tel:${cleanNumber}`;
}

/**
 * Opens the default email client with pre-filled recipient
 */
export function openEmailClient(
  email: string,
  options?: { subject?: string; body?: string }
): void {
  let mailtoUrl = `mailto:${email}`;
  const params: string[] = [];

  if (options?.subject) {
    params.push(`subject=${encodeURIComponent(options.subject)}`);
  }
  if (options?.body) {
    params.push(`body=${encodeURIComponent(options.body)}`);
  }

  if (params.length > 0) {
    mailtoUrl += `?${params.join('&')}`;
  }

  window.location.href = mailtoUrl;
}

/**
 * Opens WhatsApp with a pre-filled message
 */
export function openWhatsApp(phoneNumber: string, message?: string): void {
  const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
  let whatsappUrl = `https://wa.me/${cleanNumber}`;
  
  if (message) {
    whatsappUrl += `?text=${encodeURIComponent(message)}`;
  }
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
}
