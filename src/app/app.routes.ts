import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AnuncioDetailComponent } from './pages/anuncio-detail/anuncio-detail.component';
import { PainelComponent } from './pages/painel/painel.component';
import { ParceirosComponent } from './pages/parceiros/parceiros.component';
import { ParceiroDetailComponent } from './pages/parceiro-detail/parceiro-detail.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'anuncios/:id', component: AnuncioDetailComponent },
  { path: 'painel', component: PainelComponent },
  { path: 'parceiros', component: ParceirosComponent },
  { path: 'parceiros/:id', component: ParceiroDetailComponent },
  { path: '**', redirectTo: 'home' }
];
