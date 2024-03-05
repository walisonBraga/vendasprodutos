export interface AddProducts {
  uid: string;
  imgProducts: string;
  nome: string;
  description: string;
  inventoryStatus: string;
  category: string;
  price: number;
  quantity: number;
  dataCadastro?: any;
  cadastradoUser?: string;
}
