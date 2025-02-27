const router = require("express").Router();
const basGaza = require("./cars-model");
const askim = require("./cars-middleware");

router.get("/", (req, res, next) => {
    basGaza.getAll()
        .then((car) => {
            res.json(car);
        })
        .catch((err) => {
            res.json([]);
        });
});

router.get("/:id", askim.checkCarId, async (req, res, next) => {
    try {
        res.json(req.car);
    } catch (err) {
        next(err);
    }
});

router.post("/", askim.checkCarPayload, askim.checkVinNumberValid, askim.checkVinNumberUnique,async (req, res, next) => {
    try {
        let insertData = await basGaza.create(req.body);
        res.json(insertData);
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: "Lastikler yanmasın...",
        message: err.message,
    });
});


module.exports = router;