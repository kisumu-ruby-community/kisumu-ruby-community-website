import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  LucideAngularModule,
  LucideIconProvider,
  LUCIDE_ICONS,
  ArrowRight,
  Calendar,
  Users,
  Zap,
} from 'lucide-angular';
import { ContactComponent } from '../contact/contact';
import { AboutComponent } from '../about/about';

interface Stat {
  value: string;
  label: string;
}

interface CodeSegment {
  text: string;
  class: string;
}

function seg(text: string, cls: string): CodeSegment {
  return { text, class: cls };
}

const NL: CodeSegment = { text: '\n', class: '' };

@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, ContactComponent, AboutComponent],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ArrowRight, Calendar, Users, Zap }),
    },
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  protected readonly arrowRightIcon = ArrowRight;
  protected readonly calendarIcon = Calendar;
  protected readonly usersIcon = Users;
  protected readonly zapIcon = Zap;

  protected readonly stats: Stat[] = [
    // { value: '1+', label: 'Members' },
    // { value: '1+', label: 'Events hosted' },
    // { value: '1+', label: 'Years active' },
  ];

  protected typedSegments: CodeSegment[] = [];
  private fullSegments: CodeSegment[] = [
    seg('# Kisumu Ruby Community', 'text-slate-500'), NL,
    seg('# Kisumu, Kenya - est. 2026', 'text-slate-500'), NL,
    NL,
    seg('class', 'text-violet-400'), seg(' ', 'text-white'), seg('KisumuRuby', 'text-amber-300'), NL,
    seg('  ', 'text-white'), seg('attr_reader', 'text-violet-400'), seg(' ', 'text-white'), seg(':members', 'text-sky-300'), seg(', ', 'text-white'), seg(':city', 'text-sky-300'), NL,
    NL,
    seg('  ', 'text-white'), seg('def', 'text-violet-400'), seg(' ', 'text-white'), seg('initialize', 'text-emerald-400'), NL,
    seg('    ', 'text-white'), seg('@city', 'text-sky-300'), seg('    = ', 'text-white'), seg('"Kisumu, Kenya"', 'text-orange-300'), NL,
    seg('    ', 'text-white'), seg('@members', 'text-sky-300'), seg(' = ', 'text-white'), seg('1', 'text-amber-300'), seg('.', 'text-white'), seg('+', 'text-emerald-400'), NL,
    seg('    ', 'text-white'), seg('@stack', 'text-sky-300'), seg('   = [', 'text-white'), seg(':ruby', 'text-sky-300'), seg(', ', 'text-white'), seg(':rails', 'text-sky-300'), seg(']', 'text-white'), NL,
    seg('  ', 'text-white'), seg('end', 'text-violet-400'), NL,
    NL,
    seg('  ', 'text-white'), seg('def', 'text-violet-400'), seg(' ', 'text-white'), seg('join!', 'text-emerald-400'), NL,
    seg('    ', 'text-white'), seg('"Welcome to the community!"', 'text-orange-300'), NL,
    seg('  ', 'text-white'), seg('end', 'text-violet-400'), NL,
    seg('end', 'text-violet-400'), NL,
    NL,
    seg('# You belong here.', 'text-slate-500'), NL,
    seg('KisumuRuby', 'text-amber-300'), seg('.', 'text-white'), seg('new', 'text-emerald-400'), seg('.', 'text-white'), seg('join!', 'text-emerald-400'), NL,
    seg('#=> "Welcome to the community!"', 'text-slate-500'),
  ];

  private readonly charDelay = 60;
  private readonly lineDelays = { empty: 200, keyword: 400, comment: 150, default: 80 };

  private currentSegIndex = 0;
  private currentCharIndex = 0;
  protected isTypingComplete = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startTyping();
  }

  ngOnDestroy(): void {}

  protected scrollTo(id: string, event: Event): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  private startTyping(): void {
    const typeNextChar = () => {
      if (this.currentSegIndex >= this.fullSegments.length) {
        this.isTypingComplete = true;
        this.cdr.markForCheck();
        return;
      }

      const currentSeg = this.fullSegments[this.currentSegIndex];

      if (currentSeg.text === '\n') {
        this.typedSegments = [...this.typedSegments, NL];
        this.currentSegIndex++;
        this.currentCharIndex = 0;
        this.cdr.markForCheck();
        setTimeout(() => typeNextChar(), this.getDelayAfterNewline());
        return;
      }

      if (this.currentCharIndex < currentSeg.text.length) {
        this.currentCharIndex++;
        const partial = { text: currentSeg.text.slice(0, this.currentCharIndex), class: currentSeg.class };

        if (this.currentCharIndex === 1) {
          this.typedSegments = [...this.typedSegments, partial];
        } else {
          this.typedSegments = this.typedSegments.map((s, i) =>
            i === this.typedSegments.length - 1 ? partial : s
          );
        }

        this.cdr.markForCheck();
        setTimeout(() => typeNextChar(), this.charDelay);
        return;
      }

      this.currentSegIndex++;
      this.currentCharIndex = 0;
      setTimeout(() => typeNextChar(), 0);
    };

    typeNextChar();
  }

  private getDelayAfterNewline(): number {
    // peek at the first segment of the next line to decide delay
    let i = this.currentSegIndex;
    while (i < this.fullSegments.length && this.fullSegments[i].text === '\n') i++;
    if (i >= this.fullSegments.length) return this.lineDelays.empty;
    const nextText = this.fullSegments[i].text;
    if (nextText === '') return this.lineDelays.empty;
    if (nextText === 'class' || nextText === '  ' && this.fullSegments[i + 1]?.text === 'def') return this.lineDelays.keyword;
    if (nextText.startsWith('#')) return this.lineDelays.comment;
    return this.lineDelays.default;
  }
}
