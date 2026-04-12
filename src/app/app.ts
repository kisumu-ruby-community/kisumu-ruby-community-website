import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <a href="#main-content" class="skip-to-content">Skip to main content</a>
    <app-navbar />
    <main id="main-content" tabindex="-1" class="flex-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
  host: { class: 'flex flex-col min-h-screen' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
