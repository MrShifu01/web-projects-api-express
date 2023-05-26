import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
    const [projects, setProjects] = useState([])
    const [updatedTitle, setUpdatedTitle] = useState("")
    const [updatedDescription, setUpdatedDescription] = useState("")
    const [updatedURL, setUpdatedURL] = useState("")
    const [edit, setEdit] = useState(false)
    const [currentProject, setCurrentProject] = useState([])

    useEffect(() => {
        fetchProjects()
    })

    async function fetchProjects () {
        try {
            const response = await axios.get('/api')
            let data = await response.data
            setProjects(data)
        } catch (e) {
            console.log("fetch error")
        }
    }

    async function handleDelete (id) {
        try {
            await axios.delete(`api/?id=${id}`)
            fetchProjects()
        } catch (e) {
            console.log("delete error")
        }
    }

    async function handleUpdate(id, title, description, URL) {
        try {
            await axios.put(`api/?id=${id}&title=${updatedTitle || title}&description=${updatedDescription || description}&URL=${updatedURL || URL}&`)
            fetchProjects()
            setEdit(false)
            setCurrentProject(null)

        } catch (e) {
            console.log("update error")
        }
    }

  return (
    <>
        <div className='flex flex-col'>
            <div>Projects</div>

            {projects.map((project) => (
                <div key={project.id}>
                    
                    {/* Print Out the Projects */}
                    <h3 className='font-bold'>{project.title}</h3>
                    <p>{project.description}</p>
                    <p>{project.URL}</p>
                    
                    {/* Delete a project */}
                    <button 
                    className='btn'
                    onClick={() => handleDelete(project.id)}
                    >Delete</button>
                    
                    {/* Update a project */}
                    <button 
                    className='btn'
                    onClick={() => {
                        setEdit(prevEdit => !prevEdit)
                        setCurrentProject(project.id)
                    }}
                    >Edit</button>

                    {/* Update inputs */}
                    <form 
                    className={`flex flex-col gap-2 w-45 ${edit && currentProject === project.id ? 'block' : 'hidden'}`}
                    action="submit"
                    onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdate(project.id, project.title, project.description, project.URL)
                    }
                    }>
                        <input 
                        className='title'
                        type='text'
                        name='value'
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        placeholder='New Title'
                        value={updatedTitle || project.title}
                        />

                        <textarea 
                        className='description'
                        type='text'
                        name='value'
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        placeholder='New Description'
                        value={updatedDescription || project.description}
                        />

                        <input 
                        className='url'
                        type='text'
                        name='value'
                        onChange={(e) => setUpdatedURL(e.target.value)}
                        placeholder='New URL'
                        value={updatedURL || project.URL}
                        />

                        <button
                        className={`btn ${edit ? 'block' : 'hidden'}`}
                        onSubmit={() => handleUpdate()}
                        >Update</button>
                    </form>

                </div>
            ))}
        </div>
    </>
  )
}

export default App