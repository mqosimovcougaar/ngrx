import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  articleListInitialState,
  articleListQuery,
  articleListActions,
  ListType,
} from '../articles';
import { selectLoggedIn } from '../auth';
import { CommonModule } from '@angular/common';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ArticleListComponent } from '../articles/article-list/article-list.component';
import { HomeStoreService } from './home.store';
import { provideComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";

@UntilDestroy()
@Component({
  selector: 'cdt-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, TagsListComponent, ArticleListComponent],
  providers: [provideComponentStore(HomeStoreService)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly homeStore = inject(HomeStoreService);

  listConfig$ = this.store.select(articleListQuery.selectListConfig);
  tags$: Observable<string[]> = this.homeStore.tags$;
  isAuthenticated = false;

  ngOnInit() {
    this.store
      .select(selectLoggedIn)
      .pipe(untilDestroyed(this))
      .subscribe((isLoggedIn) => {
        this.isAuthenticated = isLoggedIn;
        this.getArticles();
      });
  }

  setListTo(type: ListType = 'ALL') {
    this.store.dispatch(articleListActions.setListConfig({ config: { ...articleListInitialState.listConfig, type } }));
  }

  getArticles() {
    if (this.isAuthenticated) {
      this.setListTo('FEED');
    } else {
      this.setListTo('ALL');
    }
  }

  setListTag(tag: string) {
    this.store.dispatch(
      articleListActions.setListConfig({
        config: {
          ...articleListInitialState.listConfig,
          filters: {
            ...articleListInitialState.listConfig.filters,
            tag,
          },
        },
      }),
    );
  }
}
