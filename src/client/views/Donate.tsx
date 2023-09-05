import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { POST } from "../services/fetcher-helper";
import CheckoutForm from "../components/CheckoutForm";
import Swal from "sweetalert2";

const stripePromise = loadStripe(
    "pk_test_51NlH7QDm2UBLgwqjjB6LD7VlAepj95NR7uvxC1PzbkbEKJ4B3CLKpt9cyLFbRt53C8y6P2hCPGsAZBPY1nXtf0e200u8J43CNC"
);

const Donate = () => {
    const [donation, setDonation] = useState({
        amount: "",
        show: true,
        clientSecret: "",
    });

    const handlePaymentIntent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const results = await fetch("/api/donate/payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: Number(donation.amount) }),
            });
            const { clientSecret } = await results.json();

            setDonation((pre) => ({ ...pre, clientSecret, show: false }));
        } catch (error) {
            Swal.fire(error);
            console.log(error);
        }
    };

    if (donation.show) {
        return (
            <div className="row justify-content-center">
                <div className="col-12 col-md-9 col-lg-7">
                    <h1>Thank you for Considering Donating!</h1>
                    <form>
                        <input
                            type="text"
                            className="form-control"
                            value={donation.amount}
                            onChange={(e) => setDonation((pre) => ({ ...pre, amount: e.target.value }))}
                        />
                        <button
                            onClick={handlePaymentIntent}
                            className="btn btn-primary mt-2"
                        >
                            Continue to Payment Info
                        </button>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div className="row justify-content-center">
                <div className="col-12 col-md-9 col-lg-7">
                    <Elements
                        stripe={stripePromise}
                        options={{ clientSecret: donation.clientSecret }}
                    >
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        );
    }
};

export default Donate;
