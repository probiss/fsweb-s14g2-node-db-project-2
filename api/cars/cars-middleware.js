const Car = require("./cars-model");
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const car = await Car.getById(carId);
    if (!car) {
      res.status(404).json({ message: `${carId} kimliğine sahip araba bulunamadı` });
    } else {
      req.car = car;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {

  const { make, model, vin, mileage } = req.body;

  if (!make) {
    return res.status(400).json({ message: "make is missing" });
  }
  if (!model) {
    return res.status(400).json({ message: "model is missing" });
  }
  if (!vin) {
    return res.status(400).json({ message: "vin is missing" });
  }
  if (!mileage) {
    return res.status(400).json({ message: "mileage is missing" });
  }
  next();
};

const checkVinNumberValid = (req, res, next) => {
  const vin = req.body.vin;

  if (vin && !vinValidator.validate(vin)) {
    res.status(400).json({ message: `vin ${vin} is invalid` });
  }

  next();
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    let mySons = await Car.getAll();
    const { vin } = req.body;
    let isValidVin = mySons.every((car) => car.vin !== vin);
    if (!isValidVin) {
      res.status(400).json({ message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}