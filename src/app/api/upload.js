import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = await new Promise((resolve, reject) => {
      const chunks = [];
      req.on('data', (chunk) => chunks.push(chunk));
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', (err) => reject(err));
    });

    const filename = `${Date.now()}.jpg`;
    const filepath = path.join(process.cwd(), 'public', filename);

    fs.writeFileSync(filepath, data);
    res.status(200).json({ url: `/public/${filename}` });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
