const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Employee = require('../models/employee.model')


exports.getAll = async (req, res) => {
    
  try {
    res.json(await Employee.find().populate('employee'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getRandom = async (req, res) => {

  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getEmployee = async (req, res) => {

  try {
    const dep = await Employee.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.createEmployee = async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {

    const { name } = req.body;
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: department });
    await newEmployee.save();
    res.json(newEmployee);

  } catch(err) {
    res.status(500).json({ message: err });
  }

};



exports.editEmployee = async (req, res) => {
  const { firstName, lastName, department } = req.body;
  

  try {
    await Employee.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName, department: department }});
    const dep = await Employee.findOne({ _id: req.params.id })
    res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};


exports.deleteEmployee  =  async (req, res) => {

  try {
    const dep = await Employee.findById(req.params.id);
    if(dep) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}


