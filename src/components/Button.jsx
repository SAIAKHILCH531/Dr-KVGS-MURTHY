import * as React from "react"

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
  asChild,
  ...props 
}, ref) => {
  const baseClasses = "rounded-md font-medium transition-colors focus-visible:outline-none"
  const variantClasses = buttonVariants[variant]
  const sizeClasses = buttonSizes[size]
  const combinedClasses = [baseClasses, variantClasses, sizeClasses, className].filter(Boolean).join(" ")

  return (
    <button
      className={combinedClasses}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }