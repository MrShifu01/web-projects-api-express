import '../index.css';
import { useSelector, useDispatch } from 'react-redux';
import { populateArray } from '../store/projects';
import { resetScreen } from '../store/screen';
import axios from 'axios';
import { useState } from 'react';

function AddNew() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [URL, setURL] = useState('');
  const [error, setError] = useState(false);

  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();

  async function AddProject(e, title, description, URL) {
    e.preventDefault();

    const existingIds = projects.map((project) => project.id);
    let newId = 1;

    while (existingIds.includes(newId)) {
      newId++;
    }

    for (let i = 0; i < projects.length; i++) {
      if (title === projects[i].title) {
        setError(true)
      }
    }

    try {
      await axios.post(`/api/?id=${newId}&title=${title}&description=${description}&URL=${URL}`);

      const response = await axios.get('/api');
      const data = response.data;
      dispatch(populateArray(data));
      dispatch(resetScreen());

    } catch (error) {
      console.log("Error", e)
    }

    setTitle('');
    setDescription('');
    setURL('');
  }

  return (
    <div className='flex flex-col'>
      {error && (
        <div className="h-30 alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Error! Task failed successfully.</span>
            <span>Please enter a project that doesn't already exists</span>
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
