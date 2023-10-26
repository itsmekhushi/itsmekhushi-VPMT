import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { ProjectsComponent } from './components/dashboard/projects/projects.component';
import { TicketsComponent } from './components/dashboard/tickets/tickets.component';
import { CreateProjectComponent } from './components/dashboard/create_projects/create-project/create-project.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TicketsService } from './service/ticket/tickets.service';
import { ProjectsService } from './service/project/projects.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatDialogModule } from '@angular/material/dialog';
import { NgxEditorModule } from "ngx-editor";
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateTicketComponent } from './components/dashboard/create-ticket/create-ticket.component';
import { MatSelectModule } from '@angular/material/select';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TokenInterceptorInterceptor } from './guard/token-interceptor.interceptor';
import { ProfileService } from './shared/top-nav/profile.service';
import { LoginPageComponent } from './components/login/login/login-page/login-page.component';
import { AuthGuard } from './guard/auth.guard';
import { NgToastModule } from 'ng-angular-popup';
import { CardDetailComponent } from './components/dashboard/drag_drop/card-detail/card-detail.component';
import { CommentComponent } from './components/dashboard/drag_drop/comment/comment.component';
import { DragDropComponent } from './components/dashboard/drag_drop/drag-drop/drag-drop.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommentService } from './service/comment/comment.service';
import { GetCardDataService } from './service/getCardTicketDetails/get-card-data.service';
import { GetTicketDataService } from './service/getTicketDataForDrag_Drop/get-ticket-data.service';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { AuthService } from './service/auth/auth.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartComponent } from './components/dashboard/chart/chart/chart.component';
import {MatRadioModule} from '@angular/material/radio';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { DeleteTicketComponent } from './update-ticket/delete-ticket/delete-ticket.component';
import { ViewProjectDetailComponent } from "./components/dashboard/view-project-detail/view-project-detail.component";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ConfirmationPopupComponent } from "./components/dashboard/confirmation-popup/confirmation-popup.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TopNavComponent } from './shared/top-nav/top-nav.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './shared/profile/profile.effects';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './shared/profile/profile.reducer';
import { ProjectEffects } from './components/dashboard/projects/project.effect';
import { proreducer } from './components/dashboard/projects/project.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    CreateTicketComponent,
    ProjectsComponent,
    TicketsComponent,
    CreateProjectComponent,
   LoginPageComponent,
   CardDetailComponent,
   CommentComponent,
   DragDropComponent,
   DashboardComponent,
   ChartComponent,
   TopNavComponent,
   SideNavComponent,
 FooterComponent,
   UpdateTicketComponent,
   DeleteTicketComponent,
   ViewProjectDetailComponent,
   ConfirmationPopupComponent



  ],
  imports: [
    
    BrowserModule,
    DragDropModule,
    MatRadioModule,
    MatProgressBarModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    NgxEditorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSortModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    NgToastModule,
    NgxUiLoaderModule,
   
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    RouterModule,
    EffectsModule.forRoot([ProfileEffects,ProjectEffects]),
    StoreModule.forFeature('profile', profileReducer),
    StoreModule.forFeature('project',proreducer),
    StoreDevtoolsModule.instrument(),

    
    
  ],
  providers: [AuthService,TicketsService, ProjectsService,ProfileService,CommentService,GetCardDataService,GetTicketDataService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorInterceptor,
    multi: true
  },AuthGuard,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
