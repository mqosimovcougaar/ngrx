import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { articleListEffects, articleListFeature } from '../articles';
import { ArticleListComponent } from '../articles/article-list/article-list.component';
import { authGuard } from '../auth';
import {
  profileArticlesResolver,
  profileEffects,
  profileFavoritesResolver,
  profileFeature,
  profileResolver,
} from '../profile';
import { ProfileComponent } from './profile.component';

export const PROFILE_ROUTES: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    providers: [
      provideState(profileFeature),
      provideState(articleListFeature),
      provideEffects(profileEffects, articleListEffects),
    ],
    resolve: { profileResolver },
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ArticleListComponent,
        resolve: { profileArticlesResolver },
      },
      {
        path: 'favorites',
        component: ArticleListComponent,
        resolve: { profileFavoritesResolver },
      },
    ],
  },
];
