interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No items found",
  description = "Try adjusting your filters.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-2">
      <div className="text-5xl">📭</div>
      <h3 className="font-semibold text-gray-700 text-lg">{title}</h3>
      <p className="text-gray-400 text-sm text-center max-w-xs">
        {description}
      </p>
    </div>
  );
}
