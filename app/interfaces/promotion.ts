export interface Promotion {
  id: number;
  documentId: string;
  idPromotion: string;
  infoPromo: string;
  weekDay: number;
  relevance: number;
  codeCity: number;
  expirationDate: string;
  urlPromotion?: string;
  Categoria: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  restaurant: {
    id: number;
    documentId: string;
    nombre:string;
    delivery_num:string;
  };
}