const express = require('express'),
    user = require('../../src/router/user')


module.exports = function (app) {
    app.use(express.json());

    app.use('/api/v1/user-app/user', user)


    // app.get('/api/v1/blogs', async (req, res) => {
    //     const results = await db.query("select * from blogs");
    //     console.log(results);
    //     res.status(200).send(results[rows])
    // })

    // app.get('/api/v1/blogs/:id', async (req, res) => {
    //     const results = await db.query(`select * from blogs where id=${req.params.id}`)
    //     res.status(200).send(results)
    // })
}