import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <a class="brand" routerLink="/home" aria-label="ConectaCondo">
        <span class="brand-icon">⌂</span>
        <span><strong>ConectaCondo</strong><small>CONDOMÍNIO ROSSI PRIMAVERA</small></span>
      </a>
      <nav class="desktop-nav" aria-label="Navegação principal">
        <a routerLink="/home" routerLinkActive="active" ariaCurrentWhenActive="page">Início</a>
        <a routerLink="/home" fragment="categorias">Categorias</a>
        <a routerLink="/parceiros" routerLinkActive="active" ariaCurrentWhenActive="page">Parceiros</a>
        <a routerLink="/painel" routerLinkActive="active" ariaCurrentWhenActive="page">Meu painel</a>
      </nav>
      <div class="user-area"><span class="bell">♡</span><div class="avatar">LC</div><span class="user-name">Olá, Luiz</span></div>
    </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {}
