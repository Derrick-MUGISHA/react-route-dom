export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-6xl font-bold text-orange-600">404</h1>
            <p className="text-xl mt-4">Page Not Found</p>
            <div className="mt-6">
                <a
                    href="/"
                    className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-400"
                >
                    Go to Home
                </a>
            </div>
        </div>
    )
}