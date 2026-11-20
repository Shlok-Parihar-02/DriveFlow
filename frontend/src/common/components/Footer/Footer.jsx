const Footer = () => {
    return (
        <footer className="w-full border-t border-sky-100 bg-white">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 px-4 py-5 text-center sm:px-6 sm:py-6 lg:px-8">
                <p className="text-sm text-slate-600">
                    &copy; {" "}
                    <a
                        href="https://github.com/Shlok-Parihar"
                        className="font-medium text-sky-700 transition hover:text-sky-800 hover:underline focus:outline-none focus:ring-2 focus:ring-sky-300"
                    >
                        Shlok Parihar {" "}
                    </a>
                    2026
                </p>
            </div>
        </footer>
    )
}

export default Footer
