import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const bannerVariants = cva(
  "relative w-full",
  {
    variants: {
      variant: {
        default: "bg-background border border-border",
        muted: "dark bg-muted",
        border: "border-b border-border",
      },
      size: {
        sm: "px-4 py-2",
        default: "px-4 py-3",
        lg: "px-4 py-3 md:py-2",
      },
      rounded: {
        none: "",
        default: "rounded-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "none",
    }
  }
)

interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode
  action?: React.ReactNode
  onClose?: () => void
  isClosable?: boolean
  layout?: "row" | "center" | "complex"
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, size, rounded, icon, action, onClose, isClosable, layout = "row", children, ...props }, ref) => {
    const innerContent = (
      <div className={cn(
        "flex gap-2 w-full",
        layout === "center" && "justify-center",
        layout === "complex" && "md:items-center"
      )}>
        {layout === "complex" ? (
          <div className="flex grow gap-3 md:items-center">
            {icon && (
              <div className="flex shrink-0 items-center gap-3 max-md:mt-0.5">
                {icon}
              </div>
            )}
            <div className={cn(
              "flex grow",
              layout === "complex" && "flex-col justify-between gap-3 md:flex-row md:items-center"
            )}>
              {children}
            </div>
          </div>
        ) : (
          <>
            {icon && (
              <div className="flex shrink-0 items-center gap-3">
                {icon}
              </div>
            )}
            <div className="flex grow items-center justify-between gap-3">
              {children}
            </div>
          </>
        )}
        {(action || isClosable) && (
          <div className="flex items-center gap-3">
            {action}
            {isClosable && (
              <Button
                variant="ghost"
                className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
                onClick={onClose}
                aria-label="Close banner"
              >
                <X
                  size={16}
                  strokeWidth={2}
                  className="opacity-60 transition-opacity group-hover:opacity-100 text-gray-400 hover:text-white"
                  aria-hidden="true"
                />
              </Button>
            )}
          </div>
        )}
      </div>
    )

    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant, size, rounded }), className)}
        {...props}
      >
        {innerContent}
      </div>
    )
  }
)
Banner.displayName = "Banner"

interface BannerWithLinkProps {
  onClose?: () => void;
}

function BannerWithLink({ onClose }: BannerWithLinkProps) {
  return (
    <Banner 
      variant="border" 
      size="default"
      isClosable={true} 
      onClose={onClose}
      className="bg-[#12151C] border-[#2A2E37] text-[#F5F7FA]"
      icon={
        <Sparkles 
          className="mt-0.5 shrink-0 text-[#7C5CFF]"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      }
    >
      <div className="flex grow flex-col justify-between gap-2 md:flex-row md:items-center w-full">
        <p className="text-sm text-[#9CA3AF]">
          <span className="font-semibold text-white mr-1.5">AtticNote v1.1.0 is here!</span>
          Experience nested sub-pages, secure remember sessions, and persistent block editing.
        </p>
        <Link href="/changelog/1.1.0" className="group whitespace-nowrap text-sm font-medium text-[#7C5CFF] hover:text-[#A890FF] transition-colors flex items-center gap-1">
          Learn more
          <ArrowRight
            className="-mt-0.5 ms-1 inline-flex opacity-80 transition-transform group-hover:translate-x-0.5"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Link>
      </div>
    </Banner>
  )
}

export { Banner, type BannerProps, BannerWithLink }
