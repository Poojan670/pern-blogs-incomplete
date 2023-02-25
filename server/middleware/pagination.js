async function paginate(model, req, res) {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    const count = model.length
    if (!page & !limit) {
        page = 1
        limit = 10
    } else if (!page) {
        page = 1
    } else if (!limit) {
        limit = 10
    } else {
        page = page
        limit = limit
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    result.count = count

    if (endIndex < (await model.length)) {
        result.next = {
            page: page + 1,
            limit: limit,
        };
    }
    if (startIndex > 0) {
        result.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    result.results = await model.slice(startIndex, endIndex)
    return result
}

module.exports = paginate