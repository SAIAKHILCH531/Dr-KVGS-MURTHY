export const Section = ({ 
  children, 
  className, 
  background = "default",
  containerWidth = "max-w-7xl",
  padding = "py-16 px-4"
}) => {
  const backgrounds = {
    default: "bg-background",
    primary: "bg-[#2F5A3D] text-white",
    secondary: "bg-[#f3f9f3]",
    gradient: "bg-gradient-to-br from-[#2F5A3D] to-[#6B4D3D] text-white"
  }

  const sectionClasses = [backgrounds[background], className].filter(Boolean).join(" ")
  const containerClasses = ["mx-auto", containerWidth, padding].filter(Boolean).join(" ")

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        {children}
      </div>
    </section>
  )
}

export const SectionHeading = ({ 
  title, 
  subtitle,
  className,
  align = "center" 
}) => {
  const headingClasses = [
    "mb-12",
    align === "center" && "text-center",
    className
  ].filter(Boolean).join(" ")

  return (
    <div className={headingClasses}>
      <h2 className="text-3xl font-semibold text-[#2F5A3D] mb-4">{title}</h2>
      {subtitle && (
        <p className="text-[#4b6c4b] text-lg">{subtitle}</p>
      )}
    </div>
  )
}