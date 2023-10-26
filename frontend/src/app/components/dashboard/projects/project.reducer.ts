import { createReducer, on} from '@ngrx/store';
import { ProjectInterface } from '../create_projects/create-project/project';
import * as ProjectActions from './project.action';


export interface ProjectState {
  [key: number]: any;
  pageIndex: number;
  currentPage: number,
   pageSize: any ,
   totalItems:number,
   data:ProjectInterface[],
   totalPages:number,
   loaded: boolean,
   projectPages: { [page: number]: any[] };
}

const initialState: ProjectState = {
  projectPages: {},
  data: [],
  pageSize: 5, 
  totalPages: 0, 
  totalItems: 0 ,
  currentPage:1,
  loaded:false,
  pageIndex:1
};


export const proreducer = createReducer(
  initialState,
  on(ProjectActions.projectsLoaded, (state, action) => {
    console.log('Project Reducer: state', state,"action",action);
    const updatedPages = {
      ...state.projectPages,
      [action.currentPage]: action.data,
    };
    const data = { ...state,
      pageIndex: action.currentPage,
      loaded:true,
      projectPages: updatedPages,
      data:action.data,
      totalItems: action.totalItems,
      currentPage:action.currentPage,
      pageSize:action.pageSize,
      totalPages:action.totalPages,}
      console.log("after :::>",data);
      
    return data
  }),
  
  on(ProjectActions.loadProjectsFailure, (state, { error }) => {
    console.log('Profile Reducer: Load User Profile Failure', error);
    return {
      ...state,
      error
    };
  })
);