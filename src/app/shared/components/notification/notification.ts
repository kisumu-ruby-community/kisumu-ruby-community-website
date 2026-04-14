import { Component, inject } from '@angular/core';
import { LucideAngularModule, LucideIconProvider, LUCIDE_ICONS, CheckCircle, AlertTriangle, X } from 'lucide-angular';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [LucideAngularModule],
  providers: [{ provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider({ CheckCircle, AlertTriangle, X }) }],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent {
  readonly notificationService = inject(NotificationService);
  readonly checkCircleIcon = CheckCircle;
  readonly alertTriangleIcon = AlertTriangle;
  readonly xIcon = X;
}
