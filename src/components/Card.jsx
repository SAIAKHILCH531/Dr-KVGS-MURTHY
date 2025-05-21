export const Card = ({
  icon,
  title,
  description,
  link,
  linkText = "Learn More",
  className
}) => {
  const cardClasses = ["p-6 bg-white rounded-lg shadow-sm text-center", className].filter(Boolean).join(" ")

  return (
    <div className={cardClasses}>
      {icon && (
        <div className="text-[#2F5A3D] text-3xl mb-4">{icon}</div>
      )}
      <h3 className="text-xl font-semibold text-[#2F5A3D] mb-2">{title}</h3>
      <p className="text-[#4b6c4b] text-sm">{description}</p>
      {link && (
        <a 
          href={link} 
          className="text-[#2F5A3D] hover:text-[#4a8a5e] mt-4 inline-flex items-center"
        >
          {linkText} 
          <svg 
            className="ml-1 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      )}
    </div>
  )
}