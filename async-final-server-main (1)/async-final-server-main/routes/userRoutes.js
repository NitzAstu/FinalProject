const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const CostItem = require('../models/costItem');

// URL path to Sign-up.
router.post("/signup", (req,res) => {
    //Register new user with the required fields.
    User.register(
        new User({username: req.body.username})
        , req.body.password
        , (err, user) => {
           if(err) {
               res.statusCode = 500;
               console.log(err);
               res.send(err);
           } else {
               user.firstName = req.body.firstName;
               user.lastName = req.body.lastName;
               user.birthday = req.body.DOB;
               user.marital_status = req.body.marital_status;
               // Save to DB after filling all the required fields.
               user.save((err,user) => {
                  if(err) {
                      res.statusCode = 501;
                      res.send(err);
                  }else {
                      res.send({success: "Registered successfully."});
                  }
               });
           }
        });
});

//URL path login.
router.post("/login" , passport.authenticate("local"),(req,res, next) => {
    //Find user with the matching details.
    User.findById(req.user._id).then( user => {
        res.send({success: true, firstName: user.firstName, lastName: user.lastName});
    },
        err => next(err)
    );
});

//URL path add cost item.
router.post("/addItem",(req,res) => {
        // Create new cost item object.
        const newItem = new CostItem({
            category: req.body.category,
            sum: req.body.sum.toString(),
            description: req.body.description
        });
        // Save new cost item object to DB.
        newItem.save((err,item) => {
            if(err) {
                console.log(err);
                res.statusCode = 500;
                res.send({message: "error occurred"});
            } else{
                console.log("new cost item saved!!");
                res.send({message: "new cost item saved"});
            }
        });



});

//URL path getting cost item reports by month and year.
router.get("/getItems/:year1/:month1", (req,res) => {
    // Getting the month and year form the url.
    const startDate = new Date(req.params.year1, req.params.month1-1, 2);
    const endDate = new Date(req.params.year1, req.params.month1, 1);

    // Getting all the cost items in the time period specified.
    CostItem.find({createdAt: { $gte: startDate, $lt: endDate }}, (err,items) => {
        if(err) {
            console.log(err);
            res.statusCode = 500;
            res.send("error occurred");
        }else {
            res.send({answer: items});

        }
    });
});

// URL path to check if user is authenticated.
router.get("/isAuth",(req,res,next) => {
    //console.log(req.session);
    if(req.session && req.session.passport){
        res.statusCode = 200;
        res.send({success: true });
    } else {
        res.send({success: false})
    }


});

//URL path for logout.
router.get("/logout", (req,res)=> {
    req.session.destroy();
    res.send("OK");
})

module.exports = router;