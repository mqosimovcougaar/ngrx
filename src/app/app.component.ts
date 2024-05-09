import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from "@ngrx/store";
import { authActions, LocalStorageJwtService, selectLoggedIn, selectUser } from "./auth";
import { Observable, take } from "rxjs";
import { filter } from "rxjs/operators";
import { AsyncPipe } from "@angular/common";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { User } from "./core/api-types";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly localStorageJwtService: LocalStorageJwtService = inject(LocalStorageJwtService);

  user$: Observable<User> = this.store.select(selectUser);
  isLoggedIn$: Observable<boolean> = this.store.select(selectLoggedIn);

  ngOnInit() {
    this.localStorageJwtService
      .getItem()
      .pipe(
        take(1),
        filter(Boolean),
      )
      .subscribe(() => this.store.dispatch(authActions.getUser()));
  }
}
