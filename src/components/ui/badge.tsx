import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-all border border-ink",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary-dark text-ink",
        secondary: "bg-gradient-to-r from-secondary to-[#B87A4A] text-white",
        accent: "bg-gradient-to-r from-accent to-accent-dark text-white",
        tertiary: "bg-gradient-to-r from-tertiary to-secondary-dark text-white",
        outline: "bg-white text-ink border-ink",
        destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white",
        success: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
