import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const ButtonIcon = ({ direction }) => {
  const Icon = direction === 'left' ? ArrowLeft : ArrowRight
  return <Icon className="w-8 h-8 text-white/80" />
}

const NavigationButton = ({ direction, onClick }) => {
  const hoverTransform = direction === 'left' ? 'hover:translate-x-1' : 'hover:-translate-x-1'
  
  return (
    <button 
      onClick={onClick}
      className={`
        p-4 
        backdrop-blur-sm 
        rounded-full 
        transition-all 
        duration-200
        hover:bg-black/20 
        ${hoverTransform}
        absolute
        top-1/2
        -translate-y-1/2
        ${direction === 'left' ? 'left-8' : 'right-8'}
      `}
    >
      <ButtonIcon direction={direction} />
    </button>
  )
}

function NavigationButtons({ onPrevious, onNext, style = "default", className = "" }) {
  if (style === "side") {
    return (
      <div className={`
        fixed 
        inset-0
        z-[100]
        hidden 
        md:block
        pointer-events-none
        ${className}
      `}>
        <div className="relative w-full h-full">
          <div className="pointer-events-auto">
            <NavigationButton 
              direction="left" 
              onClick={onPrevious} 
            />
            <NavigationButton 
              direction="right" 
              onClick={onNext} 
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex gap-4 ${className}`}>
      <NavigationButton direction="left" onClick={onPrevious} />
      <NavigationButton direction="right" onClick={onNext} />
    </div>
  )
}

export default NavigationButtons
