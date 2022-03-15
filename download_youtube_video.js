const fs = require('fs');
const ytdl = require('ytdl-core');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

rl.question('Url a descargar: ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`El video es: ${answer}`);
  let url = answer;
  ytdl(url, { filter: format => format.container === 'mp4' }).pipe(fs.createWriteStream('video.mp4'))
  console.log(`Creando video...`);
  rl.close();
});

rl.on('close', () => {
  console.log('Terminado.');
});
