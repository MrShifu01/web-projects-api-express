import '../index.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { populateArray } from '../store/projects';
import { assignProjectId } from '../store/update';
import { updateScreen } from '../store/screen';

function Mainscreen() {
  // Redux variables
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    getProjects();
  });

  // Fetch projects from the API and update the Redux store
  async function getProjects() {
    try {
      const response = await axios.get('/api');
      const data = response.data;
      dispatch(populateArray(data));
    } catch (e) {
      console.log("Error", e);
    }
  }

  // Handle the update button click event
  function handleUpdate(e, projectId) {
    e.preventDefault();
    dispatch(assignProjectId(projectId));
    dispatch(updateScreen('update'));
  }

  // Handle the delete button click event
  async function handleDelete(e, projectId) {
    e.preventDefault();
    try {
      await axios.delete(`/api/?id=${projectId}`);
    } catch (e) {
      console.log("Error", e);
    }
  }

  return (
    <div>
      {/* Render each project */}
      {projects.map((project) => (
        <div className='p-10 text-black' key={project.id}>
          <h2 className='text-xl font-bold'>{project.title}</h2>
          <p>{project.description}</p>
          <p className='underline'>{project.URL}</p>
          <div className='flex mt-3 gap-3'>
            <button
              className='btn btn-sm'
              onClick={(e) => handleUpdate(e, project.id)}
            >
              Update
            </button>

            <button
              className='btn btn-sm'
              onClick={(e) => handleDelete(e, project.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Mainscreen;
