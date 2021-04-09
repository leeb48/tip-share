export interface Place {
  id: string;
  placeAddr: string;
  placeName: string;
  operational: string;
  placeIdFromPlacesAPI: string;
  imageUrl?: string;
  highestAvg: number;
  typicalAvg: number;
  lowestAvg: number;
}
