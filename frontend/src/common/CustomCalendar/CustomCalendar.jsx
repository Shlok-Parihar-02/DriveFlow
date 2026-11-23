import { useState } from "react"

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1)

const parseDate = (value) => {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null

    const [year, month, day] = value.split("-").map(Number)
    const date = new Date(year, month - 1, day)

    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
        ? date
        : null
}

const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

const CustomCalendar = ({ value, onChange }) => {
    const [internalDate, setInternalDate] = useState(() => parseDate(value))
    const [viewMonth, setViewMonth] = useState(() => startOfMonth(parseDate(value) ?? new Date()))
    const selectedDate = value === undefined ? internalDate : parseDate(value)
    const today = new Date()
    const monthLabel = viewMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })
    const selectedLabel = selectedDate?.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    const firstWeekday = startOfMonth(viewMonth).getDay()
    const calendarDays = Array.from({ length: 42 }, (_, index) => {
        const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), index - firstWeekday + 1)

        return {
            date,
            inCurrentMonth: date.getMonth() === viewMonth.getMonth(),
            isToday: formatDate(date) === formatDate(today),
            isSelected: selectedDate && formatDate(date) === formatDate(selectedDate),
        }
    })

    const selectDate = (date) => {
        if (value === undefined) setInternalDate(date)
        onChange?.(formatDate(date))
        setViewMonth(startOfMonth(date))
    }

    const changeMonth = (offset) => {
        setViewMonth((currentMonth) => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1))
    }

    const selectToday = () => selectDate(today)

    return (
        <section
            aria-label="Date picker"
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-lg shadow-slate-200/60 sm:p-6"
        >
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Select date</p>
                    <p className="mt-1 min-h-6 text-sm font-medium text-slate-700" aria-live="polite">
                        {selectedLabel ?? "Choose a day"}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={selectToday}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-sky-700 transition-colors duration-150 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                    Today
                </button>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold tracking-tight text-slate-900" aria-live="polite">
                    {monthLabel}
                </h2>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        aria-label="Previous month"
                        onClick={() => changeMonth(-1)}
                        className="grid size-9 place-items-center rounded-lg text-slate-500 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 motion-reduce:transition-none"
                    >
                        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
                            <path d="m12 4-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        aria-label="Next month"
                        onClick={() => changeMonth(1)}
                        className="grid size-9 place-items-center rounded-lg text-slate-500 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 motion-reduce:transition-none"
                    >
                        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
                            <path d="m8 4 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-y-1 text-center">
                {WEEKDAYS.map((day) => (
                    <div key={day} aria-hidden="true" className="pb-2 text-xs font-medium text-slate-400">
                        {day}
                    </div>
                ))}
                {calendarDays.map(({ date, inCurrentMonth, isToday, isSelected }) => (
                    <button
                        key={formatDate(date)}
                        type="button"
                        aria-label={date.toLocaleDateString(undefined, {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                        aria-pressed={Boolean(isSelected)}
                        onClick={() => selectDate(date)}
                        className={`mx-auto grid size-9 place-items-center rounded-xl text-sm transition-all duration-150 ease-out hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1 motion-reduce:transform-none motion-reduce:transition-none ${
                            isSelected
                                ? "bg-sky-600 font-semibold text-white shadow-sm shadow-sky-600/25 hover:bg-sky-700"
                                : isToday
                                  ? "font-semibold text-sky-700 ring-1 ring-inset ring-sky-200 hover:bg-sky-50"
                                  : inCurrentMonth
                                    ? "text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                                    : "text-slate-300 hover:bg-slate-50 hover:text-slate-500"
                        }`}
                    >
                        {date.getDate()}
                    </button>
                ))}
            </div>
        </section>
    )
}

export default CustomCalendar
