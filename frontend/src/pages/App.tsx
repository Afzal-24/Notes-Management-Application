import {
  Bell,
  BarChart2,
  Calendar,
  ChevronRight,
  Globe,
  Home,
  LayoutGrid,
  List,
  Search,
  Settings,
  SlidersHorizontal,
  ArrowUpDown,
  Upload,
  User,
  Zap,
  Plus,
  Pause,
  Rows3,
} from "lucide-react";
import NotesKanbanBoard from "../components/NotesKanbanBoard";
import { useState } from "react";
import NotesListView from "../components/NotesListView";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export const ACCENT = "#4f46e5";
export const ACCENT_LIGHT = "#ede9fe";

const sidebarIcons = [
  { icon: Home, active: false },
  { icon: BarChart2, active: false },
  { icon: User, active: false },
  { icon: Calendar, active: false },
  { icon: Zap, active: false },
  { icon: Bell, active: false },
];

const viewButtons = [
  { label: "Grid View", icon: LayoutGrid },
  { label: "List View", icon: List },
  { label: "Column View", icon: Pause },
  { label: "Row View", icon: Rows3 },
];

const App: React.FC = () => {
  const noteStatuses = useSelector(
    (state: RootState) => state.noteManagement.noteStatuses,
  );

  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="flex h-screen bg-[#f5f6fa] font-sans">
      {/* Sidebar */}
      <div
        className="w-16 bg-white flex flex-col items-center justify-between py-4"
        style={{ borderRight: "1.5px solid #ede9fe" }}
      >
        <div className="flex flex-col items-center gap-6">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-base"
            style={{ background: ACCENT }}
          >
            S
          </div>

          {/* Nav Icons */}
          <div className="flex flex-col items-center gap-1 mt-2">
            {sidebarIcons.map(({ icon: Icon }, i) => (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-150 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Icon size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Settings + Avatar */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-150 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600">
            <Settings size={20} />
          </div>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-9 h-9 rounded-full object-cover border-2"
            style={{ borderColor: ACCENT_LIGHT }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <div
          className="h-15 bg-white px-6 flex items-center justify-between shrink-0"
          style={{ borderBottom: "1.5px solid #f0f0f7" }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Home size={13} />
            <ChevronRight size={13} />
            <span>Dashboard</span>
            <ChevronRight size={13} />
            <span>Project</span>
            <ChevronRight size={13} />
            <Globe size={13} style={{ color: ACCENT }} />
            <span style={{ color: ACCENT }} className="font-medium">
              Project PlanetX
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Search size={18} className="text-gray-600 cursor-pointer" />

            {/* Avatars */}
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${i}`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>

            <button className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition">
              Invite <Plus size={12} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-white">
          <div className="flex items-start justify-between mb-6">
            {/* Left: avatar + title + view tabs */}
            <div className="flex items-center gap-4">
              <div
                className="w-18 h-18 rounded-full shrink-0 flex items-center justify-center"
                style={{ background: "#e8e9f9" }}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <div
                    className="w-full h-1/2"
                    style={{ background: "#818cf8" }}
                  />
                  <div
                    className="w-full h-1/2"
                    style={{ background: ACCENT }}
                  />
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  Project PlanetX
                </h1>

                {/* View Buttons */}
                <div className="flex items-center gap-2 mt-3 bg-[#F1F5F9] p-2 rounded-full w-fit">
                  {viewButtons.map(({ label, icon: Icon }) => {
                    const currentView =
                      label === "Grid View"
                        ? "grid"
                        : label === "List View"
                          ? "list"
                          : "";

                    const isActive = view === currentView;

                    return (
                      <button
                        key={label}
                        onClick={() =>
                          currentView && setView(currentView as "grid" | "list")
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition"
                        style={
                          isActive
                            ? {
                                background: "#fff",
                                color: "#555",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                              }
                            : {
                                color: "#555",
                              }
                        }
                      >
                        <Icon size={13} strokeWidth={2.7} />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-3 h-8">
                <button className="flex items-center gap-1.5 text-xs text-gray-600 font-medium hover:text-gray-700 transition">
                  <SlidersHorizontal size={15} />
                  Filter
                </button>

                <button className="flex items-center gap-1.5 text-xs text-gray-600 font-medium hover:text-gray-700 transition">
                  <ArrowUpDown size={15} />
                  Sort
                </button>
              </div>

              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold shadow-md transition hover:opacity-90"
                style={{ background: ACCENT }}
              >
                Export Data
                <Upload size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="text-gray-300 text-sm mt-8 text-center">
            <div>
              {view === "grid" ? (
                <NotesKanbanBoard />
              ) : (
                <NotesListView noteStatuses={noteStatuses} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
