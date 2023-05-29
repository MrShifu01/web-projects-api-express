import '../index.css'
import { useSelector, useDispatch } from 'react-redux'
import { populateArray } from '../store/projects'
import { resetScreen } from '../store/screen'
import axios from 'axios'
import { useState} from 'react'

function AddNew() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [URL, setURL] = useState("")

  const projects = useSelector((state) => state.projects.projects)
  const dispatch = useDispatch()

  async function AddProject (e, title, description, URL) {
    e.preventDefault()

    const id = projects.length

    console.log(`${id}, ${title}, ${description}, ${URL}`)

    try {
      await axios.post(`/api/?id=${id}&title=${title}&description=${description}&URL=${URL}`)

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
      AddProject(e, title, description, URL)
    }>

      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Project title..."
      />

      <input
        type='text'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="Project description..."
      />

      <input
        type='text'
        onChange={(e) => setURL(e.target.value)}
        value={URL}
        placeholder="Project URL..."
      />

      <button 
      className='btn'
      type='submit'
      >
      Add Project</button>
    </form>

  </>
  )
}

export default AddNew