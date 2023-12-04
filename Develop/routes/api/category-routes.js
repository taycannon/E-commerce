//routes-api category
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//The - Find all categories inculded with it Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model:Product}],
    });
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

// Get a single category and its associated products by ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category Not Found With ID' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Updating by ID
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);

    if (!categoryData) {
      res.status(404).json({ message: 'No Category Found With That ID' });
      return;
    }

    
    await categoryData.update({
      category_name: req.body.category_name, 
    });

    res.status(200).json({ message: 'Updated Category Successfull' });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Deleting by ID
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);

    if (!categoryData) {
      res.status(404).json({ message: 'No Category Found With That ID' });
      return;
    }

    await categoryData.destroy();

    res.status(200).json({ message: 'Deleted Category Successfull' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
