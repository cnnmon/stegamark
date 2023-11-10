import Back from '../components/Back';

export default function Encode() {
  return (
    <div className="gap-4 grid">
      <Back />
      <h2>Encode</h2>
      <div className="bg-gray-200 flex items-center p-4 rounded-lg gap-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Browse files...</button>
        <p>Upload an image to view</p>
      </div>

      <p className="">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  )
}