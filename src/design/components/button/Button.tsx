// src/design/components/button/Button.tsx

import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../helpers";
import {
  ButtonVariant,
  ButtonVariants,
  ComponentSize,
  ComponentSizes,
} from "../../constants";
import { ButtonFireflySwarm } from "./ButtonFireflies";

export interface IButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
> {
  variant?: ButtonVariant;
  size?: ComponentSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leaf?: React.ReactNode;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  hasFireflies?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  variant = ButtonVariants.PRIMARY,
  size = ComponentSizes.MD,
  fullWidth = false,
  isLoading = false,
  disabled = false,
  type = "button",
  leaf,
  to,
  href,
  target,
  rel,
  className,
  children,
  hasFireflies,
  ...props
}) => {
  const isPrimary =
    (variant === ButtonVariants.PRIMARY || variant === ButtonVariants.NEON) &&
    !disabled &&
    !isLoading;

  const showFireflies = hasFireflies !== undefined ? hasFireflies : isPrimary;

  // Authentic MeritMoon Variants matching OG template exactly
  const variantClasses: Record<ButtonVariant, string> = {
    // Primary (.btn--forest): authentic silver-mint to emerald gradient, deep-forest text, radiant emerald glow
    [ButtonVariants.PRIMARY]: cn(
      "btn--forest",
      "bg-[linear-gradient(135deg,#C8D8C0_0%,#2E8B57_100%)] !text-[#020A05] [color:#020A05] [-webkit-text-fill-color:#020A05]",
      "border border-[#4DBF82]/40 shadow-[0_0_14px_rgba(46,139,87,0.5),0_0_28px_rgba(26,82,53,0.3)]",
      "hover:scale-[1.02] hover:bg-[#4DBF82] hover:border-[#4DBF82]",
      "hover:shadow-[0_0_12px_#4DBF82,0_0_26px_#2E8B57,0_0_50px_rgba(26,82,53,0.8),inset_0_0_14px_rgba(255,255,255,0.35)]",
      "hover:!text-[#020A05] hover:[color:#020A05] hover:[-webkit-text-fill-color:#020A05]",
      "active:scale-[0.98]",
      // Gloss sheen overlay
      "after:content-[''] after:absolute after:inset-0 after:rounded-full after:bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_0%,transparent_60%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-350 after:pointer-events-none",
    ),

    // Neon: High-glow radiant variant of primary
    [ButtonVariants.NEON]: cn(
      "btn--forest btn--neon",
      "bg-[linear-gradient(135deg,#E8F0E0_0%,#4DBF82_45%,#2E8B57_100%)] !text-[#020A05] [color:#020A05] [-webkit-text-fill-color:#020A05]",
      "border border-[#4DBF82] shadow-[0_0_24px_rgba(77,191,130,0.7),0_0_50px_rgba(46,139,87,0.4)]",
      "hover:scale-[1.03] hover:bg-[#4DBF82]",
      "hover:shadow-[0_0_36px_rgba(77,191,130,0.85),0_0_70px_rgba(46,139,87,0.5)]",
      "hover:!text-[#020A05] hover:[color:#020A05]",
      "active:scale-[0.98]",
    ),

    // Secondary / Ghost (.btn--ghost): frozen dark glass card, silver border, emerald hover glow
    [ButtonVariants.SECONDARY]: cn(
      "btn--ghost",
      "bg-[rgba(6,22,13,0.22)] backdrop-blur-[20px] backdrop-saturate-160",
      "!text-[#F4FAF0] [color:#F4FAF0] [-webkit-text-fill-color:#F4FAF0]",
      "border border-[rgba(200,216,192,0.15)]",
      "shadow-[0_16px_40px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.16),inset_0_0_24px_rgba(200,216,192,0.03)]",
      "hover:border-[#4DBF82] hover:bg-[rgba(10,34,19,0.35)]",
      "hover:!text-white hover:[color:#ffffff] hover:[-webkit-text-fill-color:#ffffff]",
      "hover:shadow-[0_0_10px_#4DBF82,0_0_24px_rgba(46,139,87,0.45),0_0_45px_rgba(26,82,53,0.25)]",
      "hover:[text-shadow:0_0_8px_#4DBF82]",
      "active:scale-[0.98]",
    ),

    // Tertiary: subtle translucent text button
    [ButtonVariants.TERTIARY]: cn(
      "bg-transparent !text-[#C8D8C0] [color:#C8D8C0] border border-transparent hover:bg-[#C8D8C0]/10 hover:!text-white hover:[color:#ffffff]",
      "active:translate-y-0",
    ),
  };

  // Authentic MeritMoon Size Tiers (Height & Padding matching OG pixel specs)
  const sizeClasses: Record<ComponentSize, string> = {
    [ComponentSizes.XS]:
      "min-h-[30px] px-3.5 py-1 text-[0.68rem] tracking-[0.12em]",
    // SM: Exact Nav Pill dimensions (padding: 9px 24px, 38px tall)
    [ComponentSizes.SM]:
      "min-h-[38px] px-6 py-[9px] text-[0.72rem] tracking-[0.16em]",
    // MD: Exact Standard Button dimensions (padding: 14px 36px, 48-50px tall)
    [ComponentSizes.MD]:
      "min-h-[48px] px-9 py-[14px] text-[0.82rem] tracking-[0.14em]",
    // LG: Exact Large Hero/CTA dimensions (padding: 16px 42px, 54px tall)
    [ComponentSizes.LG]:
      "min-h-[54px] px-10 py-4 text-[0.88rem] tracking-[0.15em]",
    [ComponentSizes.XL]:
      "min-h-[60px] px-12 py-4.5 text-[0.95rem] tracking-[0.15em]",
  };

  const buttonClasses = cn(
    "btn group relative inline-flex items-center justify-center gap-2.5 rounded-full select-none whitespace-nowrap cursor-pointer",
    "font-display [font-family:var(--font-display,'Moonjelly','Cormorant_SC',serif)] uppercase font-bold",
    "transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DBF82]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020A05]",
    variantClasses[variant] || variantClasses[ButtonVariants.PRIMARY],
    sizeClasses[size] || sizeClasses[ComponentSizes.MD],
    fullWidth && "w-full",
    (disabled || isLoading) &&
      "opacity-50 cursor-not-allowed pointer-events-none",
    isLoading && "cursor-wait",
    className,
  );

  const innerContent = isLoading ? (
    <span className="loading loading-spinner loading-sm" />
  ) : (
    <>
      <span className="relative z-1 inline-block transition-transform duration-300 group-hover:-translate-y-px">
        {children}
      </span>
      {leaf && (
        <span className="btn__leaf relative z-1 inline-block text-[1rem] leading-none transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115">
          {leaf}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        onClick={
          props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>
        }
      >
        {showFireflies && <ButtonFireflySwarm />}
        {innerContent}
      </Link>
    );
  }

  if (href) {
    const isBlank = target === "_blank";
    return (
      <a
        href={href}
        target={target}
        rel={rel || (isBlank ? "noopener noreferrer" : undefined)}
        className={buttonClasses}
        onClick={
          props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>
        }
      >
        {showFireflies && <ButtonFireflySwarm />}
        {innerContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={buttonClasses}
      {...props}
    >
      {showFireflies && <ButtonFireflySwarm />}
      {innerContent}
    </button>
  );
};

export default Button;
