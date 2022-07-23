import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { useSession, signIn, signOut } from "next-auth/react";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
	const items = useSelector(selectItems);
	const total = useSelector(selectTotal);
	const { data: session } = useSession();
	const createCheckoutSession = async () => {
		const stripe = await stripePromise;
		// call the backend to create a checkout session
		const checkoutSession = await axios.post("/api/create-checkout-session", {
			items,
			email: session.user.email,
		});

		//Redirect user to stripe checkout
		const result = await stripe.redirectToCheckout({
			sessionId: checkoutSession.data.id,
		});
		if (result.error) {
			alert(result.error.message);
		}
	};
	return (
		<div className="bg-gray-100">
			<Header></Header>
			<main className="lg:flex max-w-screen-2xl mx-auto">
				{/* Left */}
				<div className="flex-grow m-5 shadow-sm">
					<Image
						src="https://links.papareact.com/ikj"
						width={1020}
						height={250}
						objectFit="contain"
					/>

					<div className="flex flex-col p-5 space-y-10 bg-white">
						<h1 className="text-3xl border-b pb-4">
							{items.length === 0
								? "Your Basket is Empty"
								: "Your Shopping Cart"}
						</h1>
						{items.map(({ title, price, description, category, image }, i) => (
							<CheckoutProduct
								key={i}
								title={title}
								price={price}
								description={description}
								category={category}
								image={image}
							/>
						))}
					</div>
				</div>
				<div className="flex flex-col bg-white p-10 shadow-md">
					{items.length > 0 && (
						<>
							<h1 className="whitespace-nowrap">
								Subtotal ({items.length} items) :
							</h1>{" "}
							<span className="font-bold">$ {total}</span>
							<button
								disabled={!session}
								onClick={createCheckoutSession}
								className={`button mt-2 ${
									!session
										? "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
										: "Proceed to checkout"
								}`}
							>
								{!session ? "Sign in to checkout " : "Proceed to checkout"}
							</button>
						</>
					)}
				</div>
			</main>
		</div>
	);
};

export default Checkout;
