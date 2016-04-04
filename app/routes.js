var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all Foods in JSON format
    });
};

function getTotal(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        var subtotal = 0;
        var tax = 0;

        for(idx in foods) {
            subtotal += foods[idx].price;
        }

        tax = Math.round(subtotal * 7.5) / 100; 
        var sum = subtotal + tax;

        var total = {
            subtotal : subtotal, 
            tax : tax,
            sum : sum
        }
     

        res.json(total); // return all Foods in JSON format
    });
};




// exporting the functions so that other files can use it
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all Foods
    app.get('/api/foods', function (req, res) {
        // use mongoose to get all Foods in the database
        console.log("aaa");
        getFoods(res);
    });
    // test function
    app.get('/api/foods/:food_id', function (req, res) {
        // use mongoose to get all Foods in the database
        res.send("Nihao:" + req.params.food_id);
    });

    // getting total
    app.get('/api/total', function (req, res) {
        // use mongoose to get all Foods in the database
        getTotal(res);

    });

    app.post('/api/order', function (req, res) {
        

        // create a Food, information comes from AJAX request from Angular
        Order.create({
            subtotal : req.body.subtotal,
            tax: req.body.tax,
            balance : req.body.description,
            items : req.body.items,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the Foods after you create another
            getFoods(res);
        });

    });

    
    
    
    




    // updating food
    // app.post('/api/food/:food_id', function (req, res) {
    //     console.log("this is updating food ");
    //
    //     //update a Food, information comes from AJAX request from Angular
    //     Food.update({
    //         _id: req.params.food_id,
    //         foodname: req.body.foodname,
    //         price: req.body.price,
    //         description: req.body.description,
    //         done: false
    //
    //     }, function (err, food) {
    //         if (err)
    //             res.send(err);
    //
    //         // get and return all the Foods after you create another
    //         getFoods(res);
    //     });
    //
    // });





    app.post('/api/food', function (req, res) {
        console.log("bbdfdfdfb");

        // create a Food, information comes from AJAX request from Angular
        Food.create({
            foodname: req.body.foodname,
            price: req.body.price,
            description : req.body.description,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the Foods after you create another
            getFoods(res);
        });

    });



    // delete a Food
    app.delete('/api/food/:food_id', function (req, response) { //restful !!
        Food.remove({
            _id: req.params.food_id


        }, function (err, food) {
            if (err) {
                response.send(err);
            } else {
                getFoods(response);
            }
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile('/Users/mac/Desktop/interviewproject/myfood/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};