/**
 *
 * @param term the search term
 * @param data the data to search on
 * @param keys the keys of the data that can be searched. The result of each key on the data must be a string.
 * @returns the filtered data
 */
export const getSearchResults = (
  term: string | undefined,
  data: Array<any>,
  keys: Array<string>
) => {
  if (!term) return data;
  if (data.length === 0) return data;
  if (keys.length === 0) return data;

  const filtered: Array<any> = [];
  const terms = term.toLowerCase().trim().split(" ");

  data.forEach((item) => {
    // Construct term to search on
    let itemTerm = "";
    keys.forEach((key) => {
      itemTerm = itemTerm.concat(item[key].toLowerCase().trim());
    });
    // Filter out non-matches
    let numMatches = 0;
    terms.forEach((term) => {
      if (itemTerm.lastIndexOf(term) !== -1) {
        numMatches += 1;
      }
    });
    if (numMatches === terms.length) {
      filtered.push(item);
    }
  });

  return filtered;
};
