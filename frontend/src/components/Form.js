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
    const [hasInitialized, setHasInitialized] = useState(false);

    const [form, setForm] = useState({
        applicationId: "",
        name: "",
        email: "",
        phone: "",
        businessName: "",
        businessAddress: "",
        businessPhone: "",
        businessEmail: "",
        yearEstablished: "",
        loanAmount: "",
        accountingProvider: "",
        agreedTerms: false,
        sheet: [],
    });

    return (
        <Card
            className="flex items-center justify-center h-screen"
            color="transparent"
            shadow={true}
        >
            <form className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96">
                <Typography color="blue-gray" className="mb-4 font-bold">
                    Directors Details
                </Typography>
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Director's Name" />
                    <Input size="lg" label="Director's Email" />
                    <Input size="lg" label="Director's Phone" />
                </div>

                <Typography color="blue-gray" className="mb-4 font-bold">
                    Business Details
                </Typography>
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Business Name" />
                    <Input size="lg" label="Business Email" />
                    <Input size="lg" label="Business Phone" />
                    <Input size="lg" label="Business Address" />
                    <Input datepicker size="lg" label="Year Established" />
                </div>

                <Typography color="blue-gray" className="mb-4 font-bold">
                    Loan Details
                </Typography>
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Loan Amount" />
                    <Select label="Accounting Provider">
                        <Option value="xero">Xero</Option>
                        <Option value="myob">MYOB</Option>
                    </Select>
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
