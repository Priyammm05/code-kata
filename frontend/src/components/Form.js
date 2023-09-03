import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import Outcome from "./Outcome";

const Form = () => {
    const [form, setForm] = useState({
        id: "",
        director_name: "",
        director_email: "",
        director_phone: "",
        name: "",
        address: "",
        phone: "",
        email: "",
        type: "",
        yearEstablished: "",
        loanAmount: "",
        accountingProvider: "",
        balanceSheet: [],
    });

    const [outcome, setOutcome] = useState(null);
    const [approved, setApproved] = useState("");
    const TABLE_HEAD = ["Year", "Month", "ProfitOrLoss", "AssetsValue"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await initiateApplication(form);

            toast.success(
                "Application initiated successfully , fetching the balance sheet",
                {
                    position: "top-right",
                    autoClose: 3000,
                }
            );
        } catch (error) {
            toast.error("Error submitting application. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const initiateApplication = async (formData) => {
        try {
            const response = await fetch(
                "http://localhost:8000/initiateApplication",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit application");
            }

            const data = await response.json();

            const responseSheet = await fetchBalanceSheet(data.business._id);

            console.log("Response SHEET : " + responseSheet.balanceSheet);
            console.log("ID : " + data.business._id);

            setForm({
                ...form,
                id: data.business._id,
                balanceSheet: responseSheet.balanceSheet,
            });

            return data;
        } catch (error) {
            toast.error("Error initiating application. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const fetchBalanceSheet = async (id) => {
        try {
            const response = await fetch(
                "http://localhost:8000/balance-sheet/" + id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit application");
            }
            const data = await response.json();

            return data;
        } catch (error) {
            toast.error("Error fetching balance sheet. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const submitApplication = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:8000/submitApplication",
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
            setApproved(data.loanOutcome.outcome);

            toast.success("Submitting application and fetching result", {
                position: "top-right",
                autoClose: 3000,
            });

            const outcome = await getOutcome(e);
            setOutcome(outcome.decisionEngineRequestBody);
        } catch (error) {
            toast.error("Error submitting application. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const getOutcome = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:8000/outcome/" + form.id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit application");
            }
            const data = await response.json();

            toast.success("Outcome fetched successfully!", {
                position: "top-right",
                autoClose: 3000,
            });

            return data;
        } catch (error) {
            toast.error("Error Fetching result. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div>
            <div
                className="flex items-center justify-center  m-5 p-5"
                color="transparent"
                shadow={false}
            >
                <form
                    className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96"
                    onSubmit={handleSubmit}
                >
                    <Typography color="blue-gray" className="mb-4 font-bold">
                        Directors Details
                    </Typography>
                    <div className="mb-4 flex flex-col gap-6">
                        <Input
                            size="lg"
                            required
                            label="Director's Name"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    director_name: e.target.value,
                                })
                            }
                            value={form.director_name}
                        />
                        <Input
                            size="lg"
                            required
                            label="Director's Email"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    director_email: e.target.value,
                                })
                            }
                            value={form.director_email}
                        />
                        <Input
                            required
                            label="Director's Phone"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    director_phone: e.target.value,
                                })
                            }
                            value={form.director_phone}
                        />
                    </div>

                    <Typography color="blue-gray" className="mb-4 font-bold">
                        Business Details
                    </Typography>
                    <div className="mb-4 flex flex-col gap-6">
                        <Input
                            size="lg"
                            required
                            label="Business Name"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                            value={form.name}
                        />
                        <Input
                            size="lg"
                            required
                            label="Business Email"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                            value={form.email}
                        />
                        <Input
                            size="lg"
                            required
                            label="Business Phone"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    phone: e.target.value,
                                })
                            }
                            value={form.phone}
                        />
                        <Input
                            size="lg"
                            required
                            label="Business Address"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    address: e.target.value,
                                })
                            }
                            value={form.address}
                        />
                        <Input
                            size="lg"
                            required
                            label="Business Type"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    type: e.target.value,
                                })
                            }
                            value={form.type}
                        />
                        <Input
                            required
                            size="lg"
                            label="Year Established"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    yearEstablished: e.target.value,
                                })
                            }
                            value={form.yearEstablished}
                        />
                    </div>

                    <Typography color="blue-gray" className="mb-4 font-bold">
                        Loan Details
                    </Typography>
                    <div className="mb-4 flex flex-col gap-6">
                        <Input
                            size="lg"
                            label="Loan Amount"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    loanAmount: e.target.value,
                                })
                            }
                            value={form.loanAmount}
                        />
                        <select
                            id="accountingProvider"
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-black-500 focus:border-2 focus:border-clack-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    accountingProvider: e.target.value,
                                })
                            }
                            value={form.accountingProvider}
                            required
                        >
                            <option value="">
                                Select an Accounting Provider
                            </option>
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
                                <span className="font-bold transition-colors hover:text-gray-900">
                                    &nbsp;Terms and Conditions
                                </span>
                            </Typography>
                        }
                        required
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button className="mt-6" type="submit" fullWidth>
                        Fetch Balance Sheet
                    </Button>
                </form>
            </div>

            {form.balanceSheet.length > 0 && (
                <div className="mx-40 px-40">
                    <table className="w-full min-w-full border border-blue-gray-100  table-auto text-left ">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {form.balanceSheet.map(
                                (
                                    { year, month, profitOrLoss, assetsValue },
                                    index
                                ) => {
                                    const isLast =
                                        index === form.balanceSheet.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {year}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {month}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {profitOrLoss}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {assetsValue}
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>

                    <Button
                        className="m-10 ml-[27rem] w-96"
                        type="submit"
                        fullWidth
                        onClick={(e) => submitApplication(e)}
                    >
                        Request Loan Decision
                    </Button>
                </div>
            )}

            {outcome && (
                <div className="mb-20">
                    <Outcome approved={approved} />

                    <div className="ml-[46rem]">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Name</td>
                                    <td className="ml-10 pl-10">
                                        {outcome.business.businessName}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">
                                        Year established
                                    </td>
                                    <td className="ml-10 pl-10">
                                        {outcome.business.yearEstablished}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">
                                        Summary of Profit or loss by the year
                                    </td>
                                    <td className="ml-10 pl-10">
                                        {outcome.business.annualSummary}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">
                                        PreAssessment value
                                    </td>
                                    <td className="ml-10 pl-10">
                                        {outcome.preAssessment}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Form;
