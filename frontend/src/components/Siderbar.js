import React from 'react'
import { useDispatch} from 'react-redux'
import { resetScreen, updateScreen } from '../store/screen'


function Siderbar() {
  const dispatch = useDispatch()
 
  const handleShow = (e) => {
    e.preventDefault()
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