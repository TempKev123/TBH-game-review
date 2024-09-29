// File: pages/api/developers/[id].js
import dbConnect from '@/lib/dbConnect';
import Developer from '@/models/Developer';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const developer = await Developer.findById(id);
        if (!developer) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: developer });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const developer = await Developer.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!developer) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: developer });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedDeveloper = await Developer.deleteOne({ _id: id });
        if (!deletedDeveloper) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}