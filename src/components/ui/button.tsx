import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-bold transition-all rounded-xl active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-primary to-primary-dark text-ink border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover",
        secondary: "bg-gradient-to-br from-secondary to-secondary-dark text-white border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover",
        accent: "bg-gradient-to-br from-accent to-accent-dark text-white border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover",
        outline: "bg-white text-ink border-2 border-ink hover:bg-primary/10 hover:card-shadow-hard active:card-shadow-none dark:bg-zinc-900 dark:text-white",
        ghost: "bg-transparent text-ink border-2 border-transparent hover:border-ink/30 dark:text-white",
        danger: "bg-gradient-to-br from-red-600 to-red-700 text-white border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover",
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
