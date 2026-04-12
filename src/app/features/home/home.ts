import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  LucideIconProvider,
  LUCIDE_ICONS,
  ArrowRight,
  Calendar,
  Users,
  Zap,
} from 'lucide-angular';

interface Stat {
  value: string;
  label: string;
}

interface CodeLine {
  text: string;
  class: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, LucideAngularModule],
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

  protected typedLines: CodeLine[] = [];
  private fullCode: CodeLine[] = [
    { text: '# Kisumu Ruby Community', class: 'text-slate-500' },
    { text: '# Kisumu, Kenya — est. 2026', class: 'text-slate-500' },
    { text: '', class: '' },
    { text: 'class KisumuRuby', class: 'text-violet-400' },
    { text: '  attr_reader :members, :city', class: 'text-sky-300' },
    { text: '', class: '' },
    { text: '  def initialize', class: 'text-emerald-400' },
    { text: '    @city    = "Kisumu, Kenya"', class: 'text-sky-300' },
    { text: '    @members = 1.+', class: 'text-sky-300' },
    { text: '    @stack   = [:ruby, :rails]', class: 'text-sky-300' },
    { text: '  end', class: 'text-emerald-400' },
    { text: '', class: '' },
    { text: '  def join!', class: 'text-emerald-400' },
    { text: '    "Welcome to the community!"', class: 'text-orange-300' },
    { text: '  end', class: 'text-emerald-400' },
    { text: 'end', class: 'text-violet-400' },
    { text: '', class: '' },
    { text: '# You belong here.', class: 'text-slate-500' },
    { text: 'KisumuRuby.new.join!', class: 'text-amber-300' },
    { text: '#=> "Welcome to the community!"', class: 'text-slate-500' },
  ];

  private readonly charDelay = 60;
  private readonly lineDelays = { empty: 200, keyword: 400, comment: 150, default: 80 };

  private currentLineIndex = 0;
  private currentCharIndex = 0;
  private typingInterval: ReturnType<typeof setInterval> | null = null;
  protected isTypingComplete = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startTyping();
  }

  ngOnDestroy(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }

  private startTyping(): void {
    const typeNextChar = () => {
      if (this.isTypingComplete) return;

      const currentLineText = this.fullCode[this.currentLineIndex]?.text || '';

      if (currentLineText === '') {
        this.typedLines = [...this.typedLines, { text: '', class: '' }];
        this.currentLineIndex++;
        this.currentCharIndex = 0;
        this.cdr.markForCheck();
        if (this.currentLineIndex < this.fullCode.length) {
          setTimeout(() => typeNextChar(), this.getDelayForLine(this.currentLineIndex));
        } else {
          this.isTypingComplete = true;
        }
        return;
      }

      if (this.currentCharIndex < currentLineText.length) {
        const currentLine = this.typedLines[this.currentLineIndex] || { text: '', class: this.fullCode[this.currentLineIndex].class };
        const newText = currentLine.text + currentLineText[this.currentCharIndex];
        
        if (this.currentLineIndex < this.typedLines.length) {
          this.typedLines = this.typedLines.map((l, i) => 
            i === this.currentLineIndex ? { ...l, text: newText } : l
          );
        } else {
          this.typedLines = [...this.typedLines, { text: newText, class: currentLine.class }];
        }
        
        this.currentCharIndex++;
        this.cdr.markForCheck();
        setTimeout(() => typeNextChar(), this.charDelay);
        return;
      }

      this.currentLineIndex++;
      this.currentCharIndex = 0;

      if (this.currentLineIndex < this.fullCode.length) {
        setTimeout(() => typeNextChar(), this.getDelayForLine(this.currentLineIndex));
      } else {
        this.isTypingComplete = true;
      }
    };

    typeNextChar();
  }

  private getDelayForLine(lineIndex: number): number {
    const line = this.fullCode[lineIndex];
    if (line.text === '') return this.lineDelays.empty;
    if (line.text.startsWith('class ') || line.text.startsWith('def ')) return this.lineDelays.keyword;
    if (line.text.startsWith('#')) return this.lineDelays.comment;
    return this.lineDelays.default;
  }
}
