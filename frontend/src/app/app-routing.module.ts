import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [

{
  path:'',
    redirectTo:'login',
    pathMatch:'full'
},
{
      path: 'login',
      loadChildren: ()=> import('./components/login/login.module').then(result => result.LoginModule)
    },
    {
      path:'dashboard',
      loadChildren: ()=> import('./components/dashboard/dashboard.module').then(result => result.DashboardModule)
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
