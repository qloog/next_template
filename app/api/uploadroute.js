import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false, // Disabling body parsing to use formidable
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.status(500).json({ error: 'Error parsing the files' });
                return;
            }
            console.log('Files:', files);
            res.status(200).json({ message: 'Files received' });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
