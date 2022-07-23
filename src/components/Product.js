import { StarIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const Product = ({ title, price, description, category, image }) => {
	const dispatch = useDispatch();
	const [rating] = useState(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
	const [hasPrime] = useState(Math.random() < 0.5);

	const addItemToBasket = () => {
		const product = { title, price, description, category, image };
		dispatch(addToBasket(product));
	};
	return (
		<div className="relative flex flex-col bg-white m-5 z-30 p-10">
			<p className="absolute top-2 right-2 text-xs italic text-gray-400">
				{category}
			</p>
			<Image src={image} height={200} width={200} objectFit="contain" />
			<h4 className="my-3">{title}</h4>
			<div className="flex">
				{Array(rating)
					.fill()
					.map((_, i) => (
						<StarIcon className="h-5 text-yellow-500" key={i} />
					))}
			</div>

			<p className="text-xs my-2 line-clamp-3">{description}</p>
			<p className="font-bold">$ {price}</p>
			{hasPrime && (
				<div className="flex items-center space-x-2 mt-5">
					<img className="w-12" src="https://links.papareact.com/fdw" alt=" " />
					<p className="text-xs text-gray-500">Free Delivery</p>
				</div>
			)}
			<button onClick={addItemToBasket} className="mt-auto button">
				Add To Basket
			</button>
		</div>
	);
};

export default Product;
