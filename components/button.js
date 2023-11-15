export default function Button({ page, text }) {
    const onClick = () => {
        window.location.href = `/${page}`;
    };

    return (
        <button
            onClick={onClick}
            className="bg-gray-400 flex items-center rounded-lg w-[100px] h-[25px] justify-center p-5 text-white"
        >
            {text}
        </button>
    );
}
