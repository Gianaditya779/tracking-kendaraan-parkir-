import express from 'express';
import * as vehicleController from '../controllers/vehicleController.js';

const router = express.Router();

// GET semua kendaraan
router.get('/', vehicleController.getAllVehicles);

// POST kendaraan baru
router.post('/', vehicleController.createVehicle);

// PUT update kendaraan
router.put('/:id', vehicleController.updateVehicle);

// DELETE kendaraan
router.delete('/:id', vehicleController.deleteVehicle);

export default router;
