import { Injectable } from '@angular/core';
import { Firestore, getDocs } from '@angular/fire/firestore';
import { AddProducts } from '../../modules/interface/dashboard/addProducts.interface';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getAllItems: any;

  constructor(private firestore: Firestore) { }


  itensQuantity(){
    return this.getAllItems().then((snapshot: { docs: { data: () => any; id: any; }[]; })=>{
      const items = snapshot.docs.map((doc: { data: () => any; id: any; }) => ({...doc.data(), id: doc.id})) as AddProducts[];
      let quantidadeTotal = 0;
      for (let i=0 ; i < items.length ; i++){
        if(!items[i].quantity){
          quantidadeTotal += items[i].quantity;
        }
      };
      return quantidadeTotal;
    })
  }



}
