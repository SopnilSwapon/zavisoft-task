export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse mt-4 md:mt-20">
      <div className="flex items-end justify-between mb-6 md:mb-8">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-6 md:h-10 w-56 bg-gray-300 rounded" />
          <div className="h-6 md:h-10 w-40 bg-gray-300 rounded" />
        </div>

        <div className="h-10 w-40 bg-gray-300 rounded-md" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <div className="bg-[#ECEDEF] border-6 border-white rounded-2xl p-4">
              <div className="bg-gray-300 -ml-4 w-16 h-8 -mt-4 rounded-br-3xl rounded-tl-3xl" />
              <div className="mt-3 w-full h-60 bg-gray-300 rounded-lg" />
            </div>

            <div className="mt-3 mb-3 h-4 w-3/4 bg-gray-300 rounded" />
            <div className="w-full h-10 bg-gray-300 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
