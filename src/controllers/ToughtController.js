const Tought = require('../models/Tought');

module.exports = class ToughtController {
  static async store(req, res) {
    const { title } = req.body;
    if (!title) {
      return res.status(403).json({ error: 'O title é obrigatorio' });
    }
    try {
      const newTought = new Tought({ title });
      newTought.save();
      const id = newTought._id;
      res.status(201).json({ title, id });
    } catch (e) {
      console.log(e);
    }
  }

  static async show(req, res) {
    try {
      const tought = await Tought.find();
      res.status(200).json({ tought });
    } catch (error) {
      console.log(error);
    }
  }

  static async edit(req, res) {
    const { title } = req.body;
    const { id } = req.params;
    if (!title) return res.status(403).json({ error: 'Title é obrigatorio' });
    try {
      const tought = await Tought.findById(id);
      if (!tought) return res.status(404).json({ error: 'Tought não cadastrado' });
      tought.title = title;
      await tought.save(title);
      res.status(200).json(tought);
    } catch (e) {
      console.log(e);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const toughtExist = await Tought.findById(id);
      if (!toughtExist) return res.status(403).json({ error: 'Tought não encontrado' });
      await toughtExist.deleteOne();
      res.status(200).json({ message: 'Tought deletado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  }

  static async search(req, res) {
    const { q } = req.query;
    const tought = await Tought.find({ title: new RegExp(q, 'i') }).exec();
    res.status(200).json(tought);
  }
};
