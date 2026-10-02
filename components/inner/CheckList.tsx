// Live `.patients-visitors-desc .inner-content .list` (hospa-main.css): flex
// rows, 20px apart, blackColor text after a 25px optionalColorThree
// `ti-checks`. With `intro`, reproduces the live Facilities markup — the
// intro text + two <br>s inside `.list`, then a nested default-indented <ul>.
function Items({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((item) => (
        <li key={item} className="mb-[20px] flex text-black last:mb-0">
          <i className="ti ti-checks mr-[12px] text-[25px] text-optional-three" aria-hidden="true" />
          {item}
        </li>
      ))}
    </>
  );
}

export default function CheckList({ items, intro }: { items: readonly string[]; intro?: string }) {
  if (intro) {
    return (
      <div className="mb-0 mt-0 px-0">
        {intro}
        <br />
        <br />
        <ul className="mb-[1rem] pl-[2rem]">
          <Items items={items} />
        </ul>
      </div>
    );
  }
  return (
    <ul className="mb-0 mt-0 px-0">
      <Items items={items} />
    </ul>
  );
}
