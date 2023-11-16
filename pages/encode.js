import Back from '../components/Back';

function listUsers() {
    fetch('/api/notion_listUsers')
      .then((response) => response.json())
      .then((data) => console.log(data));
}

function createDB() {
  fetch('/api/notion_createDB')
      .then((response) => response.json())
      .then((data) => console.log(data)); 
}

function createEntry() {
  fetch('/api/notion_createEntry')
      .then((response) => response.json())
      .then((data) => console.log(data)); 
}

function readEntry() {
  fetch('/api/notion_readEntry')
      .then((response) => response.json())
      .then((data) => console.log(data)); 
}

function updateEntry() {
  fetch('/api/notion_updateEntry')
      .then((response) => response.json())
      .then((data) => console.log(data)); 
}

function archiveEntry() {
  fetch('/api/notion_archiveEntry')
      .then((response) => response.json())
      .then((data) => console.log(data)); 
}

export default function Encode() {

  return (
    <div className="gap-4 grid">
      <Back />
      <h2>Encode my image</h2>
      <div className="bg-gray-200 flex items-center p-4 rounded-lg gap-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={archiveEntry}
        >Browse files...</button>
        <p>Upload an image to view</p>
      </div>

      <p className="">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  )
}