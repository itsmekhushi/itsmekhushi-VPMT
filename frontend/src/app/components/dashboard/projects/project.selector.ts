import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.reducer';

export const selectProjectState = createFeatureSelector<ProjectState>('project');

export const selectProjects = createSelector(
  selectProjectState,
  (state: ProjectState) => state
);

export const selectPageSize = createSelector(
  selectProjectState,
  (state: ProjectState) => state.pageSize
);

// export const selectTotalItems = createSelector(
//   selectProjectState,
//   (state: ProjectState) => state.totalItems
// );
export const isProjectsLoaded = createSelector(
  selectProjects,
  (project) => project.loaded
);
function selectFeature(state: unknown) {
  throw new Error('Function not implemented.');
}

export const selectProjectPages = (page: number) =>
  createSelector(
    selectProjectState,
    (state: ProjectState) => {
      return state.projectPages[page] || [];
    }
  );
