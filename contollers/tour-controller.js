const fs = require("fs");
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)
exports.checkID = (req,res,next,val)=>{
    if(+req.params.id > tours.length){
        return res.status(404).json({
            status: "fail",
            message: "invalid ID"
        })
    }
    next();
}
exports.checkBody = (req,res,next) => {
    if(!(req.body.hasOwnProperty("name") && req.body.hasOwnProperty("price"))){
        return res.status(400).json({
            status: "fail",
            message: "invalid request"
        })
    }
    next();
}
exports.getAllTours = (req,res)=>{
    res.status(200).json({
        status: "success",
        results: tours.length,
        requestTime: req.requestTime,
        data: {
            tours
        },
    });
};
exports.getTour = (req,res)=>{
    const id = +req.params.id;
    const tour = tours.find(tour => tour.id === id);
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
};
exports.createTour = (req,res)=>{
    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        res.status(201).json({
            "status": "success",
            "data": {
                tour: newTour
            }
        })
    });
};
exports.updateTour = (req,res)=>{
    console.log(req.body);
    res.status(200).json({
        status: "success",
        data: {
            tour: '<Updated tour here>'
        }
    })
};
exports.deleteTour = (req,res)=>{
    res.status(204).json({
        status: "success",
        data: null
    })
};