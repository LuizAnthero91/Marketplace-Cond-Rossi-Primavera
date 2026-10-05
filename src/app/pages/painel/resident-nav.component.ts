import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResidentService } from '../../core/resident.service';

export const PANEL_SECTIONS = [
  { id: 'resumo', title: 'Visão geral', icon: '▦' },
  { id: 'anuncios', title: 'Meus anúncios', icon: '▤' },
  { id: 'solicitacoes', title: 'Solicitações', icon: '↗' },
  { id: 'favoritos', title: 'Favoritos', icon: '♡' },
  { id: 'avaliacoes', title: 'Avaliações', icon: '☆' },
  { id: 'perfil', title: 'Meu perfil', icon: '○' },
  { id: 'configuracoes', title: 'Preferências', icon: '⚙' }
];

@Component({
  selector: 'app-resident-nav', standalone: true, imports: [RouterLink],
  templateUrl: './resident-nav.component.html', styleUrl: './resident-nav.component.css'
})
export class ResidentNavComponent {
  readonly resident = inject(ResidentService);
  readonly section = input('resumo');
  readonly sections = PANEL_SECTIONS;
}
