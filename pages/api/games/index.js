import dbConnect from '../../../lib/dbConnect';
import Game from '../../../models/Game';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Required for using formidable
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const games = await Game.find({}).populate('publisher', 'name').populate('developer', 'name');
      res.status(200).json({ success: true, data: games });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Error fetching games' });
    }
  } else if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ success: false, error: 'Error parsing form data' });
      }

      try {
        const { title, genre, publisher, developer, rating } = fields;

        // Create new game document
        const game = await Game.create({
          title: title[0],
          genre: genre[0],
          publisher: publisher[0],
          developer: developer[0],
          rating: Number(rating[0]),
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
