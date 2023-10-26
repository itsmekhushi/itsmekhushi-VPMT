import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as ProjectActions from './project.action';
import { ProjectsService } from '../../../service/project/projects.service';
import { selectProjects } from './project.selector';
import { ProjectState } from './project.reducer';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectsService,
    private store: Store<ProjectState>
  ) {}

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      withLatestFrom(this.store.pipe(select(selectProjects))),
      switchMap(([action, state]) => {
        const { page, pageSize } = action;
        const currentPageProjects = state.projectPages[page];

        if (currentPageProjects && currentPageProjects.length) {
          return of(ProjectActions.projectsAlreadyLoaded());
        } else {
          // Projects for this page are not loaded, make the API call
          return this.projectService.getProject(page, pageSize).pipe(
            switchMap(projects => {
              const totalPages = Math.ceil(projects.totalItems / pageSize);
              const updatedProjects = {
                data: projects.data,
                totalItems: projects.totalItems,
                currentPage: page,
                pageSize,
                totalPages,
              };

              // Dispatch action to update project pages in the store
              return of(
                ProjectActions.projectsLoaded({
                  ...updatedProjects,
                  projectPages: {}
                }),
                ProjectActions.updateProjectPage({
                  page,
                  projects: projects.data,
                })
              );
            }),
            catchError(error => of(ProjectActions.loadProjectsFailure({ error })))
          );
        }
      })
    )
  );

  loadNextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadNextPage),
      withLatestFrom(this.store.pipe(select(selectProjects))),
      switchMap(([action, state]) => {
        const { page, pageSize } = action;
        const currentPage = state.currentPage + 1;
        const currentPageProjects = state.projectPages[currentPage];

        if (currentPageProjects && currentPageProjects.length) {
          return of(ProjectActions.projectsAlreadyLoaded());
        } else {
          return this.projectService.getProject(currentPage, pageSize).pipe(
            switchMap(projects => {
              const totalPages = Math.ceil(projects.totalItems / pageSize);
              const updatedProjects = {
                data: projects.data,
                totalItems: projects.totalItems,
                currentPage,
                pageSize,
                totalPages,
              };

              return of(
                ProjectActions.projectsLoaded({
                  ...updatedProjects,
                  projectPages: {}
                }),
                ProjectActions.updateProjectPage({
                  page: currentPage,
                  projects: projects.data,
                })
              );
            }),
            catchError(error => of(ProjectActions.loadProjectsFailure({ error })))
          );
        }
      })
    )
  );
}
