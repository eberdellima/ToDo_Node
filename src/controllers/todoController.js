const { logError } = require('zippy-logger');
const TodoManager = require('../services/todoManager');

class TodoController {

  static async list(request, response) {
      try{
        const { doneItems, notDoneItems} = await TodoManager.getAllItems();
        response.render('home', { doneItems, notDoneItems });
    } catch(err) {
        logError({message: err, path: "/"})
        response.status(500).send('An error occurred...')
    }
  }

  static async add(request, response) {
    const text = request.body["new-todo"]
    
    if(!text){
      response.status(400).send('No text received...')
    }

    try {
        await TodoManager.createItem(text);
        response.redirect('/');
    } catch(err) {
        logError({message: err, path: "post: /"})
        response.status(500).send('An error occurred...')
    }
  }

  static async edit(request, response) {
    const id = request.params.id
    try{
        const item = await TodoManager.getById(id);

        if(!item) {
          response.status(404).send('Items not found...')
        }

        await TodoManager.editById(id);
        response.redirect('/');
    } catch(err) {
        logError({message: err, path: "patch: /:id"})
        response.status(500).send('An error occurred...')
    }
  }

  static async delete(request, response) {
    const id = request.params.id
    try{
      const item = await TodoManager.getById(id);;

        if(!item) {
          response.status(404).send('Item not found...')
        }

        await TodoManager.deleteById(id);
        response.redirect('/')
    } catch(err) {
        logError({message: err, path: "delete: /:id"})
        response.status(500).send('An error occurred...')
    }
  }
}

module.exports = TodoController;