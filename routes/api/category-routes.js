const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryRoutesData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryRoutesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryRoutesData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (updateCategory[0] === 0) {
      res.status(404).json({message: "No category with the id!"});
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryRoutesData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryRoutesData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryRoutesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;