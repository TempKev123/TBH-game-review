// File: pages/api/games/index.js
import dbConnect from '../../../lib/dbConnect';
import Game from '../../../models/Game';
import { IncomingForm } from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const games = await Game.find({}).populate('publisher', 'name').populate('developer', 'name');
      res.status(200).json({ success: true, data: games });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ success: false, error: 'Error parsing form data' });
      }

      try {
        const { title, genre, publisher, developer, rating } = fields;
        const image = files.image;

        if (!image) {
          return res.status(400).json({ success: false, error: 'No image file uploaded' });
        }

        // Create uploads directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(uploadDir, { recursive: true });

        // Generate a unique filename
        const uniqueFilename = `${Date.now()}-${image[0].originalFilename}`;
        const newPath = path.join(uploadDir, uniqueFilename);

        // Move the uploaded file to the new location
        await fs.copyFile(image[0].filepath, newPath);
        await fs.unlink(image[0].filepath);

        // Create new game document
        const game = await Game.create({
          title: title[0],
          genre: genre[0],
          publisher: publisher[0],
          developer: developer,
          rating: Number(rating),
          imageUrl: `/uploads/${uniqueFilename}`,
        });

        res.status(201).json({ success: true, data: game });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: 'Error creating game' });
      }
    });
  } else {
    res.status(400).json({ success: false });
  }
}