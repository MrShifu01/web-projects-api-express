import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projects';
import screenReducer from './screen';
import updateReducer from './update';

// Configure the Redux store
export default configureStore({
  reducer: {
    // Register the projectsReducer under the "projects" slice
    projects: projectsReducer,
    // Register the screenReducer under the "screen" slice
    screen: screenReducer,
    // Register the updateReducer under the "update" slice
    update: updateReducer,
  },
});
