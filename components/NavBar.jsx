import Link from "next/link";

export const Navbar = () => {
  return (
    <>
      <nav className="flex items-center flex-wrap bg-white-400 p-2 border border-gray-200 ">
        <Link href="/">
          <a className="inline-flex items-center p-2 mr-4 ">My Blog</a>
        </Link>

        <div className="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto">
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <Link href="/Login">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded  font-bold items-center justify-center  ">
                Sign In
              </a>
            </Link>
            <Link href="/Register">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded  font-bold items-center justify-center ">
                Sign Up
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
