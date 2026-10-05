import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="login-page">
      <section class="login-visual">
        <img src="assets/rossi-torre.jpg" alt="Torre do Condomínio Rossi Primavera">
        <div class="overlay"></div>
        <div class="hero-copy">
          <div class="hero-brand">⌂ ConectaCondo</div>
          <p class="eyebrow">CONDOMÍNIO ROSSI PRIMAVERA</p>
          <h1>Marketplace<br> do nosso<br> Condomínio</h1>
          <p>Divulgue seus serviços, encontre produtos e conecte-se com moradores verificados.</p>
        </div>
        <div class="benefits">
          <span>✓ Moradores verificados</span><span>♥ Comunidade mais próxima</span><span>◇ Serviços de confiança</span>
        </div>
      </section>

      <section class="login-panel">
        <div class="login-card">
          <div class="logo-small"><span>⌂</span><strong>ConectaCondo</strong></div>
          <p class="condo">CONDOMÍNIO ROSSI PRIMAVERA</p>
          <h2>Acesse sua conta</h2>
          <p class="intro">Entre para divulgar seus serviços, encontrar produtos e conhecer parceiros locais.</p>

          <button class="google" (click)="entrarDemo()"><span class="g">G</span> Continuar com Google</button>
          <div class="divider"><span>ou</span></div>
          <label>E-mail<input [(ngModel)]="email" type="email" autocomplete="username" placeholder="seuemail@exemplo.com"></label>
          <label>Senha<input [(ngModel)]="senha" type="password" autocomplete="current-password" placeholder="••••••••"></label>
          <div class="login-options"><label class="check"><input type="checkbox" checked> Lembrar de mim</label><a>Esqueceu a senha?</a></div>
          <button class="primary" (click)="entrarDemo()">Entrar</button>
          <p class="signup">Ainda não tem uma conta? <a>Cadastre-se</a></p>
          <small class="demo-note">Demonstração: o login Google será integrado ao backend posteriormente.</small>
        </div>
      </section>
    </main>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = 'morador@rossiprimavera.com';
  senha = '123456';
  constructor(private router: Router) {}
  entrarDemo(): void { this.router.navigate(['/home']); }
}
