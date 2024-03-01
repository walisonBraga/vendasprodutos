import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _quantidadeNotificacoes = new BehaviorSubject<number>(0);
  quantidadeNotificacoes$ = this._quantidadeNotificacoes.asObservable();
  private STORAGE_KEY = 'quantidadeNotificacoes';

  constructor() {
    this.initQuantidadeNotificacoes();
  }

  private initQuantidadeNotificacoes() {
    const quantidade = parseInt(localStorage.getItem(this.STORAGE_KEY) || '0', 10);
    this._quantidadeNotificacoes.next(quantidade);
  }

  adicionarNotificacao() {
    const valorAtual = this._quantidadeNotificacoes.getValue() + 1;
    this._quantidadeNotificacoes.next(valorAtual);
    localStorage.setItem(this.STORAGE_KEY, valorAtual.toString());

    setTimeout(() => {
      this.initQuantidadeNotificacoes();
    }, 5000);
  }


}
