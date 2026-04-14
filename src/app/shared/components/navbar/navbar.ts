import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LucideIconProvider, LUCIDE_ICONS, Menu, X } from 'lucide-angular';

interface NavLink {
  label: string;
  path: string;
  exact: boolean;
  fragment?: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  providers: [{ provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider({ Menu, X }) }],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
    '(window:scroll)': 'onScroll()',
  },
})
export class NavbarComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);

  @ViewChild('menuButton') private readonly menuButtonRef?: ElementRef<HTMLButtonElement>;
  @ViewChild('mobileMenu') private readonly mobileMenuRef?: ElementRef<HTMLElement>;

  protected readonly isMenuOpen = signal(false);
  protected readonly isScrolled = signal(false);

  protected readonly menuIcon = Menu;
  protected readonly xIcon = X;

  protected readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Contact', path: '/contact', exact: false, fragment: 'contact' },
    { label: 'About', path: '/about', exact: false, fragment: 'about' },
  ];

  protected navigate(link: NavLink, event: Event): void {
    if (link.fragment && isPlatformBrowser(this.platformId)) {
      const isHome = this.router.url === '/' || this.router.url.startsWith('/#');
      if (isHome) {
        event.preventDefault();
        document.getElementById(link.fragment)?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    this.router.navigate([link.path]);
  }

  protected navigateCta(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      const isHome = this.router.url === '/' || this.router.url.startsWith('/#');
      if (isHome) {
        event.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    this.router.navigate(['/contact']);
  }

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const onKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && this.isMenuOpen()) {
          this.closeMenu();
        }
      };

      // Close menu when clicking outside the navbar component
      const onDocumentClick = (event: MouseEvent) => {
        if (
          this.isMenuOpen() &&
          !this.elementRef.nativeElement.contains(event.target as Node)
        ) {
          this.closeMenu();
        }
      };

      document.addEventListener('keydown', onKeydown);
      document.addEventListener('click', onDocumentClick);

      this.destroyRef.onDestroy(() => {
        document.removeEventListener('keydown', onKeydown);
        document.removeEventListener('click', onDocumentClick);
      });
    }
  }

  protected onScroll(): void {
    this.isScrolled.set(window.scrollY > 16);
  }

  protected toggleMenu(): void {
    const opening = !this.isMenuOpen();
    this.isMenuOpen.set(opening);

    if (opening && isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.mobileMenuRef?.nativeElement.querySelector<HTMLAnchorElement>('a')?.focus();
      }, 50);
    }
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
    this.menuButtonRef?.nativeElement.focus();
  }
}
