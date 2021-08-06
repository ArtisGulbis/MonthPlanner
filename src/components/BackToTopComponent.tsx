import React from 'react';

const BackToTopComponent = () => {
  return (
    <a
      href="#top"
      className="fixed bottom-10 right-10 bg-indigo-600 w-min-w h-min-h p-4 rounded-full transform hover:scale-125 duration-75 hover:bg-indigo-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
};

export default BackToTopComponent;
