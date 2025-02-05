import React from 'react'

const page = () => {
    const skeletons = Array(6).fill(0);
  return (
    <div className="h-full mx-auto pb-4 overflow-y-auto no-scrollbar flex items-center justify-center">
    <div className="max-h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
        {skeletons.map((_, index) => (
          <div className="flex flex-col w-52 gap-4" key={index}>
            <div className="skeleton h-52 w-full"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default page