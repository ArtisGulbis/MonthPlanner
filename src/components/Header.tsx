import React from 'react';

interface Props {
  monthName?: string;
}

const Header = ({ monthName }: Props) => {
  return (
    <>
      <h1
        id="top"
        className="font-sans italic tracking-widest text-indigo-700 font-normal underline text-7xl pt-10 text-center md:mb-10 md:pt-10 md:text-9xl"
      >
        {monthName}
      </h1>
    </>
  );
};

export default Header;
