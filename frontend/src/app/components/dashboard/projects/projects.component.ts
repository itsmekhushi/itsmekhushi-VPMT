
import { Component, OnInit,ViewChild,AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateProjectComponent } from '../../dashboard/create_projects/create-project/create-project.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from '../../../service/project/projects.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from 'src/app/shared/top-nav/profile.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ViewProjectDetailComponent } from '../view-project-detail/view-project-detail.component';

import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';
import {  Subscription, debounceTime, fromEvent, map, range, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectProjects, isProjectsLoaded, selectProjectPages } from './project.selector';
import { ProjectInterface } from '../create_projects/create-project/project';
import { loadProjects } from './project.action';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit,OnDestroy {

  displayedColumns: string[] = ['project_title', 'project_description', 'project_start_date', 'project_end_date', 'project_status', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  demo: any
  data: ProjectInterface[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;
  name!: any;
  user_data: any = []
  profile: any;
  item: any;
  searchQuery: string = '';
  currentPage!: number;
  currentPageData: any[] = [];
  pageSize!: number;
  pageIndex!: number;
  totalItems!: number;
  ProjectListSubscription$!: Subscription;
  constructor(private store: Store<any>, private profileService: ProfileService, public dialog: MatDialog, private projectService: ProjectsService, private _snackBar: MatSnackBar, private toast: NgToastService, private router: Router) {
    store
      .select(selectProjects)
      .subscribe((result: any) => {
        this.pageSize = result.pageSize;
        this.currentPage = result.pageIndex;
        console.log("constructorr:::: 53", result);
      });
  }
  ngOnInit(): void {
    this.store.pipe(select(isProjectsLoaded)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(loadProjects({ page: this.currentPage, pageSize: this.pageSize }));
        
      } else {
        console.log("data from store",loadProjects({ page: this.currentPage, pageSize: this.pageSize }))
       this.getAllDetail()
    }
  });
    if (this.paginator) {
      this.getAllDetail();
    } else {
      console.warn('Paginator is not available.....');
      setTimeout(() => this.getAllDetail(), 500);
    }
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      // Set the paginator length only if it's defined
      if (this.totalItems) {
        this.paginator.length = this.totalItems;
      }
      this.dataSource.paginator = this.paginator;
      this.getAllDetail();
  
      const search = fromEvent<any>(this.input.nativeElement, 'keyup').pipe(
        map(event => event.target.value),
        debounceTime(1000)
      );
      search.subscribe(res => {
        this.searchData();
      });
    } else {
      console.warn('Paginator is not available yet. Retrying in 500ms...');
      setTimeout(() => this.ngAfterViewInit(), 500)
    }
  }
  
  getAllDetail(): void {
    this.ProjectListSubscription$=this.store.pipe(select(selectProjects)).subscribe({
      next: (res: any) => {
        if(res.data.length){
        console.log("res:::::",res.projectPages);
        this.data = res.data;
        this.dataSource = new MatTableDataSource(res.data)
        this.totalItems = res.totalItems;
        this.dataSource.data = this.data;
        this.paginator.length = res.totalItems
        }
        
      }
    });
  }
  onPageChange(pageEvent: PageEvent): void {
    const targetPage = pageEvent.pageIndex + 1;
    console.log('Page change event. Target Page:', targetPage);
    range(1, targetPage).subscribe((page: number) => {
      this.store.pipe(
        select(selectProjectPages(page)),
        take(1)
      ).subscribe((projects: any[]) => {
        console.log('Projects for page', page, ':', projects)
        const flattenedProjects = projects.reduce((acc, val) => acc.concat(val), []);
        this.dataSource = new MatTableDataSource(flattenedProjects);
      });
    });
  
    console.log('Dispatching loadProjects action...');
    this.store.dispatch(loadProjects({ page: targetPage, pageSize: pageEvent.pageSize }));
  }
  
  
  
  
  
  
  
  openDialog() {
    if (this.user_data.user_designation_id == '6440d052720ef86d7da6b4af') {
      const dialogref = this.dialog.open(CreateProjectComponent, {
        data: {
          user_id: this.user_data._id,
          user_name: this.user_data.user_name
        },
        width: "80%",
        height: "80%"
      });

      dialogref.afterClosed().subscribe({
        next: (result) => {
          let newProject = result.Data
          this.data.unshift(newProject)
          this.dataSource = new MatTableDataSource(this.data);
        }

      })
    }
    else {
      this.toast.info({ detail: "Message", summary: "You don't have right to create project", duration: 2000 });
    }
  }

  project_id: any
  projectData(element: any) {
    this.project_id = element._id;
  }
  searchData() {
    this.projectService.searchProject(this.paginator.pageIndex + 1, this.paginator.pageSize, this.searchQuery)
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.data = res.data;
          this.paginator.length = res.totalItems;
          if ((this.data.length - 1) == 0) {
            this.toast.success({ detail: "Message", summary: "Oops!!!There is no project for you", duration: 2000 });
          }
        },
        error: (err) => {
         
          this.toast.error({ detail: "Message", summary: "Error while fetching data", duration: 2000 });
        }
      })
  }

  openDialogConfirmation(project_Id: number) {
   

    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: {
        message: "Are you sure you want to delete project?",
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.projectService.deleteProject({ "project_Id": project_Id }).subscribe({
          next: (res) => {
            this.toast.success({ detail: "Sucess Message", summary: "Deleted Successfully", duration: 2000 });
           
          },
          error: (err) => {
           
            this.toast.success({ detail: "Error", summary: "Error while deleting", duration: 2000 });
          }
        })
      }
    });
  }

  openCard(project: any) {
    
     this.dialog.open(ViewProjectDetailComponent, {
      data: {
        project_id: project
      },
      height: "83%",
      width: "70%"
    });
  }
  ngOnDestroy(): void {
    if (this.ProjectListSubscription$)
      this.ProjectListSubscription$.unsubscribe();
  }
}





