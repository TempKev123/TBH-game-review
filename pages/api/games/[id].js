// File: pages/api/games/[id].js
import dbConnect from '@/lib/dbConnect';
import Game from '@/models/Game';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const game = await Game.findById(id).populate('publisher developer');
        if (!game) {
          return res.status(404).json({ success: false, message: 'Game not found' });
        }
        res.status(200).json({ success: true, data: game });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
      }
      break;

    case 'PUT':
      try {
        const game = await Game.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!game) {
          return res.status(404).json({ success: false, message: 'Game not found' });
        }
        res.status(200).json({ success: true, data: game });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Update failed', error });
      }
      break;

    case 'DELETE':
      try {
        const deletedGame = await Game.deleteOne({ _id: id });
        if (!deletedGame.deletedCount) {
          return res.status(404).json({ success: false, message: 'Game not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Deletion failed', error });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
