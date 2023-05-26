import express from 'express';
import fs from 'fs';

const router = express.Router();

// SERVER FUNCTIONS *********************************************************************
// fetch function
function fetchProjects() {
  try {
    const data = fs.readFileSync('projects.json');
    return JSON.parse(data);
  } catch (e) {
    fs.writeFileSync('projects.json', '[]');
    return [];
  }
}

// post function
function postProject(id, title, description, URL) {
  // getting the projects
  const projects = fetchProjects();

  // adding the new project to projects
  projects.push({
    id: id,
    title: title,
    description: description,
    URL: URL
  });

  // Updating the JSON file
  fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2));
}

// delete function
function deleteProject(id) {
  const projects = fetchProjects()
  for (let i = 0; i < projects.length; i++) {
    if (id === projects[i].id) {
      projects.splice(i, 1)
    }
  }
  fs.writeFileSync('projects.json', JSON.stringify(projects,null, 2))
}

// update function
function updateProject(id, title, description) {
  const projects = fetchProjects()
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) {
      projects[i].title = title
      projects[i].description = description
    }
  }
  fs.writeFileSync('projects.json', JSON.stringify(projects,null, 2))
}

// SERVER ROUTES ************************************************************************
// fetch route
router.get('/api', (req, res) => {
  const projects = fetchProjects();
  res.send(projects);
});

// post route
router.post('/api', (req, res) => {
  // assigning the query variables
  const id = Number(req.query.id);
  const title = req.query.title;
  const description = req.query.description;
  const URL = req.query.URL;
  
  // fetching all the projects
  const projects = fetchProjects();

  // looping through them all to see if a project already exists
  for (let i = 0; i < projects.length; i++) {
    if (id === projects[i].id || title === projects[i].title) {
      return res.send('Project ID or TITLE already exists');
    }
  }
  
  // calling the Post Projects function to update the JSON file
  postProject(id, title, description, URL);
  res.send('New project added!');
});

// delete route
router.delete("/api", (req, res) => {
  const id = Number(req.query.id)
  const projects = fetchProjects()
  for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === id ) {
          deleteProject(id)
          res.send("Project Deleted")
          return
      } else {
          continue
      }
  }
  res.send("Couldn't find that project")
})

// put route
router.put("/api", (req, res) => {
  const id = Number(req.query.id)
  const title = req.query.title
  const description = req.query.description
  const projects = fetchProjects()
  for (let i = 0; i < projects.length; i++) {
    if (id === projects[i].id) {
      updateProject(id, title, description)
      res.send("project updated")
      return
    } 
  }
  res.send("Couldn't find that project")
})


export default router;
