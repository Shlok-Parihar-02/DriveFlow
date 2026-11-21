const Spinner = () => (
    <div
        role="status"
        aria-label="Loading"
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300/40"
    >
        <span
            aria-hidden="true"
            className="relative block h-15 w-15 animate-spin rounded-full bg-[conic-gradient(from_0deg,#e5e7eb,#9ca3af,#4b5563,#e5e7eb)]"
        >
            <span className="absolute inset-[1px] rounded-full bg-transparent" />
        </span>
    </div>
)

export default Spinner