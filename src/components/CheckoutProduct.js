import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CheckoutProduct = ({
	id,
	title,
	price,
	description,
	category,
	image,
	hasPrime,
}) => {
	const dispatch = useDispatch();

	const addItemToBasket = () => {
		const product = { title, price, description, category, image };
		dispatch(addToBasket(product));
	};

	const removeItemFromBasket = () => {
		dispatch(removeFromBasket({ id }));
	};

	return (
		<div className="grid grid-cols-5">
			<Image src={image} height={200} width={200} objectFit="contain" />
			{/*    Middle */}
			<div className="col-span-3">
				<p>{title}</p>
				<p className="text-xs my-2 line-clamp-3">{description}</p>
				<p className="font-bold">$ {price}</p>
			</div>
			<div className="flex flex-col space-y-2 my-auto justify-self-end">
				<button className="button" onClick={addItemToBasket}>
					Add To Basket
				</button>
				<button className="button" onClick={removeItemFromBasket}>
					Remove From Basket
				</button>
			</div>
		</div>
	);
};

export default CheckoutProduct;
