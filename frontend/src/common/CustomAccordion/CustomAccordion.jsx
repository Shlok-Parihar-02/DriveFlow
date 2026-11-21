import { useState } from "react"

const CustomAccordion = ({ items = [] }) => {
    const [openItemId, setOpenItemId] = useState(null)

    const toggleItem = (id) => {
        setOpenItemId((currentId) => (currentId === id ? null : id))
    }

    return (
        <section className="w-full">
            <div className="divide-y divide-sky-100 rounded-xl border border-sky-100 bg-white">
                {items.length > 0 ? (
                    items.map(({ id, question, answer }, index) => {
                        const itemId = id ?? question ?? index
                        const answerId = `accordion-answer-${index}`
                        const isOpen = openItemId === itemId

                        return (
                        <div key={itemId} className="p-3 sm:p-5">
                            <button
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={answerId}
                                onClick={() => toggleItem(itemId)}
                                className="group flex w-full items-center justify-between gap-3 text-left text-sm font-medium text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:gap-4 sm:text-base"
                            >
                                <span className="min-w-0 flex-1 break-words">{question}</span>
                                <span
                                    aria-hidden="true"
                                    className={`shrink-0 text-xl leading-none text-sky-700 transition-transform duration-300 motion-reduce:transition-none ${
                                        isOpen ? "rotate-45" : ""
                                    }`}
                                >
                                    +
                                </span>
                            </button>
                            <div
                                id={answerId}
                                aria-hidden={!isOpen}
                                className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
                                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}
                            >
                                <div className="min-h-0 overflow-hidden">
                                    <p className="pt-2 text-sm leading-6 text-slate-600 sm:pt-3 sm:pr-7">
                                        {answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                        )
                    })
                ) : (
                    <p className="p-3 text-sm text-slate-500 sm:p-5">No FAQs available yet.</p>
                )}
            </div>
        </section>
    )
}

export default CustomAccordion