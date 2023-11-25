import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <div className="h-16 w-full"></div>
            <div className="w-full max-w-[900px] py-16 px-4">
                <Component {...pageProps} />
            </div>
        </div>
    );
}

export default MyApp;
