import { BookOpen, Layers3, Flame, Sparkles, CodeXml, MessagesSquare, BrainCircuit, Workflow, CalendarDays, Smartphone, PanelsTopLeft, Boxes, History, Network, ClipboardCheck, Globe2, AppWindow, Cpu, Shapes, Server, Package, PenTool, Route, Newspaper, Compass } from "lucide-react";

export function ResourceIcon({ name, size = 18 }: { name: string; size?: number }) {
  const icons = { foundation: BookOpen, layers: Layers3, flame: Flame, sparkles: Sparkles, code: CodeXml, messages: MessagesSquare, brain: BrainCircuit, workflow: Workflow, calendar: CalendarDays, phone: Smartphone, cards: PanelsTopLeft, boxes: Boxes, history: History, network: Network, check: ClipboardCheck, globe: Globe2, browser: AppWindow, cpu: Cpu, shapes: Shapes, book: BookOpen, server: Server, package: Package, pen: PenTool, route: Route, newspaper: Newspaper, compass: Compass };
  const Icon = icons[name as keyof typeof icons] ?? BookOpen;
  return <Icon size={size} strokeWidth={1.7} aria-hidden="true" />;
}
