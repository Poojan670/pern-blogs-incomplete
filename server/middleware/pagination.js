async function paginate(data, req, res) {
  const query = req.query;
  const offset = parseInt(query.offset) || 0;
  const limit = parseInt(query.limit) || 10;
  const ordering = query.ordering || "";
  const search = query.search || "";

  const result = {};

  // Filter
  let filteredData = [...data];
  for (const key in query) {
    if (
      key === "offset" ||
      key === "limit" ||
      key === "ordering" ||
      key === "search"
    ) {
      continue;
    }
    filteredData = filteredData.filter(
      (item) =>
        item[key] &&
        item[key].toString().toLowerCase().includes(query[key].toLowerCase())
    );
  }

  // Search
  if (search) {
    filteredData = filteredData.filter(
      (item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
    );
  }

  // Order
  if (ordering) {
    const fields = ordering.split(",");
    filteredData.sort((a, b) => {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i].replace(/^\s+|\s+$/g, "");
        const descending = field.startsWith("-");
        const sortField = descending ? field.slice(1) : field;
        if (a[sortField] < b[sortField]) {
          return descending ? 1 : -1;
        } else if (a[sortField] > b[sortField]) {
          return descending ? -1 : 1;
        }
      }
      return 0;
    });
  }

  // Count
  result.count = filteredData.length;

  // Search and paginate
  result.results = filteredData.slice(offset, offset + limit);

  // Previous and Next links
  const baseUrl = `${req.protocol}://${req.get("host")}${
    req.originalUrl.split("?")[0]
  }`;
  if (offset + limit < result.count) {
    result.next = {
      url: `${baseUrl}?offset=${
        offset + limit
      }&limit=${limit}&ordering=${ordering}&search=${search}`,
      offset: offset + limit,
      limit: limit,
      ordering: ordering,
      search: search,
    };
  }

  if (offset > 0) {
    result.previous = {
      url: `${baseUrl}?offset=${Math.max(
        offset - limit,
        0
      )}&limit=${limit}&ordering=${ordering}&search=${search}`,
      offset: Math.max(offset - limit, 0),
      limit: limit,
      ordering: ordering,
      search: search,
    };
  }

  return result;
}

module.exports = paginate;
