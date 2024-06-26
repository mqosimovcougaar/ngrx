import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../core/api-types';
import { ApiService } from '../core/http-client';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly apiService = inject(ApiService);

  update(user: User): Observable<UserResponse> {
    return this.apiService.put<UserResponse, UserResponse>('/user', { user });
  }
}
