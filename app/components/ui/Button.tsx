import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/app/lib/utils";

export const buttonVariants = {
  solid:
    "bg-white text-text-black-v1 hover:bg-white/90 active:bg-white/80 font-semibold",
  outline:
    "border border-white bg-transparent text-white hover:bg-white/10 active:bg-white/15",
  "outline-dark":
    "border border-primary bg-black-v1 text-white hover:bg-black-v1/80 active:bg-black-v1/70",
  primary:
    "bg-primary text-white hover:bg-primary/90 active:bg-primary/80",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function isExternalLink(href: string) {
  return /^(https?:\/\/|mailto:|tel:)/.test(href);
}

export default function Button({
  variant = "solid",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, buttonVariants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;

    if (isExternalLink(href)) {
      return (
        <a
          href={href}
          className={classes}
          target={linkProps.target ?? "_blank"}
          rel={linkProps.rel ?? "noopener noreferrer"}
          {...linkProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
