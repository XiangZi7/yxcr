import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import diff from "highlight.js/lib/languages/diff";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import http from "highlight.js/lib/languages/http";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import powershell from "highlight.js/lib/languages/powershell";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import scss from "highlight.js/lib/languages/scss";
import less from "highlight.js/lib/languages/less";
import java from "highlight.js/lib/languages/java";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import ini from "highlight.js/lib/languages/ini";
import lua from "highlight.js/lib/languages/lua";
import graphql from "highlight.js/lib/languages/graphql";

export const highlightOptions = {
  languages: {
    bash,
    css,
    diff,
    dockerfile,
    http,
    javascript,
    json,
    markdown,
    powershell,
    python,
    sql,
    typescript,
    xml,
    yaml,
    scss,
    less,
    java,
    c,
    cpp,
    csharp,
    go,
    rust,
    ini,
    lua,
    graphql,
  },
  aliases: { xml: ["vue", "wxml"], bash: ["shell", "sh", "zsh"] },
  detect: false,
  ignoreMissing: true,
  plainText: ["text", "plaintext", "mermaid", "console", "output"],
};
