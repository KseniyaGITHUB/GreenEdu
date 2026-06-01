import Link from "next/link";

interface BackLinkProps {
  href?: string;
  label?: string;
}

export default function BackLink({
  href = "/ingredients",
  label = "← Назад к курсам"
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center text-sm md:text-base font-semibold text-green-800 hover:text-green-600 transition-colors mb-4 md:mb-6"
    >
      {label}
    </Link>
  );
}
