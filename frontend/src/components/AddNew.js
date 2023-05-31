import '../index.css';
import { useSelector, useDispatch } from 'react-redux';
import { populateArray } from '../store/projects';
import { resetScreen } from '../store/screen';
import axios from 'axios';
import { useState } from 'react';

function AddNew() {
  // State variables
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [URL, setURL] = useState('');
  const [error, setError] = useState(false);

  // Redux Variables
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();

  // Async function to add a new project
  async function AddProject(e, title, description, URL) {
    e.preventDefault();

    // Generate a new ID for the project
    const existingIds = projects.map((project) => project.id);
    let newId = 1;

    // Find an ID that is not already used
    while (existingIds.includes(newId)) {
      newId++;
    }

    // Check if a project with the same title already exists
    for (let i = 0; i < projects.length; i++) {
      if (title === projects[i].title) {
        setError(true);
      }
    }

    // Encoding the parameter to handle special characters
    const encodedTitle = encodeURIComponent(title);
    const encodedDesc = encodeURIComponent(description);
    const encodedURL = encodeURIComponent(URL);

    try {
      // Send a POST request to the API to add the new project
      await axios.post(`/api/?id=${newId}&title=${encodedTitle}&description=${encodedDesc}&URL=${encodedURL}`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Retrieve updated project data from the API
      const response = await axios.get('/api');
      const data = response.data;

      // Dispatch an action to update the Redux store with the new project data
      dispatch(populateArray(data));

      // Reset the screen state
      dispatch(resetScreen());
    } catch (error) {
      console.log("Error", e);
    }

    // Clear input fields after adding the project
    setTitle('');
    setDescription('');
    setURL('');
  }

  return (
    <div className='flex flex-col'>
      {error && (
        // Display an error message if a project with the same title already exists
        <div className="h-30 alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Error! Task failed successfully.</span>
            <span>Please enter a project that doesn't already exist.</span>
          </div>
        </div>
      )}

      <form
        className="flex flex-col gap-3 m-10"
        type="submit"
        onSubmit={(e) => AddProject(e, title, description, URL)}
      >
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Project title..."
        />

        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Project description..."
        />

        <input
          type="text"
          onChange={(e) => setURL(e.target.value)}
          value={URL}
          placeholder="Project URL..."
        />

        <button className="btn" type="submit">
          Add Project
        </button>
      </form>
    </div>
  );
}

export default AddNew;
