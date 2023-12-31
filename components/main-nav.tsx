import Link from "next/link";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/products"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </Link>
      <Link
        href="/coming-soon"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
      <Link
        href="/optibot"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Optibot
      </Link>
      <ThemeToggle />
    </nav>
  );
}
