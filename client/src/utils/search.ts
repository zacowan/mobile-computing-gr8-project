/**
 *
 * @param term the search term
 * @param data the data to search on
 * @param keys the keys of the data that can be searched
 * @returns the filtered data
 */
export const getSearchResults = (
  term: string | undefined,
  data: Array<any>,
  keys: Array<string>
) => {
  if (!term) return data;

  const filtered: Array<any> = [];
  const terms = term.toLowerCase().trim().split(" ");

  data.forEach((item) => {
    // Construct term to search on
    let itemTerm = "";
    keys.forEach((key) => {
      itemTerm = itemTerm.concat(item[key].toLowerCase().trim());
    });
    // Filter out non-matches
    terms.forEach((term) => {
      if (itemTerm.lastIndexOf(term) !== -1) {
        filtered.push(item);
      }
    });
  });

  return filtered;
};
