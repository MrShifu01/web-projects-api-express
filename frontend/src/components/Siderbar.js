import React from 'react';
import { useDispatch } from 'react-redux';
import { resetScreen, updateScreen } from '../store/screen';
import { populateArray } from '../store/projects';
import axios from 'axios';

function Siderbar() {
  const dispatch = useDispatch();

  // Handle the click event to show all projects
  async function handleShow(e) {
    e.preventDefault();
    const response = await axios.get("/api"); // Fetch projects from the API
    const data = response.data;
    dispatch(populateArray(data)); // Update the Redux store with the fetched projects
    dispatch(resetScreen()); // Reset the screen state
  }

  // Handle the click event to add a new project
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(updateScreen("addNew")); // Update the screen state to show the add new project form
  };

  return (
    <div className='sidebar-container'>
      <div className='sidebar-content'>
        <h1 className='sidebar-title py-3 pb-6'>Projects</h1>

        <button
          className='sidebar-buttons btn my-3'
          onClick={handleShow}
        >
          View All Projects
        </button>

        <button
          className='sidebar-buttons btn my-3'
          onClick={handleAdd}
        >
          Add New Project
        </button>
      </div>
    </div>
  );
}

export default Siderbar;
