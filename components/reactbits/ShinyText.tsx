"use client"

type ShinyTextProps = {
  text: string
  disabled?: boolean
  /** Seconds for one shimmer sweep */
  speed?: number
  className?: string
}

/**
 * React Bits – ShinyText
 * A light shimmer sweeps across the text. Styling lives in globals.css
 * (`.shiny-text`), matching how React Bits ships this component.
 */
export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${disabled ? "shiny-text--disabled" : ""} ${className}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
    </span>
  )
}
