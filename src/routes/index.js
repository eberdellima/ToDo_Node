const TodoItems = require('../models/todo.model')
const express = require('express')
const router = express.Router()
const { logError } = require('zippy-logger')

router.get('/', async (req, res) => {
    try{
        const items = await TodoItems.find({is_deleted: false}).catch( err => { 
            logError({message: err, path: "get: /"})
            res.status(500).send('An error occurred...')
        })
        const doneItems = items.filter(item => item.is_done)
        const notDoneItems = items.filter(item => !item.is_done)
        res.render('home', { doneItems: doneItems, notDoneItems: notDoneItems})
    } catch(err) {
        logError({message: err, path: "/"})
        res.status(500).send('An error occurred...')
    }
})

router.post('/', async (req, res) => {
    const text = req.body["new-todo"]
    if(!text){
        res.status(400).send('No text received...')
    }
    const newItem = new TodoItems({
        text: text,
        is_deleted: false,
        is_done: false
    })
    try {
        const savedItem = await newItem.save().catch( err => {
            logError({message: err, path: "post: /"})
            res.status(500).send('An error occurred...')
        })
        if(!savedItem){
            res.status(500).send('An error occurred...')
        }
        res.redirect('/')
    } catch(err) {
        logError({message: err, path: "post: /"})
        res.status(500).send('An error occurred...')
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const item = await TodoItems.findOne({_id: id, is_deleted: false}).catch( err => { 
            logError({message: err, path: "patch: /:id"})
            res.status(500).send('An error occurred...')
        })
        if(!item) {
            res.status(404).send('Items not found...')
        }
        item.is_done = true
        const savedItem = await item.save().catch( err => { 
            logError({message: err, path: "patch: /:id"})
            res.status(500).send('An error occurred...')
        })
        if(!savedItem) {
            res.status(500).send('An error occurred...')
        }
        res.redirect('/')
    } catch(err) {
        logError({message: err, path: "patch: /:id"})
        res.status(500).send('An error occurred...')
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const item = await TodoItems.findOne({_id: id, is_deleted: false}).catch( err => { 
            logError({message: err, path: "delete: /:id"})
            res.status(500).send('An error occurred...')
        })
        if(!item) {
            res.status(404).send('Item not found...')
        }
        item.is_deleted = true
        const savedItem = await item.save().catch( err => { 
            logError({message: err, path: "delete: /:id"})
            res.status(500).send('An error occurred...')
        })
        if(!savedItem) {
            res.status(500).send('An error occurred...')
        }
        res.redirect('/')
    } catch(err) {
        logError({message: err, path: "delete: /:id"})
        res.status(500).send('An error occurred...')
    }
})

module.exports = router