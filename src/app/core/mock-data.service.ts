import { Injectable, signal } from '@angular/core';
import { Anuncio, Parceiro } from './models';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  readonly anuncios = signal<Anuncio[]>([
    { id: 1, titulo: 'Bolos e Doces Artesanais', categoria: 'Alimentação', vendedor: 'Fernanda Alves', preco: 'A partir de R$ 50', avaliacao: 4.9, imagem: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80', descricao: 'Bolos, doces e kits para aniversários e momentos especiais.', destaque: true },
    { id: 2, titulo: 'Escova e Manicure em Casa', categoria: 'Beleza', vendedor: 'Camila Santos', preco: 'A partir de R$ 80', avaliacao: 4.8, imagem: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80', descricao: 'Atendimento de beleza no conforto do condomínio.', destaque: true },
    { id: 3, titulo: 'Manutenção de Notebooks', categoria: 'Informática', vendedor: 'Rafael Souza', preco: 'A partir de R$ 80', avaliacao: 4.9, imagem: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=900&q=80', descricao: 'Diagnóstico, limpeza, formatação e upgrades para computadores e notebooks.', destaque: true },
    { id: 4, titulo: 'Passeios e Banho para Pets', categoria: 'Pet Care', vendedor: 'Juliana Martins', preco: 'A partir de R$ 50', avaliacao: 4.9, imagem: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80', descricao: 'Cuidado, passeio e banho para o seu pet com carinho e segurança.', destaque: true },
    { id: 5, titulo: 'Aulas Particulares de Matemática', categoria: 'Aulas', vendedor: 'Paulo Henrique', preco: 'R$ 60 / hora', avaliacao: 4.7, imagem: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80', descricao: 'Reforço escolar para ensino fundamental e médio.' }
  ]);

  readonly parceiros = signal<Parceiro[]>([
    { id: 1, nome: 'Padaria Primavera', categoria: 'Gastronomia', descricao: 'Pães artesanais, bolos, café e encomendas para eventos.', beneficio: '10% de desconto para moradores', avaliacao: 4.9, imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80', whatsapp: '5531999999999' },
    { id: 2, nome: 'Pet & Cia', categoria: 'Pet Shop', descricao: 'Banho, tosa, acessórios e atendimento para pets.', beneficio: 'Banho com 15% OFF às terças', avaliacao: 4.8, imagem: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80', whatsapp: '5531988888888' },
    { id: 3, nome: 'Studio Bella', categoria: 'Beleza', descricao: 'Cabelo, unhas e estética com atendimento personalizado.', beneficio: 'Primeira visita com 20% OFF', avaliacao: 4.9, imagem: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80', whatsapp: '5531977777777' }
  ]);
}
