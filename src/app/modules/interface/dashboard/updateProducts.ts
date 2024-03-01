export interface UpdateProducts {
  patchValue(arg0: { nome: string; description: string; inventoryStatus: string; category: string; price: number; quantity: number; }): unknown;
  imgProducts: string;
  nome: string;
  description: string;
  inventoryStatus: string;
  category: string;
  price: number;
  quantity: number;
}
