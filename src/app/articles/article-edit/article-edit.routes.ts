import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { articleEditEffects, articleFeature } from '../../articles';
import { authGuard } from '../../auth';
import { ArticleEditComponent } from './article-edit.component';
import { articleEditResolver } from './resolvers/article-edit-resolver';

export const ARTICLE_EDIT_ROUTES: Routes = [
  {
    path: '',
    component: ArticleEditComponent,
    providers: [
      provideState(articleFeature),
      provideEffects(articleEditEffects),
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ArticleEditComponent,
        canActivate: [authGuard],
      },
      {
        path: ':slug',
        component: ArticleEditComponent,
        resolve: { articleEditResolver },
      },
    ],
  },
];
