import type { BodyNode } from "@/lib/types";

export default function ContentBlocks({ nodes }: { nodes: BodyNode[] }) {
  if (!nodes || nodes.length === 0) return null;
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-black prose-p:text-paragraph">
      {nodes.map((n, i) => {
        if (n.type === "h2") return <h2 key={i}>{n.text}</h2>;
        if (n.type === "h3") return <h3 key={i}>{n.text}</h3>;
        if (n.type === "h4") return <h4 key={i}>{n.text}</h4>;
        if (n.type === "p") return <p key={i}>{n.text}</p>;
        if (n.type === "ul")
          return (
            <ul key={i}>
              {n.items?.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        if (n.type === "ol")
          return (
            <ol key={i}>
              {n.items?.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ol>
          );
        return null;
      })}
    </div>
  );
}
