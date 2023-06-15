import Link from "next/link";

const SidebarItem = ({
  icon,
  name,
  link,
}: {
  icon: React.ReactNode;
  name: string;
  link: string;
}) => {
  return (
    <li className="group p-2 text-base font-normal text-gray-900 hover:bg-gray-100">
      <Link href={link} className="flex items-center group-hover:text-gray-900">
        <span className="text-2xl text-gray-400 group-hover:text-gray-900">
          {icon}
        </span>
        <span className="ml-3 dark:text-white">{name}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
