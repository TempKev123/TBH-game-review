// File: pages/api/developers/index.js
import dbConnect from '@/lib/dbConnect';
import Developer from '@/models/Developer';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const developers = await Developer.find({});
        res.status(200).json({ success: true, data: developers });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const developer = await Developer.create(req.body);
        res.status(201).json({ success: true, data: developer });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
