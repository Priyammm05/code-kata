const mongoose = require("mongoose");

const sheet = [
    {
        year: 2020,
        month: 12,
        profitOrLoss: 250000,
        assetsValue: 1234,
    },
    {
        year: 2020,
        month: 11,
        profitOrLoss: 1150,
        assetsValue: 5789,
    },
    {
        year: 2020,
        month: 10,
        profitOrLoss: 2500,
        assetsValue: 22345,
    },
    {
        year: 2020,
        month: 9,
        profitOrLoss: -187000,
        assetsValue: 223452,
    },
    {
        year: 2020,
        month: 8,
        profitOrLoss: 250000,
        assetsValue: 1234,
    },
    {
        year: 2020,
        month: 7,
        profitOrLoss: 1150,
        assetsValue: 5789,
    },
    {
        year: 2020,
        month: 6,
        profitOrLoss: 2500,
        assetsValue: 22345,
    },
    {
        year: 2020,
        month: 5,
        profitOrLoss: -187000,
        assetsValue: 223452,
    },
    {
        year: 2020,
        month: 4,
        profitOrLoss: 250000,
        assetsValue: 1234,
    },
    {
        year: 2020,
        month: 3,
        profitOrLoss: 1150,
        assetsValue: 5789,
    },
    {
        year: 2020,
        month: 2,
        profitOrLoss: 2500,
        assetsValue: 22345,
    },
    {
        year: 2020,
        month: 1,
        profitOrLoss: -187000,
        assetsValue: 223452,
    },
];

const BusinessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    yearEstablished: {
        type: Number,
        required: true,
    },
    balanceSheet: {
        type: [
            {
                year: Number,
                month: Number,
                profitOrLoss: Number,
                assetsValue: Number,
            },
        ],
        default: sheet, 
    },
});

const Business = mongoose.model("Business", BusinessSchema);

module.exports = Business;
