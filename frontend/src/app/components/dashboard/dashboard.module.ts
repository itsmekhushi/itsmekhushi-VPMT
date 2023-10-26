import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { TicketsComponent } from './tickets/tickets.component';
import { DragDropComponent } from './drag_drop/drag-drop/drag-drop.component';

import { DashboardComponent } from '../dashboard/dashboard.component';

import { AuthGuard } from 'src/app/guard/auth.guard';
import { ProfileComponent } from 'src/app/shared/profile/profile.component';
import { ImageComponent } from './image/image.component';


const routes: Routes =[
{
  path:'',component:DashboardComponent,canActivate:[AuthGuard]
},
{
path:'profile',component:ProfileComponent,canActivate:[AuthGuard]
},
{
      path:'project',canActivate:[AuthGuard],
  
      children:[
  
        {path:'',component:ProjectsComponent,canActivate:[AuthGuard]},
        {
          path:':project_id',canActivate:[AuthGuard],
  
        children:[
  
          {path:'',component:DragDropComponent,canActivate:[AuthGuard]}, 
          
          {path:'ticket',component:TicketsComponent},
        ],
      },
  
    ]
  },


]

@NgModule({
 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
   
  
  
    ImageComponent
  ]
})
export class DashboardModule { }
