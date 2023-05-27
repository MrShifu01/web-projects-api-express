import '../index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { populateArray, resetArray } from '../store/projects'

function Mainscreen() {
    const projects = useSelector((state) => state.projects.projects)
    const dispatch = useDispatch()
    
    useEffect(() => {
        getProjects()
    })

    async function getProjects () {
        try {
            const response = await axios.get('/api') // Fetch from API
            const data = response.data
            dispatch(populateArray(data)) //Assign to Redux Store
        } catch (e) {
            console.log("Error", (e))
        }
    } 


  return (
    <div>
        {projects.map((project) =>(
            <div className='p-10 text-black' key={project.id}>
                <h2 className='text-xl font-bold'>{project.title}</h2>
                <p>{project.description}</p>
                <p className='underline'>{project.URL}</p>
                <div className='flex mt-3 gap-3'>
                    <button key={project.id} className='btn btn-sm'>Update</button>
                    <button key={project.id} className='btn btn-sm'>Delete</button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Mainscreen