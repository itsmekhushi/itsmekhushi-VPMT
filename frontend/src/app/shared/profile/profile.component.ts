
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadUserProfile, loadUserProfileSuccess } from '../profile/profile.action';
import { getUserProfile, isUserProfileLoaded } from '../profile/profile.selector';
import { Observable } from 'rxjs';
import { UserProfile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile$: Observable<UserProfile | null>;
  username: string | undefined;
  user: UserProfile | null = null;
  constructor(private store: Store) {
    this.profile$ = this.store.pipe(select(getUserProfile));
  }

  ngOnInit(): void {
    console.log('Profile Component: ngOnInit');

   
    this.store.pipe(select(isUserProfileLoaded)).subscribe((loaded) => {
      if (!loaded) {
        this.store.dispatch(loadUserProfile());
      }
    });

    this.getUserProfile();
  }

  getUserProfile() {
        this.profile$.subscribe((userProfile) => {
          console.log('User Profile:', userProfile);
    
          if (userProfile) {
            this.user = Array.isArray(userProfile.Data) ? userProfile.Data[0] : userProfile.Data;
          }
        });
      }

}

