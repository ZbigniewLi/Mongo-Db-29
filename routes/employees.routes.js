const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/employees.controller');

router.get('/employees', EmployeeController.getAll);
router.get('/employees/random', EmployeeController.getRandom);
router.get('/employees/:id', EmployeeController.getEmployee);
router.post('/employees', EmployeeController.createEmployee);
router.put('/employees/:id', EmployeeController.editEmployee);
router.delete('/employees/:id', EmployeeController.deleteEmployee);

module.exports = router;
