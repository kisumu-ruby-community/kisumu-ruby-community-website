import { ChangeDetectionStrategy, Component, inject } from '@angular/core';import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule, LucideIconProvider, LUCIDE_ICONS,
  MessageSquare, Send, ExternalLink, Loader,
} from 'lucide-angular';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../core/services/notification';

interface ContactForm { name: string; email: string; message: string; }
interface ProposalForm { name: string; email: string; topic: string; description: string; format: string; }

@Component({
  selector: 'app-contact',
  imports: [FormsModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ MessageSquare, Send, ExternalLink, Loader }),
    },
  ],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly http = inject(HttpClient);
  protected readonly notifications = inject(NotificationService);

  protected readonly messageSquareIcon = MessageSquare;
  protected readonly sendIcon = Send;
  protected readonly externalLinkIcon = ExternalLink;
  protected readonly loaderIcon = Loader;

  private readonly CONTACT_URL = environment.formspree.contactUrl;
  private readonly PROPOSAL_URL = environment.formspree.proposalUrl;

  protected readonly communityLinks = [
    { label: 'WhatsApp', description: 'Join our WhatsApp channel', href: 'https://chat.whatsapp.com/GpNl9qryNzPCzNLnLWyfBP', color: 'bg-green-600 hover:bg-green-700' },
    { label: 'Discord', description: 'Join our Discord server', href: '#', color: 'bg-[#5865F2] hover:bg-[#4752c4]' },
  ];

  protected readonly talkFormats = ['Lightning Talk (5–10 min)', 'Full Talk (30 min)', 'Workshop (60–90 min)', 'Panel Discussion'];

  // Contact form
  protected contactSubmitting = false;
  protected contact: ContactForm = { name: '', email: '', message: '' };
  protected contactErrors: Partial<ContactForm> = {};

  protected get contactValid(): boolean {
    return !!this.contact.name.trim() && !!this.contact.email.trim() && !!this.contact.message.trim();
  }

  protected submitContact(): void {
    this.contactErrors = this.validateContact();
    if (Object.keys(this.contactErrors).length) return;
    this.contactSubmitting = true;
    this.http.post(this.CONTACT_URL, this.contact, { headers: { Accept: 'application/json' } }).subscribe({
      next: () => { this.contactSubmitting = false; this.notifications.success('Message sent! We\'ll get back to you soon.'); this.contact = { name: '', email: '', message: '' }; },
      error: () => { this.contactSubmitting = false; this.notifications.error('Something went wrong. Please try again.'); },
    });
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
  protected proposalSubmitting = false;
  protected proposal: ProposalForm = { name: '', email: '', topic: '', description: '', format: '' };
  protected proposalErrors: Partial<ProposalForm> = {};

  protected get proposalValid(): boolean {
    return !!this.proposal.name.trim() && !!this.proposal.email.trim() && !!this.proposal.topic.trim() && !!this.proposal.description.trim() && !!this.proposal.format;
  }

  protected submitProposal(): void {
    this.proposalErrors = this.validateProposal();
    if (Object.keys(this.proposalErrors).length) return;
    this.proposalSubmitting = true;
    this.http.post(this.PROPOSAL_URL, this.proposal, { headers: { Accept: 'application/json' } }).subscribe({
      next: () => { this.proposalSubmitting = false; this.notifications.success('Proposal submitted! We\'ll be in touch.'); this.proposal = { name: '', email: '', topic: '', description: '', format: '' }; },
      error: () => { this.proposalSubmitting = false; this.notifications.error('Something went wrong. Please try again.'); },
    });
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
