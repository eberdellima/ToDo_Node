const TodoItems = require('../models/todo.model');


class TodoManager {

  static async getAllItems() {
    
    const items = await TodoItems.find({is_deleted: false});
    
    const doneItems = items.filter(item => item.is_done)
    const notDoneItems = items.filter(item => !item.is_done)

    return {
      doneItems,
      notDoneItems
    };
  }

  static async getById(id) {
    return TodoItems.findOne({_id: id, is_deleted: false});
  }

  static async createItem(text) {

    const newItem = new TodoItems({
      text,
      is_deleted: false,
      is_done: false
    });

    await TodoManager.saveItem(newItem);
  }

  static async editById(id) {

    const item = await TodoManager.getById(id);

    item.is_done = true;
    await TodoManager.saveItem(item);
  }

  static async saveItem(item) {
    return newItem.save();
  }

  static async deleteById(id) {

    const item = await TodoManager.getById(id);

    item.is_deleted = true
    await TodoManager.saveItem(item);
  }
}

module.exports = TodoManager;