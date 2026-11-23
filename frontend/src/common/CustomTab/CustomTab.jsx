import { useState, useEffect } from 'react'

const CustomTab = ({TabValues, activeTab, setActiveTab}) => {
  
  const tabs = TabValues

  return (
    <div className="flex gap-6 justify-center">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-2 capitalize border-b-2 transition-colors ${
            activeTab === tab
              ? 'border-sky-600 text-sky-600 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default CustomTab