export interface Promotion {
  id: number;
  infoPromo: string;
  expirationDate: string;
  urlPromotion?: string;
  category: string;
  relevance: number;
  restaurantId: string;
}