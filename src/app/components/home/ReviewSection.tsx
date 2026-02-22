import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import AppButton from "../shared/AppButton";

const reviews = [
  {
    id: 1,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5.0,
    avatar: "/images/user1.png",
    shoeImage: "/images/reviewImage1.png",
  },
  {
    id: 2,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5.0,
    avatar: "/images/user2.png",
    shoeImage: "/images/reviewImage2.png",
  },
  {
    id: 3,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5.0,
    avatar: "/images/user3.png",
    shoeImage: "/images/reviewImage3.png",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
      ))}
      <span className="text-sm font-semibold text-gray-700 ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="w-full my-4 md:my-20 lg:my-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <h2 className="text-2xl md:text-5xl xl-text-[74px] font-semibold uppercase tracking-tight text-gray-900">
          Reviews
        </h2>
        <AppButton title="See All" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 border md:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="overflow-hidden border-none rounded-[30px] bg-white p-0"
          >
            {/* Top: text content */}
            <div className="flex items-start justify-between px-5 pt-5 pb-4">
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-2xl text-gray-900">
                  {review.title}
                </h3>
                <p className="text-gray-500 text-[16px] leading-snug">
                  {review.text}
                </p>
                <div className="mt-2">
                  <StarRating rating={review.rating} />
                </div>
              </div>
              {/* Avatar */}
              <div>
                <Image
                  src={review.avatar}
                  alt="Reviewer avatar"
                  height={64}
                  width={64}
                />
              </div>
            </div>

            {/* Bottom: shoe image */}
            <div className="relative w-full">
              <Image
                src={review.shoeImage}
                alt="Reviewed shoe"
                width={440}
                height={325}
                className="object-cover"
              />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
