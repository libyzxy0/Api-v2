const express = require('express')
const router = express.Router()

const {
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
} = require('../controllers/api')

router.get('/', (req, res, next) => {
	res.send("Test api")
})

router.route('/shoti').get(shoti)
router.route('/shoti/add').get(shotiAdd)
router.route('/simsimi').get(simsimi)
router.route('/simsimi/teach').get(simsimiTeach)
router.route('/tiktok-dl').get(tiktokdl)
router.route('/quotes/today').get(quotesToday)
router.route('/fbImage').get(getFbImage)
router.route('/frog-images').get(frogImages)
router.route('/tts').get(tts)
module.exports = router
