const _ = require('lodash');
const fs = require('fs');
const ytdl = require('ytdl-core');
const readline = require('readline');
const config = require('./config.json')
const { stdin: input, stdout: output } = require('process');

let minStart = 0;
let minFinished = 0;


const rl = readline.createInterface({input, output});

const buildListVideos = async (urls) => {
  const urls_splited = urls.split('||');
  console.log(`the videos are: ${urls_splited.length}`);
  urls_splited.forEach((element, i) => {
    ytdl(element, { filter: format => format.container === 'mp4', quality: 'highestaudio' })
    .pipe(fs.createWriteStream(`video_${i}.mp4`))
  });
  console.log(`Creating video...`);
}

const buildSingleVideo = async (url) => {
  console.log(`the video is: ${url}`);
  ytdl(url, { filter: format => format.container === 'mp4', range: {start: minStart, end: minFinished} })
    .pipe(fs.createWriteStream('video.mp4'))
  console.log(`Creating video...`);
  rl.close();
}

rl.question('Url to download: ', async (answer) => {
  rl.question('Do you have a specific min to start?', async (answerTwo) => {
    rl.question('Do you have a specific min to finish?', async(answerThree) => {
      const isEnableList = config.is_enable_list;
      minStart = +answerTwo;
      minFinished = +answerThree;
      const isList = _.isArray(answer);
      if(isEnableList && isList){
        await buildListVideos(answer);
      }else {
        await buildSingleVideo(answer);
      }
    });
  });
});

rl.on('close', () => {
  console.log('Finished.');
});
