const Simsimi = require('../models/Simsimi')
const Shoti = require('../models/Shoti')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const getAPI = require('../utils/getAPI')


const shoti = asyncWrapper(async (req, res) => {
   const urls = await Shoti.find({})
   const video_url = urls[Math.floor(urls.length * Math.random())];
  const data = {
  	status: "success", 
      code: 200, 
  	result: {
          url: video_url.video
      }
  }
  res.status(200).json(data)
})

const shotiAdd = asyncWrapper(async (req, res) => {
	let url = req.query.url;
	let data = new Shoti({
		video: url
	});
	data.save();
    res.status(200).json({ message: "success" })
}) 

const simsimi = asyncWrapper(async (req, res) => {
  const simsimiArr = await Simsimi.find({})
  getAPI('../api/simsimi', (api) => {
  	api.simsimi(req.query.message, (data) => {
          res.status(200).json(data)
      }, simsimiArr)
  })
})

const simsimiTeach = asyncWrapper(async (req, res) => {
  let newData = new Simsimi({
  	message: req.query.message, 
      reply: req.query.reply
  });
   newData.save();
   res.status(200).json("success")
})

const tiktokdl = asyncWrapper(async (req, res) => {
  getAPI('../api/tiktokdl', (api) => {
  	api.tiktokdl(req.query.url, (err, resp) => {
  	    if (!err && resp.statusCode === 200) {
                res.set("Content-Type", "video/mp4");
                res.send(resp.body);
            }
      }) 
  })
})

const quotesToday = asyncWrapper(async (req, res) => {
  getAPI('../api/quotes', (api) => {
  	api.quotesToday((data) => {
			res.status(200).json(data)
      })
  })
})

const getFbImage = asyncWrapper(async (req, res) => {
  getAPI('../api/getFbImage.js', (api) => {
		api.getFbImage(req.query.uid, (err, resp) => {
			if (!err && resp.statusCode === 200) {
                res.set("Content-Type", "image/png");
                res.send(resp.body);
            }
        })
    })
})

const frogImages = asyncWrapper(async (req, res) => {
  getAPI('../api/frog.js', (api) => {
		api.frogImg((data) => {
			res.type('json').send(JSON.stringify(data, null, 2) + '\n');
        })
    })
})

const quotes = asyncWrapper(async (req, res) => {
  
})

const tts = asyncWrapper(async (req, res) => {
  getAPI('../api/tts.js', (api) => {
		api.tts({ lang: req.query.lang, prompt: req.query.text }, (err, resp) => {
			if (!err && resp.statusCode === 200) {
                res.set("Content-Type", "audio/mp3");
                res.send(resp.body);
            }
        })
    })
})


module.exports = {
  shoti,
  shotiAdd, 
  simsimi, 
  simsimiTeach, 
  tiktokdl, 
  getFbImage, 
  frogImages, 
  quotesToday, 
  quotes, 
  tts, 
}
