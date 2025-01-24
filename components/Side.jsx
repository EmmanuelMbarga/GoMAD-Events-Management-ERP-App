import Link from "next/link";

const SidebarItem = ({ icon: Icon, label, href, isActive, isCollapsed }) => {
  return (
    <Link href={href}>
      <button
        className={`group flex items-center w-full px-6 py-3 text-sm font-semibold rounded-lg transition-colors ${
          isActive
            ? "bg-sky-100 text-sky-500"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon className="mr-3 h-6 w-6" />
        {!isCollapsed && <span className="text-lg font-medium">{label}</span>}
      </button>
    </Link>
  );
};

export default SidebarItem;
