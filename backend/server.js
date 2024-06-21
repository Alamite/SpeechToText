const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');

// Enable CORS to allow communication with frontend
app.use(cors());

app.use('/api/files', express.static(path.join(__dirname, '../src/Data')));

// Endpoint to fetch specific JSON files
app.get('/api/files/:folder/:file', (req, res) => {
    console.log('GET /api/JsonFile endpoint hit');
    const { folder, file } = req.params;
    const filePath = path.join(__dirname, '../src/Data', folder, file);
    console.log(`Requested file path: ${filePath}`);

    // Optionally, perform additional checks or logic before sending the file
    res.sendFile(filePath, (err) => {
        console.log(filePath);
        if (err) {
            console.error('Error sending file:', err);
            res.status(404).send('File not found');
        } else {
            console.log('File sent successfully');
        }
    });
});

// app.get('/api/files', (req, res) => {
//     console.log('GET /api/files endpoint hit');
//     const dataPath = path.join(__dirname, '../src/Data');
//     fs.readdir(dataPath, { withFileTypes: true }, (err, folders) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to read directories' });
//         }

//         const folderPromises = folders
//             .filter(dirent => dirent.isDirectory())
//             .map(folder => {
//                 const folderPath = path.join(dataPath, folder.name);
//                 return new Promise((resolve, reject) => {
//                     fs.readdir(folderPath, (err, files) => {
//                         if (err) {
//                             return reject(err);
//                         }
//                         resolve({ folder: folder.name, files });
//                     });
//                 });
//             });

//         Promise.all(folderPromises)
//             .then(results => res.json(results))
//             .catch(err => res.status(500).json({ error: 'Failed to read files' }));
//     });
// });


app.get('/api/files', (req, res) => {
    console.log('GET /api/files endpoint hit');
    const dataPath = path.join(__dirname, '../src/Data');
    fs.readdir(dataPath, { withFileTypes: true }, (err, folders) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read directories' });
        }

        const folderPromises = folders
            .filter(dirent => dirent.isDirectory())
            .map(folder => {
                const folderPath = path.join(dataPath, folder.name);
                return new Promise((resolve, reject) => {
                    fs.readdir(folderPath, (err, files) => {
                        if (err) {
                            return reject(err);
                        }
                        // Filter only .mp3 files
                        const mp3Files = files.filter(file => file.toLowerCase().endsWith('.mp3'));
                        resolve({ folder: folder.name, files: mp3Files });
                    });
                });
            });

        Promise.all(folderPromises)
            .then(results => res.json(results))
            .catch(err => res.status(500).json({ error: 'Failed to read files' }));
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
