import {
  Atom,
  Bot,
  Box,
  Braces,
  BrainCircuit,
  Cable,
  CodeXml,
  Component,
  FileCode2,
  Globe2,
  Layers3,
  Network,
  Server,
  Workflow,
} from "lucide-react";

export function BrandIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  if (name === "Vue 3")
    return (
      <svg
        viewBox="0 0 24 24"
        className={`topic-icon ${className}`}
        aria-hidden="true"
      >
        <path fill="#35b995" d="M1 3h5l6 10.4L18 3h5L12 22z" />
        <path fill="#386b83" d="M6 3h4l2 3.6L14 3h4l-6 10.4z" />
      </svg>
    );
  const icons = {
    frontend: Component,
    backend: Server,
    ai: BrainCircuit,
    network: Network,
    JavaScript: Workflow,
    TypeScript: FileCode2,
    React: Atom,
    浏览器与网络: Globe2,
    计算机网络专题: Globe2,
    HTTP: Globe2,
    工程化: Component,
    Python: CodeXml,
    FastAPI: Braces,
    RAG: Layers3,
    MCP: Box,
    Agent: Bot,
    模型推理: Network,
    "AI 工程实战": BrainCircuit,
  };
  const Icon = icons[name as keyof typeof icons] ?? Cable;
  return (
    <Icon
      size={17}
      strokeWidth={1.8}
      className={`topic-icon ${className} ${["frontend", "React", "FastAPI", "Python"].includes(name) ? `topic-${name.toLowerCase()}` : ""}`}
      aria-hidden="true"
    />
  );
}
