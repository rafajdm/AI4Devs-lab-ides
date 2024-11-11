import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import Joi from 'joi';
import { authenticateToken } from '../middleware/auth';
import { sanitize } from '../utils/sanitize';
import path from 'path';
import fs from 'fs';

const router = Router();
const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const candidateSchema = Joi.object({
  firstName: Joi.string().trim().required().custom((value, helpers) => {
    return sanitize(value);
  }),
  lastName: Joi.string().trim().required().custom((value, helpers) => {
    return sanitize(value);
  }),
  email: Joi.string().email().trim().required().custom((value, helpers) => {
    return sanitize(value);
  }),
  phone: Joi.string().trim().required().custom((value, helpers) => {
    return sanitize(value);
  }),
  address: Joi.string().trim().required().custom((value, helpers) => {
    return sanitize(value);
  }),
  education: Joi.string().trim().required().custom((value, helpers) => {
    return sanitize(value);
  }),
  experience: Joi.string().trim().required().custom((value, helpers) => {
    return sanitize(value);
  }),
});

router.post('/api/candidates', authenticateToken, upload.single('resume'), async (req: MulterRequest, res) => {
  try {
    const { error, value } = candidateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { firstName, lastName, email, phone, address, education, experience } = value;
    const resume = req.file?.path ?? '';

    const candidate = await prisma.candidate.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
        education,
        experience,
        resume,
      },
    });

    res.status(201).json(candidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add candidate' });
  }
});

router.get('/api/test-auth', authenticateToken, (req: Request, res: Response) => {
  res.json({ message: 'Authenticated successfully', user: req.user });
});

router.get('/uploads/:filename', authenticateToken, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../../uploads', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.sendFile(filePath);
  });
});

export default router;