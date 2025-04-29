import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Snippet from '../models/Snippet';
import { categorizeSnippet } from '../utils/categorizeSnippet';

/**
 * Create a new snippet
 * @route POST /api/snippets
 * @access Private
 */
export const createSnippet = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, code, programmingLanguage, description, tags = [] } = req.body;

    // Auto-categorize the snippet
    const autoTags = categorizeSnippet(code, programmingLanguage);
    
    // Combine manual tags with auto-generated tags
    const combinedTags = [...new Set([...tags, ...autoTags])];

    const newSnippet = new Snippet({
      user: req.userId,
      title,
      code,
      programmingLanguage,
      description,
      tags: combinedTags,
    });

    const snippet = await newSnippet.save();
    res.status(201).json(snippet);
  } catch (error) {
    console.error('Create snippet error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all snippets for current user
 * @route GET /api/snippets
 * @access Private
 */
export const getSnippets = async (req: Request, res: Response) => {
  try {
    const snippets = await Snippet.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(snippets);
  } catch (error) {
    console.error('Get snippets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get a single snippet by ID
 * @route GET /api/snippets/:id
 * @access Private
 */
export const getSnippet = async (req: Request, res: Response) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if the snippet belongs to the user
    if (snippet.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(snippet);
  } catch (error) {
    console.error('Get snippet error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update a snippet
 * @route PUT /api/snippets/:id
 * @access Private
 */
export const updateSnippet = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if the snippet belongs to the user
    if (snippet.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, code, programmingLanguage, description, tags = [] } = req.body;

    // Re-categorize the snippet if code or language changed
    let combinedTags = tags;
    if (code !== snippet.code || programmingLanguage !== snippet.programmingLanguage) {
      const autoTags = categorizeSnippet(code, programmingLanguage);
      combinedTags = [...new Set([...tags, ...autoTags])];
    }

    // Update snippet
    snippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      {
        title,
        code,
        programmingLanguage,
        description,
        tags: combinedTags,
      },
      { new: true }
    );

    res.json(snippet);
  } catch (error) {
    console.error('Update snippet error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete a snippet
 * @route DELETE /api/snippets/:id
 * @access Private
 */
export const deleteSnippet = async (req: Request, res: Response) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if the snippet belongs to the user
    if (snippet.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Snippet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Snippet removed' });
  } catch (error) {
    console.error('Delete snippet error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Search snippets
 * @route GET /api/snippets/search
 * @access Private
 */
export const searchSnippets = async (req: Request, res: Response) => {
  try {
    const { query, programmingLanguage, tag } = req.query;
    
    // Build search filter
    const filter: any = { user: req.userId };
    
    // Add text search if query provided
    if (query) {
      filter.$text = { $search: query as string };
    }
    
    // Filter by language if provided
    if (programmingLanguage) {
      filter.programmingLanguage = programmingLanguage;
    }
    
    // Filter by tag if provided
    if (tag) {
      filter.tags = tag;
    }
    
    const snippets = await Snippet.find(filter).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (error) {
    console.error('Search snippets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 