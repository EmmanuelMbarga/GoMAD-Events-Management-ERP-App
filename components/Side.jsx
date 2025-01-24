import Link from "next/link";

const SidebarItem = ({ icon: Icon, label, href, isActive, isCollapsed }) => {
  return (
    <Link href={href}>
      <div
        className={`
          flex items-center gap-4 p-3 rounded-lg mb-2
          ${
            isActive
              ? "bg-[#1AC2EA] text-white"
              : "hover:bg-gray-100 text-gray-700"
          }
          ${isCollapsed ? "justify-center" : ""}
          transition-all duration-200
        `}
      >
        <Icon
          className={`
          ${isCollapsed ? "w-6 h-6" : "w-5 h-5"}
          ${isActive ? "text-white" : "text-gray-700"}
        `}
        />
        {!isCollapsed && (
          <span
            className={`
            ${isCollapsed ? "hidden" : "block"}
            ${isActive ? "font-medium" : ""}
          `}
          >
            {label}
          </span>
        )}
      </div>
    </Link>
  );
};

export default SidebarItem;
