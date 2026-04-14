import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';
import { NotificationComponent } from './shared/components/notification/notification';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NotificationComponent],
  templateUrl: './app.html',
  host: { class: 'flex flex-col min-h-screen' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected animating = signal(false);

  constructor() {
    inject(Router).events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.animating.set(false);
      setTimeout(() => this.animating.set(true), 0);
    });
  }
}
