/** ? */
const sortCollator = new Intl.Collator(undefined, {
  usage: "sort",
  numeric: true,
  sensitivity: "variant",
});

/**
 * 比較兩個字串以進行排序
 */
const sortCompare = (a: string, b: string): number => {
  return sortCollator.compare(a, b);
};

/** ? */
const searchCollator = new Intl.Collator(undefined, {
  usage: "search",
  sensitivity: "base",
});

/**
 * 比較兩個字串以進行搜尋匹配
 */
const searchCompare = (a: string, b: string): number => {
  return searchCollator.compare(a, b);
};

export { sortCompare, searchCompare };
