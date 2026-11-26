import { useEffect, useId, useRef, useState } from "react"

const normalizeOption = (option) => {
    if (typeof option === "string" || typeof option === "number") {
        return { value: option, label: String(option), disabled: false }
    }

    return {
        ...option,
        label: option.label ?? String(option.value),
        disabled: Boolean(option.disabled),
    }
}

const CustomSelect = ({
    options = [],
    value,
    defaultValue,
    onChange,
    placeholder = "Select an option",
    label,
    name,
    disabled = false,
    className = "",
}) => {
    const selectId = useId()
    const containerRef = useRef(null)
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const normalizedOptions = options.map(normalizeOption)
    const selectedValue = value === undefined ? internalValue : value
    const selectedIndex = normalizedOptions.findIndex((option) => Object.is(option.value, selectedValue))
    const selectedOption = normalizedOptions[selectedIndex]
    const availableIndices = normalizedOptions.reduce(
        (indices, option, index) => (option.disabled ? indices : [...indices, index]),
        [],
    )
    const isDisabled = disabled || availableIndices.length === 0
    const listboxId = `${selectId}-listbox`

    useEffect(() => {
        if (!isOpen) return undefined

        const handlePointerDown = (event) => {
            if (!containerRef.current?.contains(event.target)) setIsOpen(false)
        }

        document.addEventListener("pointerdown", handlePointerDown)
        return () => document.removeEventListener("pointerdown", handlePointerDown)
    }, [isOpen])

    const openMenu = () => {
        if (isDisabled) return

        const selectedAvailable = availableIndices.includes(selectedIndex)
        setActiveIndex(selectedAvailable ? selectedIndex : availableIndices[0])
        setIsOpen(true)
    }

    const moveActiveOption = (direction) => {
        const currentPosition = availableIndices.indexOf(activeIndex)
        const nextPosition =
            currentPosition === -1
                ? direction > 0
                    ? 0
                    : availableIndices.length - 1
                : (currentPosition + direction + availableIndices.length) % availableIndices.length

        setActiveIndex(availableIndices[nextPosition])
    }

    const selectOption = (option) => {
        if (option.disabled) return

        if (value === undefined) setInternalValue(option.value)
        onChange?.(option.value, option)
        setIsOpen(false)
    }

    const handleKeyDown = (event) => {
        if (isDisabled) return

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault()
            if (!isOpen) {
                openMenu()
            } else {
                moveActiveOption(event.key === "ArrowDown" ? 1 : -1)
            }
        } else if (event.key === "Home" && isOpen) {
            event.preventDefault()
            setActiveIndex(availableIndices[0])
        } else if (event.key === "End" && isOpen) {
            event.preventDefault()
            setActiveIndex(availableIndices[availableIndices.length - 1])
        } else if ((event.key === "Enter" || event.key === " ") && isOpen) {
            event.preventDefault()
            const option = normalizedOptions[activeIndex]
            if (option) selectOption(option)
        } else if (event.key === "Escape" && isOpen) {
            event.preventDefault()
            setIsOpen(false)
        }
    }

    return (
        <div ref={containerRef} className={`relative w-min ${className}`}>
            {label && (
                <label
                    htmlFor={`${selectId}-trigger`}
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                    {label}
                </label>
            )}
            <button
                id={`${selectId}-trigger`}
                type="button"
                role="combobox"
                aria-label={label || "Select an option"}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={listboxId}
                aria-activedescendant={isOpen && activeIndex >= 0 ? `${selectId}-option-${activeIndex}` : undefined}
                disabled={isDisabled}
                onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
                onKeyDown={handleKeyDown}
                onBlur={() => setIsOpen(false)}
                className="flex min-h-11 w-[250px] items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-left text-sm text-slate-800 shadow-sm outline-none transition duration-200 hover:border-sky-300 focus-visible:border-sky-600 focus-visible:ring-4 focus-visible:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 motion-reduce:transition-none"
            >
                <span className={`truncate ${selectedOption ? "" : "text-slate-400"}`}>
                    {selectedOption?.label ?? placeholder}
                </span>
                <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`size-4 shrink-0 text-slate-400 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""
                        }`}
                >
                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {name && <input type="hidden" name={name} value={selectedOption?.value ?? ""} />}

            <div
                id={listboxId}
                role="listbox"
                aria-hidden={!isOpen}
                className={`absolute z-20 mt-1.5 max-h-60 w-full origin-top overflow-y-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-200/60 transition duration-150 ease-out motion-reduce:transition-none ${isOpen
                        ? "visible translate-y-0 scale-100 opacity-100"
                        : "invisible -translate-y-1 scale-[0.98] opacity-0"
                    }`}
            >
                {normalizedOptions.map((option, index) => {
                    const isSelected = index === selectedIndex
                    const isActive = index === activeIndex

                    return (
                        <div
                            key={`${String(option.value)}-${index}`}
                            id={`${selectId}-option-${index}`}
                            role="option"
                            aria-selected={isSelected}
                            aria-disabled={option.disabled || undefined}
                            onClick={() => selectOption(option)}
                            onMouseMove={() => !option.disabled && setActiveIndex(index)}
                            className={`flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-100 motion-reduce:transition-none ${option.disabled
                                    ? "cursor-not-allowed text-slate-300"
                                    : isActive || isSelected
                                        ? "bg-sky-50 text-sky-700"
                                        : "text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            <span className="truncate">{option.label}</span>
                            {isSelected && (
                                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 shrink-0 text-sky-600">
                                    <path d="m5 10 3.2 3.2L15 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CustomSelect