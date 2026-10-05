import { Component, computed, input } from '@angular/core';
import { HeaderComponent } from '../../shared/header.component';
import { MockDataService } from '../../core/mock-data.service';

@Component({
 selector:'app-anuncio-detail', standalone:true, imports:[HeaderComponent],
 template:`
 <app-header />
 @if (anuncio(); as a) {
 <main class="detail container">
   <div class="breadcrumbs">Início › {{a.categoria}} › {{a.titulo}}</div>
   <section class="detail-grid">
     <div><div class="main-img"><img [src]="a.imagem" [alt]="a.titulo" [srcset]="a.imagem.replace('w=900', 'w=640') + ' 640w, ' + a.imagem.replace('w=900', 'w=960') + ' 960w, ' + a.imagem.replace('w=900', 'w=1440') + ' 1440w'" sizes="(max-width: 700px) 92vw, (max-width: 1150px) 46vw, 510px"><span>1/5</span></div><div class="thumbs">@for(i of [1,2,3,4]; track i){<img [src]="a.imagem" [alt]="a.titulo + ' — foto ' + i" loading="lazy">}</div></div>
     <div class="copy"><span class="category">{{a.categoria}}</span><h1>{{a.titulo}}</h1><h2>{{a.preco}}</h2><p>{{a.descricao}}</p><ul><li>✓ Atendimento no condomínio</li><li>✓ Orçamento sem compromisso</li><li>✓ Horários flexíveis</li></ul></div>
     <aside><div class="seller"><div class="avatar">{{a.vendedor.charAt(0)}}</div><div><strong>{{a.vendedor}}</strong><span>★ {{a.avaliacao}} · Morador verificado</span></div></div><p>Membro da comunidade Rossi Primavera.</p><button>Solicitar serviço</button><button class="whats">◉ Chamar no WhatsApp</button></aside>
   </section>
   <section class="reviews"><h2>Avaliações de moradores <span>★★★★★</span></h2><div class="review-grid"><article><b>Ana Paula · ★ 5.0</b><p>Excelente profissional! Muito atencioso e resolveu meu problema rapidamente.</p></article><article><b>Ricardo Lima · ★ 4.8</b><p>Serviço de qualidade, pontual e com preço justo. Recomendo!</p></article><article><b>Juliana Costa · ★ 5.0</b><p>Ótimo atendimento e comunicação. Ficou tudo perfeito.</p></article></div></section>
 </main>
 } @else { <div class="container"><h2>Anúncio não encontrado.</h2></div> }
 `,
 styleUrl: './anuncio-detail.component.css'
})
export class AnuncioDetailComponent { id=input<string>('1'); anuncio=computed(()=>this.data.anuncios().find(a=>a.id===Number(this.id()))); constructor(private data:MockDataService){} }
