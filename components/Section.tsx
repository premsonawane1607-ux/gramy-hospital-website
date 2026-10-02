export default function Section({
  sub,
  title,
  titleBold,
  className,
  children,
}: {
  sub?: string;
  title?: string;
  titleBold?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`section-padding ${className ?? ""}`}>
      <div className="container-default">
        {(sub || title) && (
          <div className="section-title mb-12 text-center">
            {sub && <span className="sub">{sub}</span>}
            {title && (
              <h2>
                {title} {titleBold && <b className="font-extrabold">{titleBold}</b>}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
