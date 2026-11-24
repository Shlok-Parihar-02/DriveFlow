import { useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers"

const calendarTheme = createTheme({
    palette: {
        primary: {
            main: "#0284c7",
        },
    },
})

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

const CustomCalendar = ({ value, onChange, label }) => {
    const [internalDate, setInternalDate] = useState(() => parseDate(value))
    const selectedDate = value === undefined ? internalDate : parseDate(value)

    const handleDateChange = (date) => {
        if (value === undefined) setInternalDate(date)
        if (date) onChange?.(formatDate(date))
    }

    return (
        <ThemeProvider theme={calendarTheme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <span>{label}</span>
                <div className="w-full max-w-sm rounded-xl border border-slate-200 p-1">
                    <DateCalendar
                        value={selectedDate}
                        onChange={handleDateChange}
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            "& .MuiPickersDay-root": {
                                borderRadius: "0.75rem",
                            },
                        }}
                    />
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default CustomCalendar
