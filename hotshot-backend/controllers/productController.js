import Product from '../models/Product.js'

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const { category, sort, maxPrice } = req.query

  let query = {}

  // Filter by category
  if (category && category !== 'ALL') {
    query.category = category
  }

  // Filter by max price
  if (maxPrice) {
    query.price = { $lte: Number(maxPrice) }
  }

  let products = await Product.find(query)

  // Sort
  if (sort === 'Price: Low to High') products = products.sort((a, b) => a.price - b.price)
  if (sort === 'Price: High to Low') products = products.sort((a, b) => b.price - a.price)
  if (sort === 'Newest') products = products.sort((a, b) => b.createdAt - a.createdAt)

  res.json(products)
}

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const { name, price, description, image, category, sizes, tag, countInStock } = req.body

  const product = await Product.create({
    name,
    price,
    description,
    image,
    category,
    sizes,
    tag,
    countInStock,
  })

  res.status(201).json(product)
}

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = req.body.name || product.name
    product.price = req.body.price || product.price
    product.description = req.body.description || product.description
    product.image = req.body.image || product.image
    product.category = req.body.category || product.category
    product.sizes = req.body.sizes || product.sizes
    product.tag = req.body.tag !== undefined ? req.body.tag : product.tag
    product.inStock = req.body.inStock !== undefined ? req.body.inStock : product.inStock
    product.countInStock = req.body.countInStock || product.countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.deleteOne()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct }