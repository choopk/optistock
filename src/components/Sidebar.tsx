import { signOut } from "next-auth/react";
import {
  MdHome,
  MdListAlt,
  MdPowerSettingsNew,
  MdSettings,
} from "react-icons/md";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside
      className="fixed top-0 left-0 h-full w-64 pt-16"
      aria-label="Sidenav"
    >
      <div className="flex h-full flex-col justify-between overflow-y-auto border-r border-gray-200 bg-white py-5 px-3 dark:border-gray-700 dark:bg-gray-800">
        <ul className="space-y-2">
          <SidebarItem icon={<MdHome />} name="Home" link="/protected" />
          <SidebarItem
            icon={<MdListAlt />}
            name="Users"
            link="/protected/users"
          />
        </ul>
        <ul className="mt-5 space-y-2 border-t border-gray-200 pt-5 dark:border-gray-700">
          <SidebarItem
            icon={<MdSettings />}
            name="Account"
            link="/protected/account"
          />

          <li className="group p-2 text-base font-normal text-gray-900 hover:bg-gray-100">
            <button
              onClick={() => signOut()}
              className="flex items-center group-hover:text-gray-900"
            >
              <span className="text-2xl text-gray-400 group-hover:text-gray-900">
                <MdPowerSettingsNew />
              </span>
              <span className="ml-3 dark:text-white">Sign Out</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
