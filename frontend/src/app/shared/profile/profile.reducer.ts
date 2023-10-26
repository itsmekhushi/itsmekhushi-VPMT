import { createReducer, on } from '@ngrx/store';
import { UserProfile } from './profile.model';
import * as ProfileActions from './profile.action';

export interface ProfileState {
  userProfile: UserProfile | null;
  error: any;
}

const initialState: ProfileState = {
  userProfile: null,
  error: null
};

export const profileReducer = createReducer(
  initialState,
  on(ProfileActions.loadUserProfileSuccess, (state, { userProfile }) => {
    console.log('Profile Reducer: Load User Profile Success', state,"state",userProfile);
    return {
      ...state,
      userProfile,
      error: null,
    };
  }),
  on(ProfileActions.loadUserProfileFailure, (state, { error }) => {
    console.log('Profile Reducer: Load User Profile Failure', error);
    return {
      ...state,
      userProfile: null,
      error
    };
  })
);
