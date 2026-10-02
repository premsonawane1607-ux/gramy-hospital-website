// Live WordPress search form (`get_search_form`): a plain GET form, so it
// works without JavaScript exactly as on the live site. The live form posts
// `s` to the site root; here the results live at /search.
export default function SearchForm({ query = "" }: { query?: string }) {
  return (
    <form role="search" method="get" action="/search" className="lv-search-form">
      <label>
        <input
          type="search"
          className="lv-search-field"
          placeholder="Search..."
          defaultValue={query}
          name="s"
          required
          aria-label="Search"
        />
      </label>
      <button type="submit" className="lv-search-submit" aria-label="Search">
        <i className="ti ti-search" />
      </button>
    </form>
  );
}
