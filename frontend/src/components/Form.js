import React, { useEffect, useState } from "react";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";

const Form = () => {
    const [form, setForm] = useState({
        director_name: "",
        director_email: "",
        director_phone: "",
        business_name: "",
        business_email: "",
        business_phone: "",
        business_type: "",
        business_address: "",
        yearEstablished: "",
        loanAmount: "",
        accountingProvider: "",
        balanceSheet: [],
    });

    const handleSubmitApplication = async (e, form, setForm) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:8000/initiateApplication",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit application");
            }

            const data = await response.json();
            console.log(data);

            setForm({
                name: "",
                yearEstablished: "",
                balanceSheet: [],
            });
        } catch (error) {
            throw error;
        }
    };

    return (
        <Card
            className="flex items-center justify-center h-screen"
            color="transparent"
            shadow={true}
        >
            <form
                className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96"
                onSubmit={handleSubmitApplication}
            >
                <Typography color="blue-gray" className="mb-4 font-bold">
                    Directors Details
                </Typography>
                <div className="mb-4 flex flex-col gap-6">
                    <Input
                        size="lg"
                        label="Director's Name"
                        value={form.director_name}
                        onChange={(e) => setForm(e.target.value)}
                    />
                    <Input
                        size="lg"
                        label="Director's Email"
                        value={form.director_email}
                        onChange={(e) => setForm(e.target.value)}
                    />
                    <Input
                        size="lg"
                        label="Director's Phone"
                        value={form.director_phone}
                        onChange={(e) => setForm(e.target.value)}
                    />
                </div>

                <Typography color="blue-gray" className="mb-4 font-bold">
                    Business Details
                </Typography>
                <div className="mb-4 flex flex-col gap-6">
                    <Input
                        size="lg"
                        label="Business Name"
                        value={form.business_name}
                        onChange={(e) => setForm(e.target.value)}
                    />
                    <Input
                        size="lg"
                        label="Business Email"
                        value={form.business_email}
                        onChange={(e) => setForm(e.target.value)}
                    />
                    <Input
                        size="lg"
                        label="Business Phone"
                        value={form.business_phone}
                        onChange={(e) => setForm(e.target.value)}
                    />
                    <Input
                        size="lg"
                        label="Business Address"
                        value={form.business_address}
                        onChange={(e) => setForm(e.target.value)}
                    />
                    <Input
                        size="lg"
                        label="Business Type"
                        value={form.business_type}
                        onChange={(e) => setForm(e.target.value)}
                    />
                    <Input
                        datepicker
                        size="lg"
                        label="Year Established"
                        value={form.yearEstablished}
                        onChange={(e) => setForm(e.target.value)}
                    />
                </div>

                <Typography color="blue-gray" className="mb-4 font-bold">
                    Loan Details
                </Typography>
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Loan Amount" />
                    <select
                        id="accountingProvider"
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        onChange={(e) => setForm(e.target.value)}
                        value={form.accountingProvider}
                        required
                    >
                        <option value="">Select an Accounting Provider</option>
                        <option value="xero">Xero</option>
                        <option value="myob">MYOB</option>
                    </select>
                </div>

                <Checkbox
                    label={
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                        >
                            I agree the
                            <a
                                href="#"
                                className="font-medium transition-colors hover:text-gray-900"
                            >
                                &nbsp;Terms and Conditions
                            </a>
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Button className="mt-6" fullWidth>
                    Load Accounts and Review
                </Button>
            </form>
        </Card>
    );
};

export default Form;
