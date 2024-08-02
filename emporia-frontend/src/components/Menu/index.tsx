import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Bars4Icon, XMarkIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import { useAuth } from "../../context/AuthContext";

// @ts-ignore
export const DefaultMenu: React.FC = ({ children }) => {
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  // Fechar o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Menu lateral */}
      <div
        ref={menuRef}
        className={`fixed inset-y-0 bg-gray-800 text-white md:relative md:w-52 md:flex md:flex-col ${isMenuOpen ? "block" : "hidden"
          } md:block`}
      >
        <div className="p-4">
          <h1 className="text-xl font-bold">Nome da empresa</h1>
          <ul>
            <li className="mt-2">
              <Link to="/clientes" className="hover:bg-gray-700 p-2 block">Clientes</Link>
            </li>
            <li
              className="mt-2 hover:bg-gray-700 relative"
              onClick={() => setIsSubMenuOpen(true)}
              onMouseLeave={() => setIsSubMenuOpen(false)}
            >
              <a className="p-2 block hover:cursor-pointer">Configurações</a>
              {isSubMenuOpen && (
                <ul className="absolute z-50 w-4/5 left-full top-0 bg-gray-700 text-white mt-2">
                  <li>
                    <Link className="p-2 block hover:bg-gray-600 hover:cursor-pointer" to="/items-de-servico">Items de serviço</Link>
                  </li>
                  <li>
                    <Link className="p-2 block hover:bg-gray-600 hover:cursor-pointer" to="/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link className="p-2 block hover:bg-gray-600 hover:cursor-pointer" to="/centro-de-custos">Centro de custos</Link>
                  </li>
                  <li>
                    <Link className="p-2 block hover:bg-gray-600 hover:cursor-pointer" to="/condicao-de-pagamento">Condição de pagamento</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="mt-2">
              <a href="#" className="hover:bg-gray-700 p-2 block">Link 3</a>
            </li>
          </ul>
        </div>
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 p-2 text-white bg-gray-800 rounded md:hidden"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Menu Superior visível apenas em telas grandes */}
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between hidden md:flex">
          <h1 className="text-xl font-bold">Menu Superior</h1>
          <IconButton color="white" onClick={signOut}>
            <ArrowLeftEndOnRectangleIcon className="text-black size-8"/>
          </IconButton>
        </div>

        {/* Botão de menu para dispositivos móveis */}
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-white bg-gray-800 rounded"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars4Icon className="h-6 w-6" />
            )}
          </button>
          <h1 className="text-xl font-bold">Menu</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
