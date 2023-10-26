import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './profile/profile.reducer';
@NgModule({
  imports: [RouterModule,
    StoreModule.forRoot(profileReducer),
  CommonModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ProfileComponent
   
  
  ]
})
export class SharedModule { }
