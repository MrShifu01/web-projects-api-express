import '../index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { resetScreen } from '../store/screen'
import { populateArray } from '../store/projects'
import axios from 'axios'


function Update() {
  const [updateInfo, setUpdateInfo] = useState([])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [URL, setURL] = useState("")

  const currentId = useSelector((state) => state.update.projectId)
  const projects = useSelector((state) => state.projects.projects)
  const dispatch = useDispatch()

  useEffect(() => {
    currentProject()
  })
  
  const currentProject = () => {
    for (let i = 0; i < projects.length; i++) {
      if (currentId === projects[i].id) {
        setUpdateInfo(projects[i])
        return
      }
    }
    return {}
  }

  async function handleUpdate (e, title, description, URL) {
    e.preventDefault()

    const updatedId = updateInfo.id
    const updatedTitle = title || updateInfo.title
    const updatedDescription = description || updateInfo.description
    const updatedURL =  URL || updateInfo.URL

    try {
      await axios.put(`/api/?id=${updatedId}&title=${updatedTitle}&description=${updatedDescription}&URL=${updatedURL}`)
      
      const response = await axios.get("/api")
      const data = response.data
      dispatch(populateArray(data))
      dispatch(resetScreen())

    } catch (e) {
      console.log("Error", (e))
    }

    setTitle("")
    setDescription("")
    setURL("")
    
 
  }

  return (
    <>
      <form
      className='flex flex-col gap-3 m-10'
      type="submit"
      onSubmit={(e) => 
        handleUpdate(e, title, description, URL)
      }>

        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder={updateInfo.title}
        />

        <input
          type='text'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder={updateInfo.description}
        />

        <input
          type='text'
          onChange={(e) => setURL(e.target.value)}
          value={URL}
          placeholder={updateInfo.URL}
        />

        <button 
        className='btn'
        type='submit'
        >
        Update</button>
      </form>

    </>
    )
    
}

export default Update