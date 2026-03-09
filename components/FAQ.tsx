"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
  title?: string
}

export default function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="border-t border-border px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {title}
        </h2>

        <div className="border border-border rounded-2xl overflow-hidden">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            const isLast = index === items.length - 1

            return (
              <div key={item.question} className={isLast ? "" : "border-b border-border"}>
                <button
                  onClick={() => toggle(index)}
                  className={`w-full flex items-center justify-between gap-4 py-5 px-6 text-left transition-colors hover:bg-surface-hover ${isOpen ? "text-brand" : "text-foreground"}`}
                >
                  <span className="font-heading font-semibold">{item.question}</span>
                  <span className="shrink-0 text-foreground-muted text-lg leading-none">
                    {isOpen ? "×" : "+"}
                  </span>
                </button>

                {/* CSS grid trick: animeer van 0fr naar 1fr zonder JS height berekeningen */}
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-foreground-muted text-sm leading-relaxed pb-5 px-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
