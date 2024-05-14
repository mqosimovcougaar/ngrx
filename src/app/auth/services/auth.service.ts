import { ApiService } from '../../core/http-client';
import { UserResponse } from '../../core/api-types';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginUser,
  LoginUserRequest,
  NewUserRequest,
  NewUser,
} from '../../core/api-types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiService = inject(ApiService);

  user(): Observable<UserResponse> {
    return this.apiService.get<UserResponse>('/user');
  }

  login(credentials: LoginUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, LoginUserRequest>(
      '/users/login',
      { user: credentials }
    );
  }

  register(credentials: NewUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, NewUserRequest>('/users', {
      user: credentials,
    });
  }
}
