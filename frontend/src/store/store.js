import {configureStore} from '@reduxjs/toolkit'
import projectsReducer from './projects'
import screenReducer from './screen'

export default configureStore({
    reducer: {
        projects: projectsReducer,
        screen: screenReducer
    }
})