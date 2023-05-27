import express from 'express';
import fs from 'fs';

const router = express.Router();

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

export default router