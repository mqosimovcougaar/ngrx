import { Routes } from '@angular/router';
import { authGuard } from "./auth";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then((home) => home.HOME_ROUTES),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'article',
    loadChildren: () => import('./articles/article/article.routes').then((m) => m.ARTICLE_ROUTES),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((c) => c.SettingsComponent),
  },
  {
    path: 'editor',
    loadChildren: () => import('./articles/article-edit/article-edit.routes').then((article) => article.ARTICLE_EDIT_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.routes').then((profile) => profile.PROFILE_ROUTES),
  },
];
