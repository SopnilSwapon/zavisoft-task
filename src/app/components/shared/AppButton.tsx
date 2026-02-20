import Link from "next/link";

interface IAppButtonLinkProps {
  title: string;
  className?: string;
}

export default function AppButton({
  title,
  className = "",
}: IAppButtonLinkProps) {
  return (
    <Link
      href="/#"
      className={`xl:py-4 py-2 md:py-3 px-4 md:px-6 xl:px-8 font-medium text-[14px] text-white rounded-xl bg-[#4A69E2] ${className}`}
    >
      {title}
    </Link>
  );
}