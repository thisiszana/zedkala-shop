import React, { useState } from 'react'

export default function SearchBox() {
  const [isOpen, setIsOpen] = useState(false) // برای مدیریت باز و بسته شدن باکس جستجو
  const [query, setQuery] = useState("")      // برای ذخیره کردن متن وارد شده در جستجو

  const handleSearchClick = () => {
    setIsOpen(!isOpen) // باز و بسته کردن باکس جستجو
  }

  return (
    <div className="relative">
      {/* دکمه آیکون جستجو */}
      <button
        onClick={handleSearchClick}
        className="p-2 bg-gray-200 rounded-full shadow-lg focus:outline-none hover:bg-gray-300 transition-all duration-300"
      >
        {/* اینجا آیکون جستجوی شما قرار می‌گیرد */}
        <img src="/path/to/your/icon.svg" alt="Search" className="w-6 h-6" />
      </button>

      {/* باکس جستجو */}
      {isOpen && (
        <div className="absolute top-12 left-0 right-0 mt-2 p-4 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* نتایج جستجو */}
          {query && (
            <ul className="mt-2">
              <li className="py-1 px-2 hover:bg-gray-100">Result 1 for "{query}"</li>
              <li className="py-1 px-2 hover:bg-gray-100">Result 2 for "{query}"</li>
              <li className="py-1 px-2 hover:bg-gray-100">Result 3 for "{query}"</li>
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
