import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  LucideIconProvider,
  LUCIDE_ICONS,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
} from 'lucide-angular';

interface NavLink {
  label: string;
  path: string;
}

interface CommunityLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: any;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ExternalLink, Github, Linkedin, Mail, MapPin, Twitter }),
    },
  ],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly mapPinIcon = MapPin;
  protected readonly externalLinkIcon = ExternalLink;

  protected readonly exploreLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    // { label: 'Events', path: '/events' },
    // { label: 'Blog', path: '/blog' },
    // { label: 'Members', path: '/members' },
    // { label: 'Resources', path: '/resources' },
    { label: 'Contact', path: '/contact' },
  ];

  protected readonly communityLinks: CommunityLink[] = [
    { label: 'WhatsApp Channel', href: 'https://chat.whatsapp.com/GpNl9qryNzPCzNLnLWyfBP' },
    { label: 'Discord Server', href: 'https://discord.gg/gA49HjpwC' },
    { label: 'GitHub Organisation', href: 'https://github.com/kisumu-ruby-community' },
    // { label: 'Submit a Talk', href: '/contact' },
    // { label: 'Newsletter', href: '/contact' },
  ];

  protected readonly socialLinks: SocialLink[] = [
    { label: 'GitHub', href: 'https://github.com/kisumu-ruby-community', icon: Github },
    // { label: 'Twitter / X', href: 'https://twitter.com', icon: Twitter },
    // { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    // { label: 'Email', href: 'mailto:hello@kisumuruby.dev', icon: Mail },
  ];
}
