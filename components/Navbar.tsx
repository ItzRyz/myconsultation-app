import React from "react";
import { HiLogout } from "react-icons/hi";
import { MdOutlineNotificationsActive } from "react-icons/md";
import nookies from "nookies";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const logoutClickHandler = (e: any) => {
    nookies.destroy(null, "token");
    nookies.destroy(null, "user");
    router.push("/login");
  };
  return (
    <nav className="bg-neutral-700 w-full">
      <div className="container mx-auto">
        <div className="relative flex h-[60px] items-center justify-end">
          <div className="absolute flex items-center">
            <button
              type="button"
              className="relative flex items-center bg-neutral-300 rounded-md px-4 h-[40px]  hover:bg-neutral-500"
            >
              <div className="relative flex rounded-full bg-gray-800 text-sm">
                <img
                  className="h-7 w-7 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <span className="pt-[1px] ps-3 font-bold text-lg">
                Muhammad Salman Al Farizi
              </span>
            </button>
            <button
              type="button"
              className="relative rounded-md bg-neutral-300 p-1 ms-2 text-neutral-900 hover:bg-neutral-600"
            >
              <MdOutlineNotificationsActive className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={logoutClickHandler}
              className="relative rounded-md bg-neutral-300 p-1 ms-2 text-neutral-900 hover:bg-neutral-600"
            >
              <HiLogout className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
