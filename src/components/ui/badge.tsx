import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest transition-all border border-ink font-mono",
  {
    variants: {
      variant: {
        default: "bg-brick text-white",
        brick: "bg-brick text-ink",
        olive: "bg-olive text-white",
        outline: "bg-card text-ink",
        destructive: "bg-red-600 text-white",
        success: "bg-olive text-white",
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
