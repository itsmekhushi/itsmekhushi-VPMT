import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProfileService } from '../top-nav/profile.service';
import * as ProfileActions from './profile.action';

@Injectable()
export class ProfileEffects {

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}

  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadUserProfile),
      switchMap(() =>
        this.profileService.getUser().pipe(
          map(userProfile => ProfileActions.loadUserProfileSuccess({ userProfile })),
          catchError(error => of(ProfileActions.loadUserProfileFailure({ error })))
        )
      )
    )
  );
}
