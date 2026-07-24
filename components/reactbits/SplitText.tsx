"use client"

import { motion } from "motion/react"
import { useMemo } from "react"

type SplitTextProps = {
  text: string
  className?: string
  /** Stagger between each segment, in seconds */
  delay?: number
  /** Duration of each segment's animation, in seconds */
  duration?: number
  /** Split by characters or by words */
  splitType?: "chars" | "words"
  /** Vertical offset the segments animate up from */
  yFrom?: number
  /** Extra delay before the whole animation begins, in seconds */
  startDelay?: number
  once?: boolean
}

/**
 * React Bits – SplitText
 * Reveals text one character (or word) at a time as it enters the viewport.
 * Reimplemented on `motion` so it needs no extra runtime beyond the one
 * React Bits already relies on.
 */
export default function SplitText({
  text,
  className = "",
  delay = 0.04,
  duration = 0.6,
  splitType = "chars",
  yFrom = 40,
  startDelay = 0,
  once = true,
}: SplitTextProps) {
  const segments = useMemo(
    () => (splitType === "words" ? text.split(" ") : Array.from(text)),
    [text, splitType],
  )

  return (
    <span
      className={className}
      style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
      aria-label={text}
    >
      {segments.map((seg, i) => (
        <motion.span
          key={`${seg}-${i}`}
          aria-hidden
          style={{ display: "inline-block", willChange: "transform, opacity" }}
          initial={{ opacity: 0, y: yFrom }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once }}
          transition={{
            duration,
            delay: startDelay + i * delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {seg === " " ? " " : seg}
          {splitType === "words" ? " " : ""}
        </motion.span>
      ))}
    </span>
  )
}
