import { Component, inject } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { ResidentService } from '../core/resident.service';

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
        <a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="exactFragment" ariaCurrentWhenActive="page">Início</a>
        <a routerLink="/home" fragment="categorias" routerLinkActive="active" [routerLinkActiveOptions]="exactFragment" ariaCurrentWhenActive="location">Categorias</a>
        <a routerLink="/parceiros" routerLinkActive="active" ariaCurrentWhenActive="page">Parceiros</a>
        <a routerLink="/painel" routerLinkActive="active" ariaCurrentWhenActive="page">Meu painel</a>
      </nav>
      <a class="user-area" routerLink="/painel" [queryParams]="{secao: 'perfil'}" aria-label="Abrir meu perfil"><div class="avatar">{{resident.iniciais()}}</div><span class="user-name">Olá, {{resident.perfil().nome.split(' ')[0]}}</span></a>
    </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly resident = inject(ResidentService);
  readonly exactFragment: IsActiveMatchOptions = { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'exact' };
}
