import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full bg-white border-b border-gray-200 fixed z-30 top-0">
      <div className="flex items-center justify-between px-4 h-16 max-w-[1150px] mx-auto">
        {/* Logotipo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <span className="text-2xl font-black tracking-wider text-black">DENGO</span>
            <span className="ml-1 text-xs bg-[#FE2C55] text-white font-bold px-1.5 py-0.5 rounded">PLUS</span>
          </div>
        </Link>

        {/* Barra de Pesquisa */}
        <div className="relative hidden md:flex items-center justify-end bg-[#F1F1F2] p-1 rounded-full max-w-[380px] w-full">
          <input 
            type="text" 
            placeholder="Search accounts and videos" 
            className="w-full pl-3 my-1 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
          />
          <button className="px-3 py-1 hover:bg-gray-200 rounded-full text-[#838383]">
            <BiSearch size="20" />
          </button>
        </div>

        {/* Ações / Utilizador */}
        <div className="flex items-center space-x-3">
          <Link href="/upload">
            <button className="flex items-center border border-gray-300 px-3 py-1.5 rounded-[4px] hover:bg-gray-50 text-[15px] font-semibold">
              <IoMdAdd size="20" className="mr-1" />
              Upload
            </button>
          </Link>
          <button className="bg-[#FE2C55] text-white px-6 py-1.5 rounded-[4px] text-[15px] font-semibold hover:bg-[#de1d44]">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;