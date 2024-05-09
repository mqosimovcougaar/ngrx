import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { selectUser } from '../auth';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { profileActions, selectProfileState } from '../profile';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'cdt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private readonly store = inject(Store);

  profile$ = this.store.select(selectProfileState);
  currentUser$ = this.store.select(selectUser);
  isUser$: Subject<boolean> = new Subject();
  following!: boolean;
  username!: string;

  ngOnInit() {
    combineLatest([this.profile$, this.currentUser$])
      .pipe(
        tap(([p]) => {
          this.username = p.username;
          this.following = p.following;
        }),
        map(([p, u]) => p.username === u.username),
        untilDestroyed(this),
      )
      .subscribe((isUser) => this.isUser$.next(isUser));
  }

  toggleFollowing() {
    if (this.following) {
      this.store.dispatch(profileActions.unfollow({ id: this.username }));
    } else {
      this.store.dispatch(profileActions.follow({ id: this.username }));
    }
  }
}
