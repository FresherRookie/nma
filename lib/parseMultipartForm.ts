import { IncomingMessage } from 'http';
import formidable, { Fields, Files } from 'formidable';


export async function parseMultipartForm(
  req: IncomingMessage
): Promise<{ fields: Fields; files: Files }> {
  const form = new formidable.IncomingForm({ multiples: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}
