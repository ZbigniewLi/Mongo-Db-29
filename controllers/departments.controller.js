const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Department = require('../models/department.model')


 /*router.get('/departments', (req, res) => {
  req.db.collection('departments')
  .find()
  .toArray()
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  });
}); */

    exports.getAll =  async (req, res) => {
  try {
    res.json(await Department.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

 /* router.get('/departments/random', (req, res) => {
  req.db.collection('departments')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
}); */

exports.getRandom = async (req, res) => {

  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

 /*router.get('/departments/:id', (req, res) => {
  req.db.collection('departments')
    .findOne({ _id: ObjectId(req.params.id) })
    .then((data) => {
      if(!data) res.status(404).json({ message: 'Not found' });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
}); */

exports.getDepartment = async (req, res) => {

  try {
    const dep = await Department.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

 /*router.post('/departments', (req, res) => {
  const { name } = req.body;

  req.db.collection('departments')
    .insertOne({ name: name })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
}); */

exports.createDepartment = async (req, res) => {

  try {
    console.log('abc', req.body)

    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json(newDepartment);

  } catch(err) {
    res.status(500).json({ message: err });
  }

}

 /* router.put('/departments/:id', (req, res) => {
  const { name } = req.body;

  req.db.collection('departments')
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name }})
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
}); */

exports.editDepartment =  async (req, res) => {
  const { name } = req.body;

  try {
    await Department.updateOne({ _id: req.params.id }, { $set: { name: name }});
    const dep = await Department.findOne({ _id: req.params.id })
    res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

 /*router.delete('/departments/:id', (req, res) => {
  req.db.collection('departments')
    .deleteOne({ _id: ObjectId(req.params.id) })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
}); */

exports.deleteDepartment  = async (req, res) => {

  try {
    const dep = await Department.findById(req.params.id);
    if(dep) {
      await Department.deleteOne({ _id: req.params.id });
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}


