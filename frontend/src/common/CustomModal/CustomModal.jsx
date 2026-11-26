import { useEffect, useId, useRef } from "react"

const SIZE_CLASSES = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
}

const CustomModal = ({
    isOpen = false,
    onClose,
    title,
    children,
    size = "md",
    closeOnBackdrop = true,
    className = "",
}) => {
    const titleId = useId()
    const dialogRef = useRef(null)
    const closeButtonRef = useRef(null)

    useEffect(() => {
        if (!isOpen) return undefined

        const previousOverflow = document.body.style.overflow
        const previouslyFocused = document.activeElement
        document.body.style.overflow = "hidden"
        closeButtonRef.current?.focus()

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose?.()
                return
            }

            if (event.key !== "Tab") return

            const focusableElements = dialogRef.current?.querySelectorAll(
                'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            )
            if (!focusableElements?.length) {
                event.preventDefault()
                return
            }

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault()
                lastElement.focus()
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault()
                firstElement.focus()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener("keydown", handleKeyDown)
            if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
        }
    }, [isOpen, onClose])

    const handleBackdropClick = (event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) onClose?.()
    }

    return (
        <div
            aria-hidden={!isOpen}
            inert={!isOpen}
            onClick={handleBackdropClick}
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                isOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
        >
            <section
                ref={dialogRef}
                role="dialog"
                aria-modal={isOpen ? "true" : undefined}
                aria-labelledby={title ? titleId : undefined}
                tabIndex={-1}
                className={`relative my-auto w-full ${SIZE_CLASSES[size] ?? SIZE_CLASSES.md} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 transition duration-200 ease-out motion-reduce:transition-none ${
                    isOpen ? "translate-y-0 scale-100" : "translate-y-2 scale-[0.98]"
                } ${className}`}
            >
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
                    <div className="min-w-0">
                        {title && (
                            <h2 id={titleId} className="text-lg font-semibold text-slate-900">
                                {title}
                            </h2>
                        )}
                    </div>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        aria-label="Close dialog"
                        onClick={onClose}
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors duration-150 hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100 motion-reduce:transition-none"
                    >
                        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-5">
                            <path
                                d="m5 5 10 10M15 5 5 15"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
                {children != null && <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">{children}</div>}
                <div className="h-0.5 bg-gradient-to-r from-sky-100 via-sky-600 to-sky-100" />
            </section>
        </div>
    )
}

export default CustomModal
