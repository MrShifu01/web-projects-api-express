import express from 'express'
import fs from 'fs'
const app = express()
const PORT = process.env.PORT || 8000

// Function to get the projects.json information
function getProjects() {
    try {   
        const data = fs.readFileSync('projects.json')
        return JSON.parse(data)
    } catch(e) {
        fs.writeFileSync('projects.json', [])
        return []
    }
}

// Function to add a project to the list of web projects
function addProject(id, title, description, URL) {
    const newProject = {"id": id, "title": title, "description": description, "URL": URL}
    const projects = getProjects()
    projects.push(newProject)
    fs.writeFileSync('projects.json', JSON.stringify(projects,null, 2))
}

// Delete a porject
function deleteProject(id) {
    const projects = getProjects()
    for (let i = 0; i < projects.length; i++) {
      if (id === projects[i].id) {
        projects.splice(i, 1)
      }
    }
    fs.writeFileSync('projects.json', JSON.stringify(projects,null, 2))
}

// Updating the information of a project
function updateProject(id, title, description) {
    const projects = getProjects()
    for (let i = 0; i < projects.length; i++) {
        if (id === projects[i].id) {
          projects[i].title = title
          projects[i].description = description
        }
    }
    fs.writeFileSync('projects.json', JSON.stringify(projects,null, 2))
}

// Get all projects in the Array
app.get("/api", (req, res) => {
    const data = fs.readFileSync('projects.json')
    res.send(data)
    }
)

// Allow a user to add an additional project
app.post("/api", (req, res) => {
    const id = Number(req.query.id)
    const title = req.query.title
    const description = req.query.description
    const URL = req.query.URL
    const projects = getProjects()
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].title === title || projects[i].id === id ) {
            res.send("Title or ID already exists, please try a new ID or Title")
            return
        } else {
            continue
        }
    }
    addProject(id, title, description, URL)
    res.send("Project Added")
})

// Allow user to delete a project
app.delete("/api", (req, res) => {
    const id = Number(req.query.id)
    const projects = getProjects()
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

// Allow user to update a project
app.put("/api", (req, res) => {
    const id = Number(req.query.id)
    const title = req.query.title
    const description = req.query.description
    const projects = getProjects()
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === id ) {
            updateProject(id, title, description)
            res.send("Project Updated")
            return
        } else {
            continue
        }
    }
    res.send("Couldn't find that project")
})




app.listen(PORT, () => {
    console.log("Listening engaged")
})