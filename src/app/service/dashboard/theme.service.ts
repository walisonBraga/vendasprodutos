import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeTheme = 'light';

  constructor() {
    // Ao inicializar o serviço, aplicamos o tema ativo ao DOM
    this.applyActiveTheme();
  }

  getActiveTheme(): string {
    return this.activeTheme;
  }

  setActiveTheme(theme: string): void {
    this.activeTheme = theme;
    // Aplicar o tema ativo ao DOM
    this.applyActiveTheme();
  }

  private applyActiveTheme(): void {
    // Remove qualquer classe de tema existente do elemento body
    document.body.classList.remove('light-theme', 'dark-theme');

    // Adiciona a classe de tema ativo ao elemento body
    document.body.classList.add(this.activeTheme + '-theme');
  }
}
