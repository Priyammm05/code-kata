import React from "react";
import Form from "./components/Form";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div className="p-1">
            <head>
                <title>Get a Business Loan</title>
                <meta
                    name="description"
                    content="An example business loan client built for Demyst"
                />
                <link rel="icon" href="/favicon.ico" />
            </head>

            <main className="p-12 flex flex-1 flex-col justify-center items-center">
                <h1 className="text-8xl font-bold">Get a Business Loan</h1>

                <p className="text-4xl">
                    Get started by entering your business details:
                </p>
            </main>
            <Form />
            <Footer />
        </div>
    );
};

export default App;
