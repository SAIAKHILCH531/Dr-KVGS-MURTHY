import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

const buttonVariants = {
  default: "bg-[#2F5A3D] text-white hover:bg-[#2F5A3D]/90",
  outline: "border border-[#2F5A3D] text-[#2F5A3D] hover:bg-[#2F5A3D]/10",
  ghost: "hover:bg-[#2F5A3D]/10",
  link: "text-[#2F5A3D] underline-offset-4 hover:underline"
}

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
  icon: "h-10 w-10"
}

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  asChild = false, 
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "rounded-md font-medium transition-colors focus-visible:outline-none",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }