import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class HomeComponent {
  protected readonly arrowRightIcon = ArrowRight;
  protected readonly calendarIcon = Calendar;
  protected readonly usersIcon = Users;
  protected readonly zapIcon = Zap;

  protected readonly stats: Stat[] = [
    // { value: '1+', label: 'Members' },
    // { value: '1+', label: 'Events hosted' },
    // { value: '1+', label: 'Years active' },
  ];
}
