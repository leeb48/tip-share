export interface PlacesAPIResponse {
  results: Result[];
  htmlAttributions: any[];
  nextPageToken: string;
}

export interface Result {
  formattedAddress: string;
  geometry: Geometry;
  name: string;
  icon: string;
  placeId: string;
  scope: any;
  rating: number;
  types: string[];
  openingHours?: OpeningHours;
  photos: Photo[];
  vicinity: any;
  permanentlyClosed: boolean;
  userRatingsTotal: number;
  businessStatus: string;
}

export interface Geometry {
  bounds: any;
  location: Location;
  locationType: any;
  viewport: Viewport;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface OpeningHours {
  openNow: boolean;
  periods: any;
  weekdayText: any;
  permanentlyClosed: any;
}

export interface Photo {
  photoReference: string;
  height: number;
  width: number;
  htmlAttributions: string[];
}
