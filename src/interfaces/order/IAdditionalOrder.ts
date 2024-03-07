export interface IAdditionalOrder {
    id: number;
    title: string;
    icon: string; 
    isOrdered: boolean;
    currentPrice: number;
    oldPrice: number | null; 
  }
  