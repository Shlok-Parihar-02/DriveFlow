const PURPOSES = {
    book: {
        label: "Book",
        style: "border-sky-600 bg-sky-600 text-white shadow-sm hover:border-sky-700 hover:bg-sky-700 hover:shadow-md",
        icon: (
            <path
                d="M4 10h12m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        ),
    },
    new: {
        label: "New",
        style: "border-sky-200 bg-white text-sky-700 hover:border-sky-300 hover:bg-sky-50",
        icon: (
            <path
                d="M10 4v12m-6-6h12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        ),
    },
    "view more": {
        label: "View more",
        style: "border-transparent bg-transparent text-sky-700 hover:bg-sky-50",
        icon: (
            <>
                <path
                    d="M2.5 10s2.7-5 7.5-5 7.5 5 7.5 5-2.7 5-7.5 5-7.5-5-7.5-5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                />
                <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.6" />
            </>
        ),
    },
}

const CustomButton = ({
    purpose = "book",
    children,
    className = "",
    type = "button",
    disabled = false,
    onClick,
    "aria-label": ariaLabel,
    ...buttonProps
}) => {
    const config = PURPOSES[purpose] ?? PURPOSES.book
    const contentLabel = typeof children === "string" && children.trim() ? children.trim() : config.label
    const label = ariaLabel ?? contentLabel

    return (
        <button
            {...buttonProps}
            type={type}
            disabled={disabled}
            onClick={onClick}
            aria-label={label}
            className={`group relative inline-flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-lg border px-0 text-sm font-semibold transition duration-150 ease-out hover:-translate-y-px focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transform-none motion-reduce:transition-none sm:h-11 sm:w-auto sm:px-4 ${config.style} ${className}`}
        >
            <span className="hidden sm:inline">{children ?? config.label}</span>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 shrink-0">
                {config.icon}
            </svg>
            <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] z-30 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none sm:hidden"
            >
                {label}
            </span>
        </button>
    )
}

export default CustomButton
