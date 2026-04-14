import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule, LucideIconProvider, LUCIDE_ICONS,
  MessageSquare, Send, ExternalLink, CheckCircle,
} from 'lucide-angular';

type FormStatus = 'idle' | 'success';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface ProposalForm {
  name: string;
  email: string;
  topic: string;
  description: string;
  format: string;
}

@Component({
  selector: 'app-contact',
  imports: [FormsModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ MessageSquare, Send, ExternalLink, CheckCircle }),
    },
  ],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly messageSquareIcon = MessageSquare;
  protected readonly sendIcon = Send;
  protected readonly externalLinkIcon = ExternalLink;
  protected readonly checkCircleIcon = CheckCircle;

  protected readonly communityLinks = [
    {
      label: 'WhatsApp',
      description: 'Join our WhatsApp channel',
      href: 'https://chat.whatsapp.com/GpNl9qryNzPCzNLnLWyfBP',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      label: 'Discord',
      description: 'Join our Discord server',
      href: 'https://discord.gg/gA49HjpwC',
      color: 'bg-[#5865F2] hover:bg-[#4752c4]',
    },
  ];

  protected readonly talkFormats = ['Lightning Talk (5–10 min)', 'Full Talk (30 min)', 'Workshop (60–90 min)', 'Panel Discussion'];

  // Contact form
  protected contactStatus = signal<FormStatus>('idle');
  protected contact: ContactForm = { name: '', email: '', message: '' };
  protected contactErrors: Partial<ContactForm> = {};

  protected submitContact(): void {
    this.contactErrors = this.validateContact();
    if (Object.keys(this.contactErrors).length) return;
    this.contactStatus.set('success');
  }

  private validateContact(): Partial<ContactForm> {
    const e: Partial<ContactForm> = {};
    if (!this.contact.name.trim()) e.name = 'Name is required.';
    if (!this.contact.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contact.email)) e.email = 'Enter a valid email.';
    if (!this.contact.message.trim()) e.message = 'Message is required.';
    return e;
  }

  // Proposal form
  protected proposalStatus = signal<FormStatus>('idle');
  protected proposal: ProposalForm = { name: '', email: '', topic: '', description: '', format: '' };
  protected proposalErrors: Partial<ProposalForm> = {};

  protected submitProposal(): void {
    this.proposalErrors = this.validateProposal();
    if (Object.keys(this.proposalErrors).length) return;
    this.proposalStatus.set('success');
  }

  private validateProposal(): Partial<ProposalForm> {
    const e: Partial<ProposalForm> = {};
    if (!this.proposal.name.trim()) e.name = 'Name is required.';
    if (!this.proposal.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.proposal.email)) e.email = 'Enter a valid email.';
    if (!this.proposal.topic.trim()) e.topic = 'Topic is required.';
    if (!this.proposal.description.trim()) e.description = 'Description is required.';
    if (!this.proposal.format) e.format = 'Select a format.';
    return e;
  }
}
