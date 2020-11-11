const router = require('express').Router
const {Product} = require('../db/models')
module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['productId', 'name', 'price'], //might need to add more
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      attributes: ['productId', 'name', 'price'], //might need to add more
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// POST /api/products
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        productId: req.params.productId,
      },
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// PUT /api/products/:productId
router.put('/:productId', async (req, res, next) => {
  try {
    const updatedProductInfo = await Product.update(req.body, {
      returning: true,
      where: {
        productId: req.params.productId,
      },
    })

    if (updatedProductInfo.length !== 2) {
      res.sendStatus(404)
    }

    const [numUpdated, [updatedProduct]] = updatedProductInfo
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})