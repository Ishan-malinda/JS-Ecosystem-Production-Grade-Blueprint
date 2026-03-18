import logger from '#config/logger.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '#services/users.service.js';
import { userIdSchema, updateUserSchema } from '#validations/users.validation.js';
import { formatValidationError } from '#utils/format.js';

export const fetchAllUsers = async (req, res, next) => {
  try {
    logger.info('Getting users...');
    const allUsers = await getAllUsers();
    res.json({ message: 'Successfully retrieved users', users: allUsers, count: allUsers.length });
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

export const fetchUserById = async (req, res, next) => {
  try {
    const validationResult = userIdSchema.safeParse({ id: req.params.id });
    if (!validationResult.success) {
      return res.status(400).json({ error: 'Validation failed', details: formatValidationError(validationResult.error) });
    }
    const { id } = validationResult.data;
    const user = await getUserById(id);
    res.json({ message: 'User retrieved successfully', user });
  } catch (e) {
    if (e.message === 'User not found') return res.status(404).json({ error: 'User not found' });
    next(e);
  }
};
