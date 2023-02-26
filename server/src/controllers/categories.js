const User = require('../model').user
const Category = require('../model').category
const {Op} = require('sequelize')
const paginate = require('../../middleware/pagination')
const validate = require('../validators/categories')


exports.listCategories = async (req, res) => {
    const result = await paginate(await Category.findAll(), req, res);
    res.json(result);
}


exports.createCategory = async (req, res) => {
    const {error } = validate(req.body)
    if (error) return res.status(400).json({"msg": error.details[0].message});

    let category = await Category.findOne({
        where: {title: req.body.title}
    })
    if (category) return res.status(400).json({"msg": `Category with this title : ${req.body.title} already exists`})
    
    category = await Category.create({
        title: req.body.title,
        UserId: req.user.id
    })
    // category = new Category({
    //     title : req.body.title,
    //     user_id: req.user.id
    // })
    // await category.save()
    res.status(201).send(category);
}

exports.getCategory = async (req, res) => {
    const category = await Category.findByPk(req.params.id)
    if(!category) return res.status(404).json({"msg": `Category with this id : ${req.params.id} not found`})
    res.send(category);
}