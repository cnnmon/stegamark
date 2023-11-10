import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-xl">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;