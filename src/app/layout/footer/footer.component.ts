import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { APP_VERSION } from '../../core/http-client';

@Component({
  selector: 'cdt-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly app_version = inject(APP_VERSION);
}
