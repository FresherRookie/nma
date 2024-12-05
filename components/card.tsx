import React from 'react';
const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 m-6 border-gray-100 flex justify-center items-center">
      {children}
    </div>
  );
};
export default Card;
