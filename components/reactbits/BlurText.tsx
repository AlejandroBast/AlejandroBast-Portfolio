"use client"

import { motion } from "motion/react"
import { useMemo } from "react"

type BlurTextProps = {
  text: string
  className?: string
  /** Stagger between each segment, in seconds */
  delay?: number
  duration?: number
  splitType?: "chars" | "words"
  once?: boolean
}

/**
 * React Bits – BlurText
 * Segments fade in from a blur as the element scrolls into view.
 */
export default function BlurText({
  text,
  className = "",
  delay = 0.06,
  duration = 0.6,
  splitType = "words",
  once = true,
}: BlurTextProps) {
  const segments = useMemo(
    () => (splitType === "words" ? text.split(" ") : Array.from(text)),
    [text, splitType],
  )

  // Non-breaking space: a trailing normal space inside an inline-block
  // collapses, which would glue words together ("Quiénsoy").
  const NBSP = " "

  return (
    <span
      className={className}
      style={{ display: "inline-block" }}
      aria-label={text}
    >
      {segments.map((seg, i) => (
        <motion.span
          key={`${seg}-${i}`}
          aria-hidden
          style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once }}
          transition={{ duration, delay: i * delay, ease: "easeOut" }}
        >
          {seg === " " ? NBSP : seg}
          {splitType === "words" && i < segments.length - 1 ? NBSP : ""}
        </motion.span>
      ))}
    </span>
  )
}
