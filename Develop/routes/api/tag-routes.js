const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//Get all tags
router.get('/', async(req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product, // Include associated Product data
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

//Get one tag from ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product,
    });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.status(200).json(tag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

  //Creates a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update a tag's name by ID value
router.put('/:id', async(req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete on tag by ID value
router.delete('/:id', async(req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      await tag.destroy();
      res.status(200).send(); 
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
