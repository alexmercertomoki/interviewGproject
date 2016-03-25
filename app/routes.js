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


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all Foods
    app.get('/api/foods', function (req, res) {
        // use mongoose to get all Foods in the database
        getFoods(res);
    });


    app.get('/api/total', function (req, res) {
        // use mongoose to get all Foods in the database
        getTotal(res);

    });

    // create Food and send back all Foods after creation
    app.post('/api/food', function (req, res) {

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
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};