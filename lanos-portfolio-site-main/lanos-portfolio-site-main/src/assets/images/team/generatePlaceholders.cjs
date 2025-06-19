// This script generates placeholder images for the team section
// Run with Node.js: node generatePlaceholders.cjs

const fs = require('fs');
const path = require('path');
const https = require('https');

// Create team member images directory if it doesn't exist
const teamDir = path.join(__dirname);
if (!fs.existsSync(teamDir)) {
  fs.mkdirSync(teamDir, { recursive: true });
}

// Generate 10 placeholder images using placeholder.com
const generateImage = (index) => {
  return new Promise((resolve, reject) => {
    const fileName = `team-member-${index}.jpg`;
    const filePath = path.join(teamDir, fileName);
    
    // Different colors for variety
    const colors = [
      '1abc9c', '3498db', '9b59b6', 'e74c3c', 'f39c12',
      '27ae60', '2980b9', '8e44ad', 'c0392b', 'd35400'
    ];
    
    // Use a placeholder service to generate images
    const url = `https://via.placeholder.com/400x400/${colors[index-1]}/ffffff?text=Team+Member+${index}`;
    
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Generated ${fileName}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
};

// Generate all 10 images
const generateAllImages = async () => {
  const promises = [];
  for (let i = 1; i <= 10; i++) {
    promises.push(generateImage(i));
  }
  
  try {
    await Promise.all(promises);
    console.log('All team member placeholder images generated successfully!');
  } catch (error) {
    console.error('Error generating images:', error);
  }
};

generateAllImages();