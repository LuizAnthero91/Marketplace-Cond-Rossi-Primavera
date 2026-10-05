import { Component, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Anuncio } from '../../core/models';
import { AnuncioForm, CATEGORIAS, PerfilMorador, ResidentService } from '../../core/resident.service';
import { PANEL_SECTIONS, ResidentNavComponent } from './resident-nav.component';

@Component({
  selector: 'app-painel', standalone: true, imports: [FormsModule, RouterLink, ResidentNavComponent],
  templateUrl: './painel.component.html', styleUrl: './painel.component.css'
})
export class PainelComponent {
  readonly resident = inject(ResidentService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);
  private readonly query = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });
  readonly sections = PANEL_SECTIONS;
  readonly section = computed(() => {
    const id = this.query().get('secao');
    return this.sections.some(s => s.id === id) ? id! : 'resumo';
  });
  readonly title = computed(() => this.sections.find(s => s.id === this.section())!.title);
  readonly categorias = CATEGORIAS;
  readonly search = signal('');
  readonly statusFilter = signal('todos');
  readonly filtered = computed(() => this.resident.meusAnuncios().filter(a => {
    const matches = `${a.titulo} ${a.categoria}`.toLocaleLowerCase('pt-BR').includes(this.search().trim().toLocaleLowerCase('pt-BR'));
    const active = a.ativo !== false;
    return matches && (this.resident.mostrarPausados() || active)
      && (this.statusFilter() === 'todos' || (this.statusFilter() === 'ativos' ? active : !active));
  }));
  readonly profileProgress = computed(() => Math.round(Object.values(this.resident.perfil()).filter(v => v.trim()).length / 4 * 100));
  readonly notice = signal('');
  readonly editorOpen = signal(false);
  readonly pendingDelete = signal<number | null>(null);
  editingId: number | null = null;
  draft: AnuncioForm = this.emptyDraft();
  perfil: PerfilMorador = { ...this.resident.perfil() };
  formError = '';
  profileError = '';

  openEditor(anuncio?: Anuncio): void {
    this.editingId = anuncio?.id ?? null;
    this.draft = anuncio ? {
      titulo: anuncio.titulo, categoria: anuncio.categoria, preco: anuncio.preco,
      descricao: anuncio.descricao, imagem: anuncio.imagem.startsWith('https://') ? anuncio.imagem : ''
    } : this.emptyDraft();
    this.formError = '';
    this.notice.set('');
    this.editorOpen.set(true);
    void this.router.navigate(['/painel'], { queryParams: { secao: 'anuncios' } }).then(() => {
      setTimeout(() => this.document.getElementById('ad-title')?.focus());
    });
  }

  saveAnuncio(form: NgForm): void {
    if (form.invalid || this.draft.titulo.trim().length < 3 || this.draft.preco.trim().length < 2
      || this.draft.descricao.trim().length < 10 || !CATEGORIAS.includes(this.draft.categoria)) {
      form.form.markAllAsTouched();
      this.formError = 'Confira os campos: informe título, categoria, preço e uma descrição de pelo menos 10 caracteres.';
      return;
    }
    const editing = this.editingId !== null;
    this.resident.saveAnuncio(this.draft, this.editingId);
    this.editorOpen.set(false);
    this.search.set('');
    this.statusFilter.set('todos');
    this.notice.set(editing ? 'Anúncio atualizado.' : 'Anúncio publicado na comunidade.');
  }

  cancelEditor(): void { this.editorOpen.set(false); this.formError = ''; }

  imageFailed(event: Event): void {
    const image = event.target as HTMLImageElement;
    const fallback = 'assets/anuncio-placeholder.svg';
    if (image.getAttribute('src') !== fallback) image.src = fallback;
  }

  toggleStatus(anuncio: Anuncio): void {
    this.resident.toggleAnuncio(anuncio.id);
    this.notice.set(anuncio.ativo === false ? 'Anúncio ativado e visível na comunidade.' : 'Anúncio pausado. Ele não aparece na busca.');
  }

  deleteAnuncio(id: number): void {
    this.resident.deleteAnuncio(id);
    this.pendingDelete.set(null);
    if (this.editingId === id) this.cancelEditor();
    this.notice.set('Anúncio excluído.');
  }

  saveProfile(form: NgForm): void {
    if (form.invalid || this.perfil.nome.trim().length < 3) {
      form.form.markAllAsTouched();
      this.profileError = 'Informe seu nome e um e-mail válido.';
      return;
    }
    this.resident.savePerfil(this.perfil);
    this.profileError = '';
    this.notice.set('Perfil atualizado.');
  }

  private emptyDraft(): AnuncioForm { return { titulo: '', categoria: '', preco: '', descricao: '', imagem: '' }; }
}
