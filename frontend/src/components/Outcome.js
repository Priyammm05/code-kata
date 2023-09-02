import React from "react";

const Outcome = () => {
    return (
        <div className="p-1">
            <head>
                <title>Final Outcome</title>
                <meta
                    name="description"
                    content="An example business loan client built for Demyst"
                />
                <link rel="icon" href="/favicon.ico" />
            </head>

            <main className="p-12 flex flex-1 flex-col justify-center items-center">
                <h1 className="text-8xl font-bold">Final Outcome</h1>

                <p className="text-4xl">
                    You have been approved for a business loan!
                </p>
            </main>
        </div>
    );
};

export default Outcome;
