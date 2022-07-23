import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header";
import db from "../firebase";
import moment from "moment";
import Order from "../components/Order";

const orders = ({ orders }) => {
	console.log(orders);
	const { data: session } = useSession();
	return (
		<div>
			<Header />
			<main className="max-w-screen-lg mx-auto p-10">
				<h1 className="text-3xl border-b-2 pb-1 border-yellow-400">
					Your Orders
				</h1>
				{session ? (
					<h2> {orders.length} Order</h2>
				) : (
					<h2>SignIn to see orders</h2>
				)}

				<div className="mt-5 space-y-4">
					{orders.map(
						({ id, amount, amountShipping, items, timestamp, images }) => (
							<Order
								key={id}
								id={id}
								amount={amount}
								amountShipping={amountShipping}
								items={items}
								timestamp={timestamp}
								images={images}
							/>
						)
					)}
				</div>
			</main>
		</div>
	);
};

export default orders;

export async function getServerSideProps(context) {
	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

	//Get User loged in credentials
	const session = await getSession(context);
	if (!session) {
		return {
			props: {},
		};
	}
	//Firebase DB
	const stripeOrders = await db
		.collection("users")
		.doc(session.user.email)
		.collection("orders")
		.orderBy("timestamp", "desc")
		.get();

	//Stripe Orders
	// Stripe orders
	const orders = await Promise.all(
		stripeOrders.docs.map(async (order) => ({
			id: order.id,
			amount: order.data().amount,
			amountShipping: order.data().amount_shipping,
			images: order.data().images,
			timestamp: moment(order.data().timestamp.toDate()).unix(),
			items: (
				await stripe.checkout.sessions.listLineItems(order.id, {
					limit: 100,
				})
			).data,
		}))
	);
	return {
		props: {
			orders,
		},
	};
}
