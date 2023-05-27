import React from 'react'
import { useDispatch} from 'react-redux'
import { resetScreen, updateScreen } from '../store/screen'
import { populateArray } from '../store/projects'
import axios from 'axios'


function Siderbar() {
  const dispatch = useDispatch()
 
  async function handleShow (e) {
    e.preventDefault()
    const response = await axios.get("/api")
    const data = response.data
    dispatch(populateArray(data))
    dispatch(resetScreen())
  }

  const handleAdd = (e) => {
    e.preventDefault()
    dispatch(updateScreen("addNew"))
  }

  return (
    <div className='sidebar-container'>
        <div className='sidebar-content'>
            
            <h1 className='sidebar-title py-3 pb-6'>Projects</h1>
            
            <button 
            className='sidebar-buttons btn my-3'
            onClick={handleShow}
            >View All Projects</button>

            <button 
            className='sidebar-buttons btn my-3'
            onClick={handleAdd}
            >Add New Project</button>

        </div>
    </div>
  )
}

export default Siderbar