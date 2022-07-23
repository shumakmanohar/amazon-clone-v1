import Image from "next/image";
import {
	MenuIcon,
	SearchIcon,
	ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

const Header = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const items = useSelector(selectItems);
	return (
		<header>
			{/* Top Nav */}
			<div className="flex items-center bg-amazon_blue p-1 flex-grow py-2 ">
				<div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
					<Image
						src="https://links.papareact.com/f90"
						width={150}
						height={40}
						objectFit="contain"
						className="cursor-pointer"
						onClick={() => router.push("/")}
					/>
				</div>
				{/* Search Icons */}
				<div className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer hidden sm:flex items-center h-10 rounded-md flex-grow">
					<input
						type="text"
						className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md"
					/>
					<SearchIcon className="h-12 p-4" />
				</div>

				{/* Right */}
				<div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
					<div className="link" onClick={!session ? signIn : signOut}>
						<p>{session ? `Hello ${session.user.name}` : `Sign In`}</p>
						<p className="font-extrabold md:text-sm">Account & Lists</p>
					</div>
					<div className="link" onClick={() => router.push("/orders")}>
						<p>Returns</p>
						<p className="font-extrabold md:text-sm">& orders</p>
					</div>
					<div
						className=" relative link flex items-center"
						onClick={() => router.push("/checkout")}
					>
						<span className="absolute top-0 right-0 md:right-10 h-4 w-5 bg-yellow-400 text-center rounded-full text-black font-bold">
							{items.length}
						</span>
						<ShoppingCartIcon className="h-10" />
						<p className="font-extrabold md:text-sm hidden md:inline mt-2 ">
							Basket
						</p>
					</div>
				</div>
			</div>
			{/* Bottom Bav  */}
			<div className=" flex items-center p-2 pl-6 bg-amazon_blue-light text-white text-sm space-x-3">
				<p className="link flex items-center">
					<MenuIcon className="h-6 mr-1" />
					All
				</p>
				<p className="link">Prime Video</p>
				<p className="link">Amazon Businees </p>
				<p className="link">Today's deal </p>
				<p className="link hidden lg:inline-flex">Prime Video</p>
				<p className="link hidden lg:inline-flex">Amazon Businees </p>
				<p className="link hidden lg:inline-flex">Today's deal </p>
			</div>
		</header>
	);
};

export default Header;
