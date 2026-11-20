const Navbar = () => {
    return (
        <header className="w-full border-b border-sky-100 bg-white">
            <nav
                aria-label="Main navigation"
                className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
            >
                <a
                    href="/"
                    className="text-lg font-semibold tracking-tight text-sky-800 sm:text-xl"
                >
                    DriveFlow
                </a>

                <button
                    type="button"
                    aria-label="Profile"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 transition hover:bg-sky-200 focus:outline-none focus:ring-4 focus:ring-sky-100"
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                    >
                        <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.8" />
                        <path
                            d="M5.5 19a6.5 6.5 0 0 1 13 0"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </nav>
        </header>
    )
}

export default Navbar