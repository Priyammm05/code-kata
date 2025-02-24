const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Business = require("./models/business.js");
// const { default: sheet } = require("./accountingSoftware.js");

dotenv.config();

const port = 8000;

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection!"))
    .catch((err) => {
        console.log(err);
    });

app.post("/initiateApplication", async (req, res) => {
    try {
        const { name, yearEstablished } = req.body;
        const business = await Business.findOneAndUpdate(
            { name },
            { name, yearEstablished },
            { upsert: true, new: true }
        );
        res.status(200).json({ business });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});

app.get("/balance-sheet/:businessId", async (req, res) => {
    try {
        const { businessId } = req.params;
        const business = await Business.findById(businessId);

        if (!business) {
            return res.status(404).json({ error: "Business not found" });
        }

        const balanceSheet = business.balanceSheet;

        res.status(200).json({ balanceSheet });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});

app.post("/submitApplication", async (req, res) => {
    try {
        const { id, loanAmount } = req.body;

        const tokenId = "6443ab5d6f7e89d2d4018eb0";
        const business = await Business.findById(id);
        console.log(id);

        let preAssessment = 20;
        const profit12Months = business.balanceSheet
            .slice(0, 12)
            .reduce((acc, curr) => acc + curr.profitOrLoss, 0);

        console.log(profit12Months);

        const assetsMonthsAverage =
            business.balanceSheet
                .slice(0, 12)
                .reduce((acc, curr) => acc + curr.assetsValue, 0) / 12;

        console.log(assetsMonthsAverage);

        if (profit12Months > 0) {
            preAssessment = 60;
        }

        if (assetsMonthsAverage > loanAmount) {
            preAssessment = 100;
        }

        const outcome = preAssessment >= 60 ? "approved" : "rejected";
        const approvedAmount = (loanAmount * preAssessment) / 100;
        const approvedTerm = "1 year";
        const approvedInterestRate = "5%";

        const loanOutcome = {
            tokenId: tokenId,
            outcome: outcome,
            approvedAmount: approvedAmount,
            approvedTerm: approvedTerm,
            approvedInterestRate: approvedInterestRate,
        };

        console.log(loanOutcome);

        res.status(200).json({ preAssessment, loanOutcome });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});

app.get("/outcome/:applicationId", async (req, res) => {
    try {
        const { applicationId } = req.params;

        const application = await Business.findById(applicationId);

        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        const { name, yearEstablished, balanceSheet } = application;

        let preAssessment = 20;
        let profit12Months = balanceSheet
            .slice(0, 12)
            .reduce((acc, curr) => acc + curr.profitOrLoss, 0);

        let assetsMonthsAverage =
            balanceSheet
                .slice(0, 12)
                .reduce((acc, curr) => acc + curr.assetsValue, 0) / 12;

        if (profit12Months > 0) {
            preAssessment = 60;
        }

        if (assetsMonthsAverage > req.body.loanAmount) {
            preAssessment = 100;
        }

        const decisionEngineRequestBody = {
            business: {
                tokenId: applicationId,
                businessName: name,
                yearEstablished: yearEstablished,
                annualSummary: balanceSheet
                    .slice(0, 12)
                    .reduce((acc, curr) => acc + curr.profitOrLoss, 0),
            },
            preAssessment: preAssessment.toString(),
        };

        res.status(200).json({ decisionEngineRequestBody });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});

app.get("/test", (req, res) => {
    res.json("test ok");
});

app.listen(port, () => {
    console.log(`Running server listening at http://localhost:${port}`);
});
