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

const checkCarPayload = async (req, res, next) => {
  try {
    const fields = ["vin", "make", "model", "mileage"]; //doldurulması zorunlu olan alanları array e aldık.
    const missedFields = []; //doldurulmayan alanların pushlanması için boş bir array oluşturduk.
    fields.forEach((field) => {
      if (!req.body[field]) {
        //tek tek req.body.vin ve diğerline bakıyor
        missedFields.push(field); //boş olanları array'e pushluyor.
      }
    });
    if (missedFields.length > 0) {
      let missedFieldsStr = missedFields.join();
      res.status(400).json({ message: `${missedFieldsStr} is missing` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
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