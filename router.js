import express from 'express';
import fs from 'fs';

const router = express.Router();

// Add a new project to the projects.json file
function addProject(id, title, description, URL) {
  const projects = getProjects()

  const newProject = {
    "id": Number(id),
    "title": title,
    "description": description,
    "URL": URL
  }

  // Check if the project with the given id or title already exists
  for (let i = 0; i < projects.length; i++) {
    if (id == projects[i].id || title == projects[i].title) {
      return
    }
  }

  // Push the new project to the projects array and write it to the projects.json file
  projects.push(newProject)
  fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2))
}

// Get the projects from the projects.json file
function getProjects() {
  try {
    const projects = fs.readFileSync('projects.json', 'utf8');
    return JSON.parse(projects);
  } catch (e) {
    // If the file doesn't exist, create an empty array and write it to the projects.json file
    fs.writeFileSync('projects.json', '[]');
    return [];
  }
}

// Update an existing project in the projects.json file
function updateProjects(id, title, description, URL) {
  try {
    const projects = JSON.parse(fs.readFileSync('projects.json'));

    // Find the project with the given id and update its properties
    for (let i = 0; i < projects.length; i++) {
      if (id === projects[i].id) {
        projects[i].title = title;
        projects[i].description = description;
        projects[i].URL = URL;
        break;
      }
    }

    // Write the updated projects array to the projects.json file
    fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2));
  } catch (e) {
    console.log('Error', e);
  }
}

// Delete a project from the projects.json file
function deleteProject(id) {
  try {
    const projects = getProjects()

    // Find the project with the given id and remove it from the projects array
    for (let i = 0; i < projects.length; i++) {
      if (id === projects[i].id) {
        projects.splice(i, 1)
      }
    }
  
    // Write the updated projects array to the projects.json file
    fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2));
  } catch (e) {
    console.log("Error", (e))
  }
}

// Handle the HTTP POST request to add a new project
router.post('/', (req, res) => {
  const id = req.query.id;
  const title = req.query.title;
  const description = req.query.description;
  const URL = req.query.URL;

  const projects = getProjects();

  // Check if the project with the given id or title already exists
  for (let i = 0; i < projects.length; i++) {
    if (id === projects[i].id || title === projects[i].title) {
      return res.status(400).json({ error: "Id or Title already exists, choose another" });
    }
  }

  // Add the new project and send a success response
  addProject(id, title, description, URL);
  res.send("Project Added");
});

// Handle the HTTP GET request to get all projects
router.get('/', (req, res) => {
  res.send(getProjects());
});

// Handle the HTTP PUT request to update an existing project
router.put('/', (req, res) => {
  const id = Number(req.query.id)
  const title = req.query.title
  const description = req.query.description
  const URL = req.query.URL

  const projects = getProjects();

  let projectExists = false;
  // Find the project with the given id and update its properties
  for (let i = 0; i < projects.length; i++) {
    if (id === projects[i].id) {
      projectExists = true;
      updateProjects(id, title, description, URL);
      break;
    }
  }

  // Send an appropriate response based on whether the project was found and updated
  if (projectExists) {
    res.send('Project Updated');
  } else {
    res.send('Project Does Not Exist');
  }
});

// Handle the HTTP DELETE request to delete a project
router.delete('/', (req, res) => {
  const id = Number(req.query.id)

  const projects = getProjects()

  // Find the project with the given id and delete it
  for (let i = 0; i < projects.length; i++) {
    if (id === projects[i].id) {
      res.send("Project deleted")
      deleteProject(id)
      return
    }
  }
  
  res.send("Project couldn't be found")
})

export default router;
