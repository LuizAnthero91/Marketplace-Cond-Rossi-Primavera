import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Anuncio } from './models';
import { MockDataService } from './mock-data.service';

export interface PerfilMorador { nome: string; email: string; unidade: string; bio: string; }
export type AnuncioForm = Pick<Anuncio, 'titulo' | 'categoria' | 'preco' | 'descricao' | 'imagem'>;
interface SavedState {
  version: 1;
  perfil: PerfilMorador;
  anuncios: Anuncio[];
  favoritos: number[];
  dicas: boolean;
  mostrarPausados: boolean;
}

const STORAGE_KEY = 'conectacondo.resident.v1';
const DEFAULT_PROFILE: PerfilMorador = {
  nome: 'Rafael Souza', email: 'rafael@rossiprimavera.com', unidade: '', bio: ''
};
export const CATEGORIAS = ['Alimentação', 'Beleza', 'Pet Care', 'Informática', 'Manutenção', 'Aulas'];

@Injectable({ providedIn: 'root' })
export class ResidentService {
  readonly data = inject(MockDataService);
  readonly perfil = signal<PerfilMorador>({ ...DEFAULT_PROFILE });
  readonly meusIds = signal<number[]>([3]);
  readonly favoritos = signal<number[]>([]);
  readonly dicas = signal(true);
  readonly mostrarPausados = signal(true);
  readonly storageError = signal(false);
  readonly meusAnuncios = computed(() => this.data.anuncios().filter(a => this.meusIds().includes(a.id)));
  readonly ativos = computed(() => this.meusAnuncios().filter(a => a.ativo !== false));
  readonly anunciosFavoritos = computed(() => this.data.anuncios().filter(a => this.favoritos().includes(a.id) && a.ativo !== false));
  readonly iniciais = computed(() => this.perfil().nome.trim().split(/\s+/).slice(0, 2).map(n => n[0]).join('').toUpperCase());

  constructor() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const state: unknown = JSON.parse(raw);
        if (this.isSavedState(state)) {
          this.perfil.set(state.perfil);
          this.meusIds.set(state.anuncios.map(a => a.id));
          // The original demo listing belongs to this resident, even when deleted.
          this.data.anuncios.update(items => [...items.filter(a => a.id !== 3 && !this.meusIds().includes(a.id)), ...state.anuncios]);
          this.favoritos.set(state.favoritos);
          this.dicas.set(state.dicas);
          this.mostrarPausados.set(state.mostrarPausados);
        }
      }
    } catch { this.storageError.set(true); }

    effect(() => {
      const state: SavedState = {
        version: 1, perfil: this.perfil(), anuncios: this.meusAnuncios(),
        favoritos: this.favoritos(), dicas: this.dicas(), mostrarPausados: this.mostrarPausados()
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); this.storageError.set(false); }
      catch { this.storageError.set(true); }
    });
  }

  saveAnuncio(form: AnuncioForm, id: number | null): void {
    if (id !== null && !this.meusIds().includes(id)) return;
    const values = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()])) as AnuncioForm;
    values.imagem ||= 'assets/anuncio-placeholder.svg';
    if (id === null) {
      const nextId = Math.max(5, ...this.data.anuncios().map(a => a.id)) + 1;
      this.meusIds.update(ids => [...ids, nextId]);
      this.data.anuncios.update(items => [...items, {
        ...values, id: nextId, vendedor: this.perfil().nome, avaliacao: 0, ativo: true
      }]);
    } else {
      this.data.anuncios.update(items => items.map(a => a.id === id ? { ...a, ...values } : a));
    }
  }

  toggleAnuncio(id: number): void {
    if (!this.meusIds().includes(id)) return;
    this.data.anuncios.update(items => items.map(a => a.id === id ? { ...a, ativo: a.ativo === false } : a));
  }

  deleteAnuncio(id: number): void {
    if (!this.meusIds().includes(id)) return;
    this.data.anuncios.update(items => items.filter(a => a.id !== id));
    this.meusIds.update(ids => ids.filter(value => value !== id));
    this.favoritos.update(ids => ids.filter(value => value !== id));
  }

  savePerfil(perfil: PerfilMorador): void {
    const value = { nome: perfil.nome.trim(), email: perfil.email.trim(), unidade: perfil.unidade.trim(), bio: perfil.bio.trim() };
    this.perfil.set(value);
    this.data.anuncios.update(items => items.map(a => this.meusIds().includes(a.id) ? { ...a, vendedor: value.nome } : a));
  }

  toggleFavorito(id: number): void {
    this.favoritos.update(ids => ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id]);
  }

  private isSavedState(value: unknown): value is SavedState {
    if (!value || typeof value !== 'object') return false;
    const s = value as SavedState;
    return s.version === 1 && !!s.perfil && ['nome', 'email', 'unidade', 'bio'].every(key => typeof (s.perfil as unknown as Record<string, unknown>)[key] === 'string')
      && Array.isArray(s.anuncios) && s.anuncios.every(a => a && Number.isSafeInteger(a.id) && (a.id === 3 || a.id > 5)
        && ['titulo', 'categoria', 'preco', 'descricao', 'imagem', 'vendedor'].every(key => typeof (a as unknown as Record<string, unknown>)[key] === 'string')
        && typeof a.avaliacao === 'number' && (a.ativo === undefined || typeof a.ativo === 'boolean'))
      && Array.isArray(s.favoritos) && s.favoritos.every(Number.isSafeInteger)
      && typeof s.dicas === 'boolean' && typeof s.mostrarPausados === 'boolean';
  }
}
