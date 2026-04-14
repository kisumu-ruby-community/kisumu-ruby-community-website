import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule, LucideIconProvider, LUCIDE_ICONS,
  MessageSquare, Send, ExternalLink, Loader,
} from 'lucide-angular';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../core/services/notification';

interface ContactForm { name: string; email: string; message: string; }
interface ProposalForm { name: string; email: string; topic: string; description: string; format: string; }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(f: ContactForm): Partial<ContactForm> {
  const e: Partial<ContactForm> = {};
  if (!f.name.trim()) e.name = 'Name is required.';
  else if (f.name.trim().length < 3) e.name = 'Name must be at least 3 characters.';
  if (!f.email.trim()) e.email = 'Email is required.';
  else if (!EMAIL_RE.test(f.email)) e.email = 'Enter a valid email address.';
  if (!f.message.trim()) e.message = 'Message is required.';
  else if (f.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
  return e;
}

function validateProposal(f: ProposalForm): Partial<ProposalForm> {
  const e: Partial<ProposalForm> = {};
  if (!f.name.trim()) e.name = 'Name is required.';
  else if (f.name.trim().length < 3) e.name = 'Name must be at least 3 characters.';
  if (!f.email.trim()) e.email = 'Email is required.';
  else if (!EMAIL_RE.test(f.email)) e.email = 'Enter a valid email address.';
  if (!f.topic.trim()) e.topic = 'Topic is required.';
  else if (f.topic.trim().length < 10) e.topic = 'Topic must be at least 10 characters.';
  if (!f.description.trim()) e.description = 'Description is required.';
  else if (f.description.trim().length < 10) e.description = 'Description must be at least 10 characters.';
  if (!f.format) e.format = 'Select a format.';
  return e;
}

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
    { label: 'Discord', description: 'Join our Discord server', href: 'https://discord.gg/gA49HjpwC', color: 'bg-[#5865F2] hover:bg-[#4752c4]' },
  ];

  protected readonly talkFormats = ['Lightning Talk (5–10 min)', 'Full Talk (30 min)', 'Workshop (60–90 min)', 'Panel Discussion'];

  // ── Contact form ──
  protected contactSubmitting = signal(false);
  protected contact: ContactForm = { name: '', email: '', message: '' };
  protected contactErrors: Partial<ContactForm> = {};
  protected contactTouched: Partial<Record<keyof ContactForm, boolean>> = {};

  protected onContactBlur(field: keyof ContactForm): void {
    this.contactTouched[field] = true;
    this.contactErrors = validateContact(this.contact);
  }

  protected onContactChange(field: keyof ContactForm): void {
    if (this.contactTouched[field]) this.contactErrors = validateContact(this.contact);
  }

  protected get contactValid(): boolean {
    return Object.keys(validateContact(this.contact)).length === 0;
  }

  protected submitContact(): void {
    this.contactTouched = { name: true, email: true, message: true };
    this.contactErrors = validateContact(this.contact);
    if (!this.contactValid) return;
    this.contactSubmitting.set(true);
    this.http.post(this.CONTACT_URL, this.contact, { headers: { Accept: 'application/json' } }).subscribe({
      next: () => { this.contactSubmitting.set(false); this.notifications.success("Message sent! We'll get back to you soon."); this.contact = { name: '', email: '', message: '' }; this.contactTouched = {}; this.contactErrors = {}; },
      error: () => { this.contactSubmitting.set(false); this.notifications.error('Something went wrong. Please try again.'); },
    });
  }

  // ── Proposal form ──
  protected proposalSubmitting = signal(false);
  protected proposal: ProposalForm = { name: '', email: '', topic: '', description: '', format: '' };
  protected proposalErrors: Partial<ProposalForm> = {};
  protected proposalTouched: Partial<Record<keyof ProposalForm, boolean>> = {};

  protected onProposalBlur(field: keyof ProposalForm): void {
    this.proposalTouched[field] = true;
    this.proposalErrors = validateProposal(this.proposal);
  }

  protected onProposalChange(field: keyof ProposalForm): void {
    if (this.proposalTouched[field]) this.proposalErrors = validateProposal(this.proposal);
  }

  protected get proposalValid(): boolean {
    return Object.keys(validateProposal(this.proposal)).length === 0;
  }

  protected submitProposal(): void {
    this.proposalTouched = { name: true, email: true, topic: true, description: true, format: true };
    this.proposalErrors = validateProposal(this.proposal);
    if (!this.proposalValid) return;
    this.proposalSubmitting.set(true);
    this.http.post(this.PROPOSAL_URL, this.proposal, { headers: { Accept: 'application/json' } }).subscribe({
      next: () => { this.proposalSubmitting.set(false); this.notifications.success("Proposal submitted! We'll be in touch."); this.proposal = { name: '', email: '', topic: '', description: '', format: '' }; this.proposalTouched = {}; this.proposalErrors = {}; },
      error: () => { this.proposalSubmitting.set(false); this.notifications.error('Something went wrong. Please try again.'); },
    });
  }
}
