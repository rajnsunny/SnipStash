import express from 'express';
import { body } from 'express-validator';
import {
  createSnippet,
  getSnippets,
  getSnippet,
  updateSnippet,
  deleteSnippet,
  searchSnippets,
} from '../controllers/snippetController';
import { auth } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// @route   POST /api/snippets
// @desc    Create a new snippet
// @access  Private
router.post(
  '/',
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('code').not().isEmpty().withMessage('Code snippet is required'),
    body('programmingLanguage').not().isEmpty().withMessage('programmingLanguage is required'),
  ],
  asyncHandler(createSnippet)
);

// @route   GET /api/snippets
// @desc    Get all user snippets
// @access  Private
router.get('/', asyncHandler(getSnippets));

// @route   GET /api/snippets/search
// @desc    Search snippets
// @access  Private
router.get('/search', asyncHandler(searchSnippets));

// @route   GET /api/snippets/:id
// @desc    Get snippet by ID
// @access  Private
router.get('/:id', asyncHandler(getSnippet));

// @route   PUT /api/snippets/:id
// @desc    Update a snippet
// @access  Private
router.put(
  '/:id',
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('code').not().isEmpty().withMessage('Code snippet is required'),
    body('programmingLanguage').not().isEmpty().withMessage('programmingLanguage is required'),
  ],
  asyncHandler(updateSnippet)
);

// @route   DELETE /api/snippets/:id
// @desc    Delete a snippet
// @access  Private
router.delete('/:id', asyncHandler(deleteSnippet));

export default router; 