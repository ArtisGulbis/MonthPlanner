import React from 'react';

const BackToTop = () => {
  return (
    <a
      href="#top"
      className="fixed fill-current border-2 border-blue-900 text-blue-900 md:bottom-8 md:right-8 bottom-5 right-5 bg-transparent md:min-w-min md:min-h-min  md:p-4 p-2 rounded-full transform hover:scale-125 duration-75 hover:bg-blue-900 hover:text-blue-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="md:h-10 md:w-10 w-6 h-6"
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

export default BackToTop;
