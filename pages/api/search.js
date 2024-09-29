// File: pages/api/search.js
import dbConnect from '../../lib/dbConnect';
import Game from '../../models/Game';
import Publisher from '../../models/Publisher';
import Developer from '../../models/Developer';

export default async function handler(req, res) {
  const { q } = req.query;

  await dbConnect();

  try {
    const games = await Game.find({ title: { $regex: q, $options: 'i' } }).limit(5);
    const publishers = await Publisher.find({ name: { $regex: q, $options: 'i' } }).limit(5);
    const developers = await Developer.find({ name: { $regex: q, $options: 'i' } }).limit(5);

    res.status(200).json({
      success: true,
      data: { games, publishers, developers }
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}