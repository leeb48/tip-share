export interface CreateNewTipPostDto {
  placeIdFromPlacesAPI: string;
  comments: string;
  highest?: number;
  typical?: number;
  lowest?: number;
}
