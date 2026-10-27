import { ResourceIcon } from "@/components/resources/ResourceIcon";

const names: Record<string, string> = {
  frontend: "code", backend: "python", ai: "brain", network: "globe", algorithms: "network",
  JavaScript: "javascript", TypeScript: "typescript", "Vue 3": "vuedotjs", React: "react",
  浏览器与网络: "globe", 计算机网络专题: "globe", HTTP: "globe", 工程化: "vite",
  Python: "python", FastAPI: "fastapi", RAG: "layers", MCP: "modelcontextprotocol",
  Agent: "bot", 模型推理: "cpu", "AI 工程实战": "brain",
};

export function BrandIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span className={`topic-icon inline-flex ${className}`} aria-hidden="true">
      <ResourceIcon name={names[name] ?? name} size={17} />
    </span>
  );
}
