"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption { value: string; label: string }

export function Select({ value, options, onValueChange, label, name, className = "" }: {
  value: string;
  options: readonly SelectOption[];
  onValueChange: (value: string) => void;
  label: string;
  name?: string;
  className?: string;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const selected = Math.max(0, options.findIndex((item) => item.value === value));
  const [active, setActive] = useState(selected);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  function choose(index: number) {
    const option = options[index];
    if (!option) return;
    onValueChange(option.value);
    setOpen(false);
    trigger.current?.focus();
  }
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
      if (event.key === "Home") setActive(0);
      else if (event.key === "End") setActive(options.length - 1);
      else setActive((index) => (open ? (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length : selected));
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(active);
      else { setActive(selected); setOpen(true); }
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Tab") setOpen(false);
  }

  return <div ref={root} className={`ui-select ${className}`}>
    {name && <input type="hidden" name={name} value={value} />}
    <button ref={trigger} type="button" className="ui-select-trigger" role="combobox" aria-label={label}
      aria-expanded={open} aria-haspopup="listbox" aria-controls={`${id}-list`}
      aria-activedescendant={open ? `${id}-option-${active}` : undefined}
      onKeyDown={onKeyDown} onClick={() => { setActive(selected); setOpen(!open); }}>
      <span>{options[selected]?.label}</span><ChevronDown size={14} aria-hidden="true" />
    </button>
    {open && <div id={`${id}-list`} className="ui-select-menu" role="listbox" aria-label={label}>
      {options.map((option, index) => <button key={option.value} type="button" tabIndex={-1} id={`${id}-option-${index}`}
        role="option" aria-selected={option.value === value} className={`ui-select-option ${active === index ? "is-active" : ""}`}
        onPointerMove={() => setActive(index)} onMouseDown={(event) => event.preventDefault()} onClick={() => choose(index)}>
        <span>{option.label}</span>{option.value === value && <Check size={14} aria-hidden="true" />}
      </button>)}
    </div>}
  </div>;
}
