import React from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleDonate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/thankyou`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            console.log(error.message);
        } else {
            Swal.fire("Unexpected Error");
            console.log("Unexpected Error");
        }
    };

    return (
        <div>
            <PaymentElement />
            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleDonate}
                >
                    Donate
                </button>
            </div>
        </div>
    );
};

export default CheckoutForm;
