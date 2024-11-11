import { Router, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import Joi from 'joi';

const router = Router();
const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const candidateSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  education: Joi.string().required(),
  experience: Joi.string().required(),
});

router.post('/api/candidates', upload.single('resume'), async (req: MulterRequest, res) => {
  try {
    const { error, value } = candidateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'resume is required' });
    }

    const { firstName, lastName, email, phone, address, education, experience } = value;
    const resume = req.file.path;

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
    res.status(500).json({ error: 'Failed to add candidate' });
  }
});

export default router;