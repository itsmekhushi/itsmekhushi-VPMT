import { createAction, props } from '@ngrx/store';

export const loadProjects = createAction('[Project] Load Projects', props<{ page: number; pageSize: number; }>());
export const projectsLoaded = createAction('[Project] Projects Loaded', props<{projectPages: { [page: number]: any[] }, currentPage: number; pageSize: number, totalItems: number, data: [], totalPages: number }>());
export const loadProjectsFailure = createAction('[Project] Load Projects Failure', props<{ error: any }>());
export const loadNextPage = createAction('[Project] Load Next Page', props<{ page: number; pageSize: number }>());
export const projectsAlreadyLoaded = createAction('[Project] Projects Already Loaded');
export const updateProjectPage = createAction(
    '[Project] Update Project Page',
    props<{ page: number; projects: any[] }>()
  );