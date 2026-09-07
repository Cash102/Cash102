/**
 * Renders a stored stem (see lib/notation.ts) as React elements.
 *
 * THERE IS NO innerHTML ON THIS PATH, and that is the whole point of the file.
 *
 *   - Text segments become React text children, which React escapes. A teacher
 *     who types <script> gets those literal characters on screen.
 *   - Math segments go through katex.__renderToDomTree(), which returns KaTeX's
 *     own node tree rather than an HTML string. toReact() walks that tree and
 *     builds real React elements from it. Nothing is ever parsed back out of
 *     HTML, and dangerouslySetInnerHTML appears nowhere in this project.
 *
 * This is a server component. KaTeX runs during the server render, so the
 * client bundle contains no math library at all — only the elements it
 * produced. On a phone on school wifi that is roughly 280KB of JavaScript not
 * downloaded. The one client-side cost is katex.min.css (imported in the
 * layout) and its fonts, which load on demand.
 *
 * COUPLING NOTE: __renderToDomTree is KaTeX's double-underscore API. It is
 * stable across 0.16.x, and katex is pinned accordingly. The node shapes are
 * discriminated structurally rather than by constructor.name, because class
 * names do not survive minification of the server bundle. An unrecognised node
 * throws instead of rendering something wrong.
 */

import katex from "katex";
import { Fragment, createElement, type CSSProperties, type ReactNode } from "react";
import { KATEX_OPTIONS, parseStem } from "@/lib/notation";

/**
 * SVG path data for the few KaTeX paths that are referenced by name rather than
 * carrying their own `alternate` geometry. Of everything the notation allowlist
 * permits, only \vec lands here (\sqrt always supplies `alternate`). Extracted
 * from katex 0.16 output; an unknown name throws rather than drawing nothing.
 */
const NAMED_PATHS: Record<string, string> = {
  vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",
};

/** The parts of a KaTeX node this converter reads. */
interface KatexNode {
  type?: string;
  text?: string;
  classes?: string[];
  style?: Record<string, string>;
  attributes?: Record<string, string>;
  children?: KatexNode[];
  italic?: number;
  pathName?: string;
  alternate?: string;
}

/**
 * KaTeX writes a few attributes the way HTML wants them (`style` as a string on
 * <svg>); React wants an object. Everything else passes through untouched.
 */
function attributeProps(attributes: Record<string, string> | undefined): Record<string, unknown> {
  if (attributes === undefined) return {};
  const { style, ...rest } = attributes;
  if (style === undefined) return rest;

  const parsed: Record<string, string> = {};
  for (const declaration of style.split(";")) {
    const separator = declaration.indexOf(":");
    if (separator === -1) continue;
    const property = declaration.slice(0, separator).trim();
    const value = declaration.slice(separator + 1).trim();
    if (property === "" || value === "") continue;
    parsed[property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())] = value;
  }
  return { ...rest, style: parsed };
}

function className(classes: string[] | undefined): string | undefined {
  const filtered = (classes ?? []).filter(Boolean);
  return filtered.length > 0 ? filtered.join(" ") : undefined;
}

function toReact(node: KatexNode, key: number): ReactNode {
  // A drawn path (\sqrt rules, \vec arrows).
  if (node.pathName !== undefined) {
    const d = node.alternate ?? NAMED_PATHS[node.pathName];
    if (d === undefined) {
      throw new Error(
        `Stem: KaTeX path "${node.pathName}" has no geometry available. Add it to NAMED_PATHS or drop the command from the notation allowlist.`,
      );
    }
    return <path key={key} d={d} />;
  }

  // A MathML element: <math>, <mrow>, <mi>, <mo>, <semantics>, ...
  if (typeof node.type === "string") {
    return createElement(
      node.type,
      { key, className: className(node.classes), ...attributeProps(node.attributes) },
      (node.children ?? []).map(toReact),
    );
  }

  // A leaf: either a bare text node or a symbol carrying classes/italic.
  if (node.text !== undefined) {
    const style: CSSProperties = { ...(node.style as CSSProperties) };
    if (node.italic !== undefined && node.italic > 0) {
      style.marginRight = `${node.italic}em`;
    }
    const classes = className(node.classes);
    if (classes === undefined && Object.keys(style).length === 0) {
      return node.text;
    }
    return (
      <span key={key} className={classes} style={style}>
        {node.text}
      </span>
    );
  }

  const children = (node.children ?? []).map(toReact);

  // A layout span.
  if (node.classes !== undefined && node.attributes !== undefined) {
    if (node.attributes.href !== undefined) {
      throw new Error("Stem: KaTeX emitted a link, which the notation allowlist forbids.");
    }
    return (
      <span key={key} className={className(node.classes)} style={node.style as CSSProperties} {...attributeProps(node.attributes)}>
        {children}
      </span>
    );
  }

  // A document fragment: children with no element of its own.
  if (node.classes !== undefined) {
    return <Fragment key={key}>{children}</Fragment>;
  }

  // <svg> wrapper, and <line> for rules.
  if (node.attributes !== undefined) {
    return node.children !== undefined ? (
      <svg key={key} {...attributeProps(node.attributes)}>
        {children}
      </svg>
    ) : (
      <line key={key} {...attributeProps(node.attributes)} />
    );
  }

  throw new Error(`Stem: unrecognised KaTeX node with keys [${Object.keys(node).join(", ")}]`);
}

function Math({ tex }: { tex: string }): ReactNode {
  const tree = (
    katex as unknown as { __renderToDomTree: (tex: string, options: unknown) => KatexNode }
  ).__renderToDomTree(tex, KATEX_OPTIONS);
  return toReact(tree, 0);
}

/** Text with hard line breaks preserved. */
function Text({ value }: { value: string }): ReactNode {
  const lines = value.split("\n");
  return lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}

export function Stem({ source }: { source: string }): ReactNode {
  return parseStem(source).map((segment, index) =>
    segment.kind === "math" ? (
      <Math key={index} tex={segment.value} />
    ) : (
      <Text key={index} value={segment.value} />
    ),
  );
}
