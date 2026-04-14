import { Component } from '@angular/core';
import { LucideAngularModule, LucideIconProvider, LUCIDE_ICONS, Github, Linkedin, Twitter, ExternalLink } from 'lucide-angular';

interface Organizer {
  name: string;
  role: string;
  bio: string;
  initials: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

interface Value {
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  imports: [LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Github, Linkedin, Twitter, ExternalLink }),
    },
  ],
  templateUrl: './about.html',
})
export class AboutComponent {
  protected readonly githubIcon = Github;
  protected readonly linkedinIcon = Linkedin;
  protected readonly twitterIcon = Twitter;
  protected readonly externalLinkIcon = ExternalLink;

  protected readonly values: Value[] = [
    {
      title: 'Learn Together',
      description: 'We grow by sharing knowledge, from beginner questions to advanced architecture discussions, every voice matters.',
    },
    {
      title: 'Build Real Things',
      description: 'We ship code. Hackathons, open-source contributions, and community projects keep us grounded in practice.',
    },
    {
      title: 'Grow the Ecosystem',
      description: 'We invest in Western Kenya\'s tech future by mentoring new developers and connecting talent with opportunity.',
    },
    {
      title: 'Stay Inclusive',
      description: 'Ruby\'s community has always been welcoming. We carry that spirit, everyone belongs here regardless of experience level.',
    },
  ];

  protected readonly organizers: Organizer[] = [
    {
      name: 'Abraham King\'oo',
      role: 'Organizer',
      bio: 'Software Engineer. Passionate about Ruby and building developer communities in East Africa.',
      initials: 'AK',
    },
    {
      name: 'Paul Oguda',
      role: 'Community Lead',
      bio: 'Senior Ruby Engineer. Passionate about Ruby, Rails, and mentoring developers.',
      initials: 'PO',
    },
    {
      name: 'John Odhiambo',
      role: 'Organizer',
      bio: 'Software Engineer. Passionate about communities.',
      initials: 'JO',
    },
  ];
}
