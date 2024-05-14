import { Profile, ProfileResponse } from '../core/api-types';
import { ApiService } from '../core/http-client';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly apiService = inject(ApiService);

  getProfile(username: string): Observable<Profile> {
    return this.apiService
      .get<ProfileResponse>('/profiles/' + username)
      .pipe(map(data => data.profile));
  }
}
