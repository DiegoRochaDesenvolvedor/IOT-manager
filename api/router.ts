import express, { Router, Request, Response } from 'express';
import Device from '../database/models/Devices'; // Importe o modelo Mongoose
import DeviceLists from '../database/models/DeviceLists'; 

const router: Router = express.Router();

router.post('/device', async (req: Request, res: Response) => {
  const { deviceData, configuration, device_list_id, user_id, device_name } = req.body;

  const newDevice = new Device({ 
    deviceData,
    configuration,
    device_list_id,
    user_id,
    device_name,
    created: Date.now()
  });

  try {
    const savedDevice = await newDevice.save();
    res.json(savedDevice);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/device/:id', async (req: Request, res: Response) => {
  try {
    const response = await Device.findOne({ _id: req.params.id });

    if (!response) {
      return res.status(404).json({ msg: 'device not found' });
    }

    await response.deleteOne({ _id: req.params.id });
    res.json({ msg: 'device removed' });
  } catch (err:any) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'device not found' });
    }

    res.status(500).send('Server error');
  }
});

router.get('/devices/:id', async (req: Request, res: Response) => {
  try {
    const response = await Device.find({ user_id: req.params.id });    
    if (response) {
      res.json(response);
    } else {
      res.status(404).send('Device not found');
    }
  } catch (err: any) {
    res.status(500).send('Server error: ' + err.message);
  }
});

router.get('/devicesInfo', async (req: Request, res: Response) => {
  try {
    const devices = await DeviceLists.find();

    console.log('response-->')   
    if (devices) {
      res.json(devices);
    } else {
      res.status(404).send('Device not found');
    }
  } catch (err: any) {
    res.status(500).send('Server error: ' + err.message);
  }
});

export default router;