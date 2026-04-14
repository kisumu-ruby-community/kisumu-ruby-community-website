import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent {
  readonly notificationService = inject(NotificationService);
}