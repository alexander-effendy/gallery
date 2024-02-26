import React, {useState} from "react";

const ImageSearch = ({ searchText }) => {

  const [text, setText] = useState('');

  const submit = (e) => {
    e.preventDefault();
    searchText(text);
  }

  return (
    <div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
      <form onSubmit={submit} className="w-full max-w-sm">
        <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
          
            className="appearance-none bg-transparent border-none w-full text-gray-700 nr-3 py-1 px-2 leading-tight focus:outline-none" 
            type="text" 
            placeholder="Search Image Term..." 
            onChange={e => {
              setText(e.target.value);
              console.log(text);
            }}
          />

          <button 
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 rexr-sm border-4 text-white py-1 px-2 rounded" 
            type="submit" 
          >Search</button>
          
        </div>
      </form>

    </div>
  )
}

export default ImageSearch;