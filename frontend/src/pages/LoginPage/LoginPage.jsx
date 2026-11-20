import react, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const apiUrl = import.meta.env.VITE_API_URL
import Spinner from "../../common/CustomSpinner/Spinner"

const LoginPage = () => {
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userPhone, setUserPhone] = useState()
    const [userAddress, setUserAddress] = useState()
    const [password, setPassword] = useState()
    const [mode, setMode] = useState('login')
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(true)

    const colors = [
    'bg-red-500',
    'bg-amber-500',
    'bg-amber-500',
    'bg-green-500',
    'bg-green-500',
    ];

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault() // stop browser's default form submission
        try {
            const res = await fetch(`${apiUrl}/api/users/createUser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userEmail,
                    userPassword: password,
                }),
            })
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || "Request failed")
            }
            console.log(result.message)
        } catch (e) {
            console.error("Error occured while creating account", e)
        } finally {
            navigate("/dashboard")
        }
    }

    const PasswordRater = (enteredPass) => {
        const hasCapital = /[A-Z]/.test(enteredPass)
        const hasNumber = /\d/.test(enteredPass)
        const hasSpecial = /[^A-Za-z0-9]/.test(enteredPass)

        if (enteredPass.length > 8 && hasSpecial && hasCapital && hasNumber) {
            setRating(5)
        }
        else if (enteredPass.length > 8 && hasSpecial || hasCapital || hasNumber ) {
            setRating(4)
        }
        else if (enteredPass.length === 8 && !hasSpecial || !hasCapital || hasNumber) {
            setRating(3)
        }
        else if (enteredPass.length <= 5 && !hasSpecial || !hasCapital || hasNumber) {
            setRating(2)
        }
        else if (enteredPass.length <= 3 && !hasSpecial || !hasCapital || hasNumber) {
            setRating(1)
        }
        else if (enteredPass.length === 0 && !hasSpecial || !hasCapital || hasNumber) {
            setRating(0)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-stone-200 px-4 py-10 sm:px-6">
            <section className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-9">
                <header className="mb-8">
                    <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 font-semibold text-sky-800">
                        DF
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                        {mode === 'login' ? 'Welcome back' : 'Welcome'}
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        {mode === 'login' ? 'Sign in to continue to your account' : 'Sign up to create your account'}
                    </p>
                </header>
                {
                    loading ? <Spinner/> : null
                }
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {mode !== 'signup' ? (<>
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                                    Email address
                                </label>
                                <input
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    required
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                                />
                            </div>
                        </>) : (<>
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                                    Name
                                </label>
                                <input
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    id="name"
                                    type="name"
                                    required
                                    autoComplete="name"
                                    placeholder="John Doe"
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                                />
                            </div>
                            <div>
                                <label htmlFor="Phone" className="mb-2 block text-sm font-medium text-slate-700">
                                    Phone
                                </label>
                                <input
                                    value={userPhone}
                                    onChange={(e) => setUserPhone(e.target.value)}
                                    id="tel"
                                    type="tel"
                                    required
                                    autoComplete="Phone"
                                    placeholder="+12 345 567890"
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                                />
                            </div>
                            <div>
                                <label htmlFor="Address" className="mb-2 block text-sm font-medium text-slate-700">
                                    Address
                                </label>
                                <input
                                    value={userAddress}
                                    onChange={(e) => setUserAddress(e.target.value)}
                                    id="address"
                                    type="address"
                                    autoComplete="Address"
                                    placeholder=" 401, Ocean View, 4th Street, Washington Beach."
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                                    Email address
                                </label>
                                <input
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                                />
                            </div>
                           <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value), PasswordRater(password)}}
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="Set password"
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                                />
                            </div>
                            <div className="flex gap-1">
                                {colors.map((color, index) => (
                                    <div
                                    key={index}
                                    className={`h-1.5 flex-1 rounded-full ${
                                        index < rating ? color : 'bg-gray-200'
                                    }`}
                                    />
                                ))}
                            </div>
                        </>)
                    }
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-sky-600 px-4 py-3 font-medium text-white transition hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-sky-200"
                    >
                        Sign in
                    </button>

                    <div className="justify-center flex gap-2">
                        <p>Already have an account?</p>
                        <button type="button" className="underline text-sky-600" onClick={() => setMode((previous) => previous === "login" ? "signup" : "login" )}>Sign In</button>
                    </div>

                </form>
            </section>
        </main>
    )
}

export default LoginPage
