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
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();

  async function AddProject(e, title, description, URL) {
    e.preventDefault();

    const existingIds = projects.map((project) => project.id);
    let newId = 1;

    while (existingIds.includes(newId)) {
      newId++;
    }

    try {
      await axios.post(`/api/?id=${newId}&title=${title}&description=${description}&URL=${URL}`);

      const response = await axios.get('/api');
      const data = response.data;
      dispatch(populateArray(data));
      dispatch(resetScreen());

    } catch (error) {
      if (error.response && error.response.data && error.response.data.showModal) {
        // Show modal with the error message
        setErrorModal(true);
        setErrorMessage(error.response.data.message);
      } else {
        console.log('Error:', error);
      }
    }

    setTitle('');
    setDescription('');
    setURL('');
  }

  return (
    <>
      {errorModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setErrorModal(false)}>
              &times;
            </span>
            <p>{errorMessage}</p>
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
    </>
  );
}

export default AddNew;
