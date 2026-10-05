import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../core/mock-data.service';
import { ResidentService } from '../../core/resident.service';

@Component({
  selector: 'app-home', standalone: true, imports: [RouterLink],
  template: `
    
    <main>
      <section class="hero">
        <img src="assets/rossi-torre.jpg" alt="Rossi Primavera">
        <div class="hero-shade"></div>
        <div class="hero-content">
          <span class="tag">COMUNIDADE • NEGÓCIOS LOCAIS • CONFIANÇA</span>
          <h1>Tudo o que você precisa,<br><em>no seu condomínio</em></h1>
          <p>Produtos, serviços e pessoas de confiança. Valorize os talentos da nossa comunidade.</p>
          <div class="search"><span aria-hidden="true">⌕</span><input #q type="search" aria-label="Buscar produtos e serviços" placeholder="O que você está procurando?" (input)="busca.set(q.value)"><button (click)="busca.set(q.value)">Buscar</button></div>
        </div>
      </section>

      <section class="content" id="categorias">
        <div class="categories">
          @for (cat of categorias; track cat.nome) {
            <button (click)="categoria.set(categoria() === cat.nome ? '' : cat.nome)" [class.selected]="categoria()===cat.nome"><span>{{cat.icon}}</span>{{cat.nome}}</button>
          }
        </div>

        <div class="section-head"><div><p class="kicker">DA NOSSA COMUNIDADE</p><h2>Anúncios em destaque</h2></div><span>{{filtrados().length}} encontrados</span></div>
        <div class="grid cards">
          @for (a of filtrados(); track a.id) {
            <article class="card">
              <div class="image-wrap"><a [routerLink]="['/anuncios',a.id]"><img [src]="a.imagem" [alt]="a.titulo"></a><button class="heart" (click)="resident.toggleFavorito(a.id)" [attr.aria-pressed]="resident.favoritos().includes(a.id)" [attr.aria-label]="(resident.favoritos().includes(a.id) ? 'Remover dos favoritos: ' : 'Salvar nos favoritos: ') + a.titulo">{{resident.favoritos().includes(a.id) ? '♥' : '♡'}}</button></div>
              <div class="card-body"><span class="category">{{a.categoria}}</span><h3>{{a.titulo}}</h3><p class="seller">{{a.vendedor}} · ★ {{a.avaliacao}}</p><strong>{{a.preco}}</strong><span class="verified">✓ Morador verificado</span></div>
            </article>
          }
        </div>

        <section class="partners-preview">
          <div class="section-head"><div><p class="kicker">PARCEIROS ROSSI PRIMAVERA</p><h2>Comércios que apoiam nossa comunidade</h2></div><a routerLink="/parceiros">Ver todos →</a></div>
          <div class="partner-row">
            @for (p of parceiros().slice(0,3); track p.id) {
              <a class="partner-mini" [routerLink]="['/parceiros',p.id]"><img [src]="p.imagem" [alt]="p.nome"><div><small>{{p.categoria}}</small><h3>{{p.nome}}</h3><p>{{p.beneficio}}</p><b>★ {{p.avaliacao}}</b></div></a>
            }
          </div>
        </section>
      </section>
    </main>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly resident = inject(ResidentService);
  busca = signal(''); categoria = signal(''); categorias = [{nome:'Alimentação',icon:'🍰'},{nome:'Beleza',icon:'✦'},{nome:'Pet Care',icon:'🐾'},{nome:'Informática',icon:'⌨'},{nome:'Manutenção',icon:'🔧'},{nome:'Aulas',icon:'✎'}];
  parceiros = this.data.parceiros;
  filtrados = computed(() => { const q=this.busca().toLowerCase(); const c=this.categoria(); return this.data.anuncios().filter(a=>a.ativo !== false && (!q || `${a.titulo} ${a.categoria} ${a.vendedor}`.toLowerCase().includes(q)) && (!c || a.categoria===c)); });
  constructor(public data: MockDataService) {}
}
