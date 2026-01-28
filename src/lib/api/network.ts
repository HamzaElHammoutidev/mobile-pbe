// Types
export interface CentreDisplay {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  rating?: number;
  isOpen: boolean;
  closingTime?: string;
  hours?: string;
  city: string;
  imageUrl?: string;
}

export interface CentreInfo {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
  latitude: number;
  longitude: number;
  isActive: boolean;
}

export interface NetworkPageContent {
  labels: {
    searchPlaceholder: string;
    statsText: string;
    statsSubtext: string;
    openLabel: string;
    closedLabel: string;
    untilLabel: string;
    distanceLabel: string;
    goButtonText: string;
    callButtonText: string;
    selectCenterText: string;
  };
  mobileWorkshop: {
    title: string;
    subtitle: string;
    description: string;
    imageUrls: string[];
    features: Array<{
      icon: string;
      text: string;
    }>;
  };
  helpSection: {
    title: string;
    bookingCtaText: string;
  };
  mapBounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  centres: CentreDisplay[];
  stats: {
    centresCount: number;
    centresLabel: string;
    coverageLabel: string;
  };
}

// Static centres data - extracted from parebriseexpress.ma
const STATIC_CENTRES: CentreDisplay[] = [
  { id: 4, name: 'PBE AGADIR', address: 'Résidence Marbella Imm A Bd 11 Janvier Quartier Dakhla', latitude: 30.4122, longitude: -9.54569, phone: '0522663166', city: 'Agadir', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/ACUsSheCNjOPKQyetLDO.jpeg' },
  { id: 5, name: 'PBE BENI MELLAL', address: 'Lot Yassmine N°7 Hay Taqaddoum', latitude: 32.3475, longitude: -6.34108, phone: '0522663166', city: 'Beni Mellal', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/kqSQfYcOQUrBM6eiRo5a.jpeg' },
  { id: 6, name: 'PBE BERRECHID', address: '241,BD omar Abouricha,rue nasser allah', latitude: 33.2578, longitude: -7.57806, phone: '0522663166', city: 'Berrechid', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/oDLKfMpLGCsHcrfFhmK1.jpeg' },
  { id: 7, name: 'PBE AIN SEBAA', address: '13, lot Halioua - Ain Sebaa', latitude: 33.6022, longitude: -7.53678, phone: '0522663166', city: 'Casablanca', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/XslnHgVQyeh48onJNMdI.jpg' },
  { id: 8, name: 'PBE OULFA', address: 'Lot Moulay Thami 116 Bd haj fateh - Oulfa', latitude: 33.5508, longitude: -7.68903, phone: '0522663166', city: 'Casablanca', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/7Hzyez5ioAwUaj5lkPdk.jpeg' },
  { id: 9, name: 'PBE ZERKTOUNI', address: '181 Bd Zerktouni', latitude: 33.5861, longitude: -7.63089, phone: '0522663166', city: 'Casablanca', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/qn3aUHKSJBciGAPiokOi.jpg' },
  { id: 10, name: 'PBE DAKHLA', address: 'Hay El massira 2 , Ahmed Bahnini N°37', latitude: 23.6889, longitude: -15.9391, phone: '0522663166', city: 'Dakhla', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/YDftPrfL9LSiR8wJrtgO.jpg' },
  { id: 11, name: 'PBE EL JADIDA', address: '4 lot Nadia Amine Hay Essalam', latitude: 33.2228, longitude: -8.50125, phone: '0522663166', city: 'El Jadida', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/VYnbgqgCtLJ6GfPwJGWk.jpg' },
  { id: 12, name: 'PBE ESSAOUIRA', address: '340 , Lot Erraounak', latitude: 31.4982, longitude: -9.75297, phone: '0522663166', city: 'Essaouira', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/xjpXnMsJAvy8lOiEahh1.jpg' },
  { id: 13, name: 'PBE FÈS', address: 'Imm Ennour 4 rue 1 Hay sidi hadi Zouagha Haut', latitude: 34.0209, longitude: -5.03958, phone: '0522663166', city: 'Fès', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/rVSCo3WQzjg6QrOiD3xD.jpg' },
  { id: 14, name: 'PBE IMINTANOUT', address: 'Quartier al qods extension 39', latitude: 31.1845, longitude: -8.8425, phone: '0522663166', city: 'Imintanout', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/v7fphQD0WFAxScZC0Er1.jpeg' },
  { id: 15, name: 'PBE KELAAT ESSRAGHNA', address: 'Lot 88 Qaurtier Industriel', latitude: 32.0546, longitude: -7.38525, phone: '0522663166', city: 'Kelaat Essraghna', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/gd3Ue0R615ilhJH04aIu.jpeg' },
  { id: 16, name: 'PBE KÉNITRA', address: 'Rue 21 , lot 3n°51 Nouvelle Medina', latitude: 34.2674, longitude: -6.56547, phone: '0522663166', city: 'Kénitra', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/bcMbPoyV9w94kEClDTkq.jpg' },
  { id: 17, name: 'PBE KHOURIBGA', address: 'Lot Yassamine 1 Bd Cheikh Maa El Aynain N°218', latitude: 32.8921, longitude: -6.89464, phone: '0522663166', city: 'Khouribga', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/qvoCcBNL3PjcYYf2TGfq.jpg' },
  { id: 18, name: 'PBE LAAYOUNE', address: 'Bd tantan Rue Albaate', latitude: 27.1402, longitude: -13.1868, phone: '0522663166', city: 'Laayoune', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/EEVnfbhaovqLAZwPTdyk.jpg' },
  { id: 19, name: 'PBE MARRAKECH', address: 'Bd du 18 Novembre Résidence Le rubis Imm3 Mag 13 et 14', latitude: 31.6586, longitude: -8.02064, phone: '0522663166', city: 'Marrakech', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/Zwo6HdNhUatOvpFX6dhN.jpg' },
  { id: 20, name: 'PBE MEKNES', address: '151 Riad Ismailia tranche E', latitude: 33.855, longitude: -5.56989, phone: '0522663166', city: 'Meknès', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/sBgILC06q2QRRfUX9mDp.jpg' },
  { id: 21, name: 'PBE OUARZAZATE', address: '23 Lot Périphique Bd moulay abdellah', latitude: 30.9272, longitude: -6.92642, phone: '0522663166', city: 'Ouarzazate', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/iMUxFwiAVkzMrbuIrRcp.jpg' },
  { id: 22, name: 'PBE OUJDA', address: '3 Rue Sarae lot talhaoui av ibrahim roudani', latitude: 34.676, longitude: -1.87584, phone: '0522663166', city: 'Oujda', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/AibligPURJJwAe8bXO4Y.jpeg' },
  { id: 23, name: 'PBE RABAT', address: 'Imm 507 rue Attouquane Lot el menzeh yaakoub Al mansour', latitude: 33.9769, longitude: -6.89478, phone: '0522663166', city: 'Rabat', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/bPybWPsrFUyZBpyi91cn.jpg' },
  { id: 24, name: 'PBE SAFI', address: 'Mouni 4 - 51 14 rue ourika', latitude: 32.2854, longitude: -9.24203, phone: '0522663166', city: 'Safi', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/0lcq1bYTzLEbvCfTAHoi.jpg' },
  { id: 25, name: 'PBE SALÉ', address: 'N°3 Résidence al nour route de kénitra bab lamrissa', latitude: 34.057, longitude: -6.80669, phone: '0522663166', city: 'Salé', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/4qWMqcEsI3wmZL4uXG3g.jpg' },
  { id: 26, name: 'PBE SETTAT', address: '33 , Bd des forces Armées Royales', latitude: 33.0037, longitude: -7.61583, phone: '0522663166', city: 'Settat', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/Ou90dFiMd2Vh7kgnTTp7.jpg' },
  { id: 27, name: 'PBE SIDI BENNOUR', address: 'Ard el kheir 3 hay el fath', latitude: 32.6432, longitude: -8.42844, phone: '0522663166', city: 'Sidi Bennour', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/PinOtcs48l4QnDS6Lmqg.jpeg' },
  { id: 28, name: 'PBE TANGER', address: 'Val fleuri Lot al bassatine N°107', latitude: 35.7699, longitude: -5.82892, phone: '0522663166', city: 'Tanger', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/ZndJmw3IOUV5gbKmlkEs.jpg' },
  { id: 29, name: 'PBE TAROUDANT', address: '46, boulevard Mokhtar Assoussi, rue Balali. Taroudant', latitude: 30.4689, longitude: -8.87431, phone: '0522663166', city: 'Taroudant', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/AOdLTCju19bAKLy7h7Md.jpg' },
  { id: 30, name: 'PBE TETOUAN', address: 'Bd Oujda Résidence al oumna Bloc 5 Local N°2', latitude: 35.5704, longitude: -5.35053, phone: '0522663166', city: 'Tétouan', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/aepEAgyL6cRX2qITUXdQ.jpg' },
  { id: 31, name: 'PBE TINGHIR', address: 'Hay Tichka , tinghir', latitude: 31.5054, longitude: -5.54081, phone: '0522663166', city: 'Tinghir', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/gl3AayaJKtoBK3M88f3i.jpeg' },
  { id: 32, name: 'PBE ZAGORA', address: '278 Lot draa', latitude: 30.3451, longitude: -5.83772, phone: '0522663166', city: 'Zagora', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/uLnaMNJGYIPKx7cFHhh8.jpg' },
  { id: 33, name: 'PBE MOHAMMEDIA', address: 'Av, Sebeta Résidence Tahra', latitude: 33.6898, longitude: -7.36292, phone: '0522663166', city: 'Mohammedia', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/6xWVoXhkJ5ngaWmHE2kS.jpeg' },
  { id: 34, name: 'PBE LARACHE', address: 'Lotissement CHAABAN, N°1137', latitude: 35.1659, longitude: -6.15222, phone: '0522663166', city: 'Larache', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/RMoKOgvOFtOR2zRfd2Dt.webp' },
  { id: 35, name: 'PBE TAZA', address: 'JNANE 2 QUARTIER EL BAHRA ROUTE DE FES TAZA', latitude: 34.2324, longitude: -4.03019, phone: '0522663166', city: 'Taza', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/AgQTyvOhdMm9Vm5pCInB.webp' },
  { id: 36, name: 'PBE KHENIFRA', address: 'N 261 HAY AMALOU AGHRIBIN BOULEVARD ALMASSIRA ALKHADRA', latitude: 32.9385, longitude: -5.65306, phone: '0522663166', city: 'Khénifra', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/Y5hYJZfhmxVwkmcu3SiO.jpeg' },
  { id: 37, name: 'PBE BENGUERIR', address: '2512 QUARTIER JNANE ELKHAIR BENGUERIR', latitude: 32.2378, longitude: -7.94336, phone: '0522663166', city: 'Benguerir', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/trZ8cdTUxFBDoHxTikYL.jpeg' },
  { id: 39, name: 'PBE AITMELLOUL', address: 'Lotissement ait said°24 aitmelloul', latitude: 30.351, longitude: -9.49353, phone: '0522663166', city: 'Ait Melloul', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/W7WEZJ5C3GCd0sISsfYe.jpeg' },
  { id: 40, name: 'PBE ERRACHIDIA', address: 'Kaouzia 1 errachidia', latitude: 31.9297, longitude: -4.422, phone: '0522663166', city: 'Errachidia', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/EZ2QZkOLI1NR1HomMXK5.jpg' },
  { id: 41, name: 'PBE Had Soualem', address: 'N°108 lotissement altayssir had soualem', latitude: 33.4223, longitude: -7.85228, phone: '0522663166', city: 'Had Soualem', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/March2025/SmYNbpxmYmUCihFkK5T9.jpeg' },
  { id: 43, name: 'PBE Temara', address: 'Temara', latitude: 33.926, longitude: -6.89005, phone: '0522663166', city: 'Témara', isOpen: true, hours: 'Lundi – Vendredi: 8h30 à 12h30, 14h30 à 18h30. Samedi: 9h à 13h', imageUrl: 'https://parebriseexpress.ma//storage/centres/April2025/2GqVRu4KafuDvPSOODcR.jpeg' },
];

const FALLBACK_MOBILE_FEATURES = [
  { icon: 'Truck', text: 'Déplacement Gratuit*' },
  { icon: 'Shield', text: 'Garantie Vitrage' },
  { icon: 'CheckCircle', text: 'Agréé Assurances' },
];

export async function getNetworkPageContent(): Promise<NetworkPageContent> {
  // Using static centres data for now
  const centresForDisplay = STATIC_CENTRES;

  return {
    labels: {
      searchPlaceholder: 'Trouver un centre à proximité...',
      statsText: '40+ CENTRES',
      statsSubtext: 'Couverture Nationale Maroc',
      openLabel: 'Ouvert',
      closedLabel: 'Fermé',
      untilLabel: "Jusqu'à",
      distanceLabel: 'km',
      goButtonText: 'Go',
      callButtonText: 'Appeler',
      selectCenterText: 'Sélectionner',
    },
    mobileWorkshop: {
      title: 'Ateliers Mobiles',
      subtitle: 'Service Premium',
      description: 'Nous venons à vous. Profitez de notre service mobile pour une intervention directement chez vous ou sur votre lieu de travail.',
      imageUrls: [],
      features: FALLBACK_MOBILE_FEATURES.map(f => ({
        icon: f.icon || 'CheckCircle',
        text: f.text,
      })),
    },
    helpSection: {
      title: "Besoin d'aide ?",
      bookingCtaText: 'Prendre Rendez-vous',
    },
    mapBounds: {
      north: 36.0,
      south: 23.0,
      east: -1.0,
      west: -17.0,
    },
    centres: centresForDisplay,
    stats: {
      centresCount: centresForDisplay.length,
      centresLabel: 'CENTRES',
      coverageLabel: 'Couverture Nationale',
    },
  };
}

export async function getAllCentres(): Promise<CentreInfo[]> {
  // Using static centres data
  return STATIC_CENTRES.map(centre => ({
    id: centre.id,
    name: centre.name,
    address: centre.address,
    phone: centre.phone,
    email: null,
    hours: centre.hours || null,
    latitude: centre.latitude,
    longitude: centre.longitude,
    isActive: true,
  }));
}

export async function getCentreById(centreId: string | number): Promise<CentreInfo | null> {
  const numId = typeof centreId === 'string' ? parseInt(centreId, 10) : centreId;
  const centre = STATIC_CENTRES.find(c => c.id === numId);
  
  if (!centre) return null;

  return {
    id: centre.id,
    name: centre.name,
    address: centre.address,
    phone: centre.phone,
    email: null,
    hours: centre.hours || null,
    latitude: centre.latitude,
    longitude: centre.longitude,
    isActive: true,
  };
}

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function getNearestCentres(
  userLat: number,
  userLng: number,
  limit: number = 5
): Promise<Array<CentreInfo & { distance: number }>> {
  const allCentres = await getAllCentres();
  
  const centresWithDistance = allCentres.map(centre => ({
    ...centre,
    distance: calculateDistance(userLat, userLng, centre.latitude, centre.longitude),
  }));

  return centresWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}
