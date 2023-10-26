import { createAction, props } from '@ngrx/store';
import { UserProfile } from './profile.model';

export const loadUserProfile = createAction('[Profile] Load User Profile');

export const loadUserProfileSuccess = createAction(
  '[Profile] Load User Profile Success',
  props<{ userProfile: UserProfile }>()
);

export const loadUserProfileFailure = createAction(
  '[Profile] Load User Profile Failure',
  props<{ error: any }>()
);
export function userProfileLoaded(userProfileLoaded: any, arg1: (state: import("./profile.reducer").ProfileState, { profile }: any) => { userProfile: any; }): import("@ngrx/store").ReducerTypes<import("./profile.reducer").ProfileState, readonly import("@ngrx/store").ActionCreator[]> {
    throw new Error('Function not implemented.');
}

