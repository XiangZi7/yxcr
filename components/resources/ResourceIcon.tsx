import {
  BookOpen,
  Layers3,
  Flame,
  Sparkles,
  CodeXml,
  MessagesSquare,
  BrainCircuit,
  Workflow,
  CalendarDays,
  Smartphone,
  PanelsTopLeft,
  Boxes,
  History,
  Network,
  ClipboardCheck,
  Globe2,
  AppWindow,
  Cpu,
  Shapes,
  Server,
  Package,
  PenTool,
  Route,
  Newspaper,
  Compass,
  Bot,
  Database,
  ShieldCheck,
} from "lucide-react";
import technologyIcons from "@/components/brand/technology-icons.json";

const iconColors: Record<string, string> = {
  foundation: "#3b82f6", layers: "#8b5cf6", flame: "#f97316", sparkles: "#a855f7",
  code: "#3b82f6", messages: "#0d9488", brain: "#8b5cf6", workflow: "#06b6d4",
  calendar: "#f59e0b", phone: "#10b981", cards: "#6366f1", boxes: "#f97316",
  history: "#a855f7", network: "#0d9488", check: "#10b981", globe: "#0ea5e9",
  browser: "#3b82f6", cpu: "#8b5cf6", shapes: "#ec4899", book: "#3b82f6",
  server: "#10b981", package: "#cb3837", pen: "#f59e0b", route: "#14b8a6",
  newspaper: "#6366f1", compass: "#3b82f6", bot: "#14b8a6", database: "#0284c7", shield: "#10b981",
};

export function ResourceIcon({
  name,
  size = 18,
}: {
  name: string;
  size?: number;
}) {
  const brand = technologyIcons[name as keyof typeof technologyIcons];
  if (brand) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={brand.color} aria-hidden="true" className="technology-brand-icon" data-brand={name}>
        <path d={brand.path} />
      </svg>
    );
  }
  const icons = {
    foundation: BookOpen,
    layers: Layers3,
    flame: Flame,
    sparkles: Sparkles,
    code: CodeXml,
    messages: MessagesSquare,
    brain: BrainCircuit,
    workflow: Workflow,
    calendar: CalendarDays,
    phone: Smartphone,
    cards: PanelsTopLeft,
    boxes: Boxes,
    history: History,
    network: Network,
    check: ClipboardCheck,
    globe: Globe2,
    browser: AppWindow,
    cpu: Cpu,
    shapes: Shapes,
    book: BookOpen,
    server: Server,
    package: Package,
    pen: PenTool,
    route: Route,
    newspaper: Newspaper,
    compass: Compass,
    bot: Bot,
    database: Database,
    shield: ShieldCheck,
  };
  const Icon = icons[name as keyof typeof icons] ?? BookOpen;
  return <Icon size={size} strokeWidth={1.7} style={{ color: iconColors[name] ?? "#3b82f6" }} aria-hidden="true" />;
}
