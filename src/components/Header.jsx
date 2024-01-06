import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Header() {
  const [pageState, setPageState] = useState('Sign In')
  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, ((user) => {
      if (user){
        setPageState('Profile')
      } else{
        setPageState('Sign In')
      }
    }))
  }, [auth])

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-10">
      <nav className="flex items-center justify-between px-3 max-w-6xl mx-auto">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold">
              Mock<span className="text-blue-700">Mart</span>
            </h1>
          </Link>
        </div>
        <div>
          <ul className="flex items-center justify-center gap-x-7">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block pr-1 pl-1 py-4 duration-200 font-semibold
                  ${
                    isActive
                      ? "text-blue-700 border-b-[3px] border-blue-700"
                      : "text-gray-800"
                  }
                   hover:bg-gray-50 lg:hover:bg-transparent  hover:text-blue-600`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="offers"
                className={({ isActive }) =>
                  `block py-4 pr-1 pl-1 duration-200 font-semibold
                  ${
                    isActive
                      ? "text-blue-700 border-b-[3px] border-blue-700"
                      : "text-gray-800"
                  }
                  hover:bg-gray-50 lg:hover:bg-transparent  hover:text-blue-600`
                }
              >
                Offers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  `block py-4 pr-1 pl-1 duration-200 font-semibold
                  ${
                    isActive
                      ? "text-blue-700 border-b-[3px] border-blue-700"
                      : "text-gray-800"
                  }
                 hover:bg-gray-50 lg:hover:bg-transparent  hover:text-blue-600`
                }
              >
                {pageState}
              </NavLink>
            </li>
            
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
