import express from 'express';
import fs from 'fs';

const router = express.Router();

function addProject(id, title, description, URL) {
  const projects = getProjects()

  const newProject = {
    "id": Number(id),
    "title": title,
    "description": description,
    "URL": URL
  }

  for (let i = 0; i < projects.length; i++) {
    if (id == projects[i].id || title == projects[i].title) {
      return
    }
  }

  projects.push(newProject)
  fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2))
}

function getProjects() {
  try {
    const projects = fs.readFileSync('projects.json', 'utf8');
    return JSON.parse(projects);
  } catch (e) {
    fs.writeFileSync('projects.json', '[]');
    return [];
  }
}

function updateProjects(id, title, description, URL) {
  try {
    const projects = JSON.parse(fs.readFileSync('projects.json'));
    for (let i = 0; i < projects.length; i++) {
      if (id === projects[i].id) {
        projects[i].title = title;
        projects[i].description = description;
        projects[i].URL = URL;
        break;
      }
    }

    fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2));
  } catch (e) {
    console.log('Error', e);
  }
}

function deleteProject(id) {
  try {
    const projects = getProjects()

    for (let i = 0; i < projects.length; i++) {
      if (id === projects[i].id) {
        projects.splice(i, 1)
      }
    }
  
    fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2));
  } catch (e) {
    console.log("Error", (e))
  }
}

router.post('/', (req, res) => {
  const id = req.query.id;
  const title = req.query.title;
  const description = req.query.description;
  const URL = req.query.URL;

  const projects = getProjects();

  for (let i = 0; i < projects.length; i++) {
    if (id === projects[i].id || title === projects[i].title) {
      return res.status(400).json({ error: "Id or Title already exists, choose another" });
    }
  }

  addProject(id, title, description, URL);
  res.send("Project Added");
});



router.get('/', (req, res) => {
  res.send(getProjects());
});

router.put('/', (req, res) => {
  const id = Number(req.query.id)
  const title = req.query.title
  const description = req.query.description
  const URL = req.query.URL

  const projects = getProjects();

  let projectExists = false;
  for (let i = 0; i < projects.length; i++) {
    if (id === projects[i].id) {
      projectExists = true;
      updateProjects(id, title, description, URL);
      break;
    }
  }

  if (projectExists) {
    res.send('Project Updated');
  } else {
    res.send('Project Does Not Exist');
  }
});

router.delete('/', (req, res) => {
  const id = Number(req.query.id)

  const projects = getProjects()

  for (let i = 0; i < projects.length; i++) {
    if (id === projects[i].id) {
      res.send("Project deleted")
      deleteProject(id)
      return
    }
  }
  
  res.send("Project couldn't be found")

})

export default router