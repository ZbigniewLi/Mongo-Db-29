const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getDepartment);
router.post('/departments', DepartmentController.createDepartment);
router.put('/departments/:id', DepartmentController.editDepartment);
router.delete('/departments/:id', DepartmentController.deleteDepartment);

module.exports = router;
