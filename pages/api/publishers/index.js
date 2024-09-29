// File: pages/api/publishers/index.js
import dbConnect from '@/lib/dbConnect';
import Publisher from '@/models/Publisher';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const publishers = await Publisher.find({});
        res.status(200).json({ success: true, data: publishers });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const publisher = await Publisher.create(req.body);
        res.status(201).json({ success: true, data: publisher });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}