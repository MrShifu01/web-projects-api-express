import {configureStore} from '@reduxjs/toolkit'
import projectsReducer from './projects'
import screenReducer from './screen'
import updateReducer from './update'

export default configureStore({
    reducer: {
        projects: projectsReducer,
        screen: screenReducer,
        update: updateReducer
    }
})