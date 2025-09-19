import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className = "" }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, logout } = useAuth();

  // 点击外部关闭菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    toast.success("Logged out successfully");
    // 重定向到登录页面
    router.navigate({ to: "/login" });
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* 用户信息触发器 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsOpen(false);
        }}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="btn btn-ghost btn-sm gap-2 px-2"
        tabIndex={0}
      >
        {/* 用户名 */}
        <span className="text-sm font-medium text-base-content">
          {user.email}
        </span>

        {/* 下拉箭头 */}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <ul className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
          {/* 分割线 */}
          <li className="my-1 border-t border-gray-200" />

          {/* 退出登录 */}
          <li>
            <button
              onClick={handleLogout}
              className="group relative w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-800 hover:bg-blue-50 rounded-md"
            >
              <LogOut className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
              <span className="font-medium group-hover:text-blue-600">
                Sign out
              </span>
              <span className="pointer-events-none absolute right-0 top-0 h-full w-[3px] bg-blue-600 opacity-0 group-hover:opacity-100 rounded-r-md"></span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
