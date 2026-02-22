interface IAppButtonLinkProps {
  title: string;
  className?: string;
  onClick?: () => void;
}

export default function AppButton({
  title,
  className = "",
  onClick,
}: IAppButtonLinkProps) {
  return (
    <button
      className={`xl:py-4 py-2 md:py-3 px-4 md:px-6 cursor-pointer xl:px-8 font-medium text-[14px] text-white rounded-xl bg-[#4A69E2] ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
