// File: pages/api/publishers/[id].js
import dbConnect from '@/lib/dbConnect';
import Publisher from '@/models/Publisher';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const publisher = await Publisher.findById(id);
        if (!publisher) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: publisher });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const publisher = await Publisher.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!publisher) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: publisher });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedPublisher = await Publisher.deleteOne({ _id: id });
        if (!deletedPublisher) {
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
