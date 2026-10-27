"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";

export function SearchInput({ value, onValueChange, onClear, label, name, placeholder, className = "" }: {
  value: string;
  onValueChange: (value: string) => void;
  onClear?: () => void;
  label: string;
  name?: string;
  placeholder?: string;
  className?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  return <div className={`ui-search-field ${className}`}>
    <Search size={17} aria-hidden="true" />
    <input ref={input} className="ui-search-input" type="search" name={name} aria-label={label}
      placeholder={placeholder} value={value} onChange={(event) => onValueChange(event.target.value)} />
    {value && <button type="button" className="ui-search-clear" aria-label="清空搜索" onClick={() => {
      onValueChange("");
      onClear?.();
      input.current?.focus();
    }}><X size={14} aria-hidden="true" /></button>}
  </div>;
}
