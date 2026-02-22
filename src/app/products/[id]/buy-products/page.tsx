"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CardContext";
import YouMayAlsoLikeSection from "@/app/components/productDetails/YouMayAlsoLikeSec";
import { IoTrashBinOutline } from "react-icons/io5";

const DELIVERY_FEE = 6.99;
const STATIC_SIZE = 10;
const PROMO_BANNER =
  "Enjoy up to 60% off thousands of styles during the End of Year sale - while supplies last. No code needed.";

export default function CartPage() {
  const { cart, setCart } = useCart();

  // Always show the LAST image added
  const latestImage =
    cart.images.length > 0 ? cart.images[cart.images.length - 1] : null;

  const orderTotal = cart.price + DELIVERY_FEE;

  const handleRemove = () => {
    setCart({
      items: 0,
      price: 0,
      title: "",
      description: "",
      images: [],
    });
  };

  // Empty cart state
  if (!cart.items || !latestImage) {
    return (
      <div className="min-h-screen bg-[#f2f0ed] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-gray-900 mb-2">
            Your Bag is Empty
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Add some products to get started.
          </p>
          <Link
            href="/"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold uppercase text-sm tracking-wide hover:bg-gray-800 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto py-8 md:py-12">
        {/* ── Promo Banner ───────────────────────────────────────────── */}
        <div className="mb-6">
          <h1 className="lg:text-[32px] text-2xl font-semibold text-gray-900 mb-2">
            Saving to celebrate
          </h1>
          <p className="text-sm text-gray-600 mb-3">{PROMO_BANNER}</p>
          <div className="flex gap-1">
            <Link
              href="#"
              className="underline font-semibold text-gray-500  hover:text-gray-800"
            >
              Join us
            </Link>
            <p className="font-semibold text-gray-500  hover:text-gray-800">
              or
            </p>
            <Link
              href="#"
              className="underline font-medium text-gray-500 hover:text-gray-800"
            >
              Sign-in
            </Link>
          </div>
        </div>

        {/* ── Main Layout ─────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ── LEFT: Your Bag ─────────────────────────────────────────── */}
          <div className="w-full lg:flex-1 bg-white rounded-2xl p-5 md:p-7 shadow-sm">
            <h2 className="text-2xl md:text-[32px] font-semibold uppercase tracking-tight text-gray-900 mb-1">
              Your Bag
            </h2>
            <p className="text-[16px] text-gray-500 mb-6">
              Items in your bag not reserved- check out now to make them yours.
            </p>

            {/* Single cart entry — always shows latest title + last image */}
            <div className="flex gap-4">
              {/* Product Image — always images[images.length - 1] */}
              <div className="relative rounded-xl overflow-hidden bg-[#e8e4de] shrink-0">
                <Image
                  src={latestImage}
                  alt={cart.title}
                  width={210}
                  height={225}
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                {/* Title + Price */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-2 mb-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight">
                    {cart.title}
                  </h3>
                  <span className="text-xl md:text-2xl font-semibold text-[#4a7dff] shrink-0">
                    ${cart.price.toFixed(2)}
                  </span>
                </div>

                {/* Static description lines */}
                <p className="text-base md:text-xl text-gray-500 leading-snug mb-1">
                  Men&apos;s Road Running Shoes
                </p>
                <p className="text-base md:text-xl text-gray-500 leading-snug mb-3">
                  {cart.description}
                </p>

                {/* Size + Quantity */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-white cursor-pointer hover:border-gray-400 transition-colors">
                    <span className="text-xs md:text-sm font-medium text-gray-500">
                      Size {STATIC_SIZE}
                    </span>
                    <ChevronDown size={18} className="text-gray-500" />
                  </div>

                  <div className="flex items-center gap-1 px-3 py-1.5 bg-white cursor-pointer hover:border-gray-400 transition-colors">
                    <span className="text-xs md:text-sm font-medium text-gray-500">
                      Quantity {cart.items}
                    </span>
                    <ChevronDown size={18} className="text-gray-500" />
                  </div>
                </div>

                {/* Action icons */}
                <div className="flex ml-4 items-center gap-3 mt-3">
                  <button
                    className="hover:text-black cursor-pointer text-gray-600 transition-colors"
                    aria-label="Save to wishlist"
                  >
                    <Heart size={28} />
                  </button>
                  <button
                    onClick={handleRemove}
                    title="Remove all items"
                    className="hover:text-black cursor-pointer text-gray-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <IoTrashBinOutline size={26} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Order Summary ────────────────────────────────────── */}
          <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl p-5 md:p-7 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-2xl text-[32px] font-semibold text-gray-900 mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between">
                <span className="text-base md:text-xl font-semibold uppercase tracking-wide text-gray-700">
                  {cart.items} {cart.items === 1 ? "Item" : "Items"}
                </span>
                <span className="text-base md:text-xl font-semibold text-gray-900">
                  ${cart.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base md:text-xl text-gray-600">
                  Delivery
                </span>
                <span className="text-base md:text-xl text-gray-900">
                  ${DELIVERY_FEE.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base md:text-xl text-gray-600">
                  Sales Tax
                </span>
                <span className="text-base md:text-xl text-gray-400">-</span>
              </div>
            </div>

            <div className="border-t border-gray-100 mb-4" />

            <div className="flex items-center justify-between mb-6">
              <span className="text-xl md:text-2xl font-semibold text-gray-900">
                Total
              </span>
              <span className="text-base font-extrabold text-gray-600">
                ${orderTotal.toFixed(2)}
              </span>
            </div>

            <button className="w-full bg-gray-900 text-white rounded-xl py-3.5 font-bold uppercase tracking-widest text-sm hover:bg-gray-800 active:scale-95 transition-all duration-150 mb-4">
              Checkout
            </button>

            <button className="w-full text-base md:text-xl font-semibold underline text-gray-600 hover:text-gray-900 transition-colors text-left">
              Use a promo code
            </button>
          </div>
        </div>
      </div>
      <YouMayAlsoLikeSection />
    </div>
  );
}
