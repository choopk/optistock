import Link from "next/link";
import { useRouter } from "next/router";
import { CgMenu } from "react-icons/cg";
import { ThemeToggle } from "./ThemeToggle";
const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="rounded border-b border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            HappyGoDorky
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <CgMenu />
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
            <li>
              <Link
                href="/"
                className={`block rounded bg-blue-700 py-2 pl-3 pr-4 md:bg-transparent md:p-0 ${router.asPath === "/"
                  ? "dark:text-white md:text-blue-700"
                  : "text-gray-700 dark:text-gray-400"
                  }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white ${router.asPath === "/about"
                  ? "dark:text-white md:text-blue-700"
                  : "text-gray-700 dark:text-gray-400"
                  }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={`block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white ${router.asPath === "/signin"
                  ? "dark:text-white md:text-blue-700"
                  : "text-gray-700 dark:text-gray-400"
                  }`}
                href="/signin"
              >
                Sign in
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
