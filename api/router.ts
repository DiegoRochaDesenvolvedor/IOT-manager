import express, { Router, Request, Response } from 'express';
const Employee = require('../database/models/Employee');

const router: Router = express.Router();

router.post('/employee', async (req: Request, res: Response) => {
  const { name, position, departament, adimission } = req.body;
  const adimissionDate = new Date(adimission);    
  console.log('adimissionDATE--',adimissionDate)
  const newEmployee = new Employee({
    name,
    position,
    departament,
    adimission:adimissionDate
  });

  try {
    const employee = await newEmployee.save();
    res.send(employee);
  } catch (err:any) {
    console.error(err);
    if (err.code === 11000) {
      res.status(400).send('Duplicate key error: ' + err.keyValue);
    } else {
      res.status(500).send('An error occurred: ' + err.message);
    }
  }
});

router.delete('/employee/:id', async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    await Employee.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Employee removed' });
  } catch (err:any) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    res.status(500).send('Server error');
  }
});

router.get('/employees', async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err: any) {
    res.status(500).send('Server error: ' + err.message);
  }
});

router.get('/employees/:id', async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (err: any) {
    res.status(500).send('Server error: ' + err.message);
  }
});

router.put('/employee/:id', async (req: Request, res: Response) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).send('Employee not found');
    }

    res.send(updatedEmployee);
  } catch (err: any) {
    res.status(500).send('Server error: ' + err.message);
  }
});

export default router;