import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateTodo = [
  body('name').notEmpty().withMessage('Name is required'),
  body('shortDescription')
    .notEmpty()
    .withMessage('Short Description is required'),
  body('dateTime').isISO8601().withMessage('Invalid Date & Time'),
  body('status')
    .isIn(['UPCOMING', 'IN_PROGRESS', 'DONE', 'FAILED', 'DEFERRED'])
    .withMessage(
      'Invalid status. Valid options are: UPCOMING, IN_PROGRESS, DONE, FAILED, DEFERRED'
    ),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('error', { errors: errors.array() });
    }
    next();
  },
];
