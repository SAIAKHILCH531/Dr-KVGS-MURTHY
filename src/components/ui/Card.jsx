import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { cn } from "../../lib/utils"

export const Card = ({
  icon,
  title,
  description,
  link,
  linkText = "Learn More",
  className
}) => {
  return (
    <div className={cn(
      "p-6 bg-white rounded-lg shadow-sm text-center",
      className
    )}>
      {icon && (
        <div className="text-[#2F5A3D] text-3xl mb-4">{icon}</div>
      )}
      <h3 className="text-xl font-semibold text-[#2F5A3D] mb-2">{title}</h3>
      <p className="text-[#4b6c4b] text-sm">{description}</p>
      {link && (
        <Link 
          to={link} 
          className="text-[#2F5A3D] hover:text-[#4a8a5e] mt-4 inline-flex items-center"
        >
          {linkText} <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      )}
    </div>
  )
}