import "tailwindcss/tailwind.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <div className="min-h-screen items-center py-24 py-24 px-24 bg-stone-800 text-gray-400">
            <div className="">
                <Component {...pageProps} />
            </div>
        </div>
    );
}

export default MyApp;
