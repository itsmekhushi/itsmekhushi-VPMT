
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.reducer';

console.log('Profile Selector file'); 
export const selectProfileState = createFeatureSelector<ProfileState>('profile');
export const getUserProfile = createSelector(
  selectProfileState,
  (state: ProfileState) => state.userProfile
);
export const isUserProfileLoaded = createSelector(
  getUserProfile,
  (profile) => !!profile && !!profile.Data && profile.Data.length > 0
);

