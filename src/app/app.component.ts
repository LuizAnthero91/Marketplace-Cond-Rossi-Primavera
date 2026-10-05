import { Component, computed, inject } from '@angular/core';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { HeaderComponent } from './shared/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: '@if (showHeader()) { <app-header /> } <router-outlet />'
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly currentUrl = toSignal(this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(event => event.urlAfterRedirects)
  ), { initialValue: this.router.url });
  readonly showHeader = computed(() => !['/', '/login'].includes(this.currentUrl().split(/[?#]/)[0]));

  constructor() {
    const document = inject(DOCUMENT);
    inject(ViewportScroller).setOffset(() => [
      0,
      (document.querySelector('app-header')?.getBoundingClientRect().height ?? 0) + 16
    ]);
  }
}
