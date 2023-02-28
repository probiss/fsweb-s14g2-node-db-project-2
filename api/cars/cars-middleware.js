const Car = require("./cars-model");
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const car = await Car.getById(carId);
    if (!car) {
      return res.status(404).json({ message: `${carId} kimliğine sahip araba bulunamadı` });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
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
    return res.status(400).json({ message: `vin ${vin} geçersizdir` });
  }

  next();
}

const checkVinNumberUnique = async (req, res, next) => {
  const vin = req.body.vin;
  const car = await Car.create({ vin: vin });

  if (car) {
    return res.status(400).json({ message: `vin ${vin} zaten var` });
  }

  next();
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}