import { ActionsService } from '../../articles';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';

import { ProfileService } from '../profile.service';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { MockProvider } from 'ng-mocks';
import { ApiService } from '../../core/http-client';

describe('ProfileEffects', () => {
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [
        provideMockActions(() => actions$),
        ProfileService,
        MockProvider(ApiService),
        ActionsService,
      ],
    });
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions$ = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });
  });
});
