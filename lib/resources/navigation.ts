import "server-only";
import { resources } from "./catalog";
import { filterResources } from "./query";
import { resourceCollections, resourceGroups } from "./config";
import { categoryHref, collectionHref, learningTopics, topicCategories } from "./sections";

export interface SidebarItem {
  id: string;
  title: string;
  href: string;
  icon: string;
  count: number;
  children?: SidebarItem[];
}
export interface SidebarGroup {
  id: string;
  title: string;
  icon: string;
  items: SidebarItem[];
}

const icons: Record<string, string> = {
  frontend: "code", backend: "python", network: "globe", algorithms: "network",
  "ai-llm": "brain", javascript: "javascript", typescript: "typescript",
  vue: "vuedotjs", react: "react", python: "python", fastapi: "fastapi",
  rag: "layers", mcp: "modelcontextprotocol", agent: "bot", inference: "cpu",
  学习专栏: "book", 专项练习: "check", 知识库: "layers", 技术专题: "brain",
};
const collectionBrands: Record<string, string> = {
  node: "nodedotjs", npm: "npm", docker: "docker",
};

export const sidebarGroups: SidebarGroup[] = [
  {
    id: "directions", title: "学习方向", icon: "compass",
    items: topicCategories.map((direction) => ({
      id: direction.slug,
      title: direction.slug === "backend" ? "后端开发" : direction.title,
      href: categoryHref(direction.category),
      icon: icons[direction.slug],
      count: filterResources(resources, { category: direction.category }).length,
      children: learningTopics
        .filter((topic) => topic.category === direction.category && topic.query)
        .map((topic) => ({
          id: topic.slug,
          title: topic.title.replace(/\s*学习$/u, ""),
          href: `/topics/${topic.slug}`,
          icon: topic.icon ?? icons[topic.slug] ?? "book",
          count: filterResources(resources, { category: topic.category, query: topic.query }).length,
        }))
        .filter((topic) => topic.count > 0),
    })),
  },
  ...resourceGroups.map((title, index) => ({
    id: `collections-${index}`, title, icon: icons[title] ?? "book",
    items: resourceCollections.filter((collection) => collection.group === title).map((collection) => ({
      id: collection.id,
      title: collection.title,
      href: collectionHref(collection.id),
      icon: collectionBrands[collection.id] ?? collection.icon,
      count: filterResources(resources, { collection: collection.id }).length,
    })),
  })),
];
