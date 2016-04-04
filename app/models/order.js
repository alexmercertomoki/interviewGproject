var mongoose = require('mongoose');

module.exports = mongoose.model('Order', {

    subtotal : {
            type: Number,
            default: 0
      },

    tax : {
            type: Number,
            default: 0
    },

    balance : {
            type: Number,
            default: 0
    },

    items : []

});