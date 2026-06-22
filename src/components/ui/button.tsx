"use client"

import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-bold transition-all rounded-[16px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brick disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-brick text-ink border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover",
        brick: "bg-brick text-white border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover",
        olive: "bg-olive text-white border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover",
        outline: "bg-card text-ink border-2 border-ink hover:bg-brick/10 hover:card-shadow-hard active:card-shadow-none",
        ghost: "bg-transparent text-ink border-2 border-transparent hover:border-ink/30",
        danger: "bg-red-600 text-white border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-13 px-8 text-lg",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
