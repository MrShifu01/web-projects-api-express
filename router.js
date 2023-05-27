import express from 'express'
import fs from 'fs'
const router = express.Router()

function getProjects () {
    try {
        const projects = fs.readFileSync('projects.json')
        return projects
    } catch (e) {
        fs.writeFileSync('projects.json', [])
        return []
    }
}


router.get("/api", (req, res) => {
    res.send(getProjects())
})

export default router