export interface TipPost {
  id: number;
  createdAt: string;
  updatedAt: any;
  ownerUsername: string;
  ownerUserId: number;
  comments: string;
  highestAvg: number;
  typicalAvg: number;
  lowestAvg: number;
}
