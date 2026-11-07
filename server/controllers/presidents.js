const President = require('../models/President')

async function index(req, res){
    try{
        const presidents = await President.getAll()
        res.status(200).json(presidents)

    } catch(err){
        res.status(500).json({ error: err.message })

    }

}


async function show(req, res){
    try {
        let name = req.params.name
        const president = await President.getOneByPresidentName(name)
        res.status(200).json(president)

    } catch(err) {
        res.status(400).json({ error: err.message})

    }

}

async function create(req, res){
    try {
        const data = req.body
        const newPresident = await President.create(data)

        res.status(201).json(newPresident)

    } catch(err) {
        res.status(404).json({ error: err.message })

    }

}

async function destroy(req, res){
    try {
        const name = req.params.name
        const president = await President.getOneByPresidentName(name)
        const result = await president.destroy()
        res.status(204).end()
    } catch(err){
        res.status (404).json({ error: err.message })

    }
}

async function update(req, res){
    try { 
        const name = req.params.name
        const data = req.body
        const president = await President.getOneByPresidentName(name)
        const result = await president.update(data)

        res.status(200).send(result)
    } catch(err) {
        res.status(404).send({ error: err.message })
        
    }

}


module.exports = {index, show, create, destroy, update}