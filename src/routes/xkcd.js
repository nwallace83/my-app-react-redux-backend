var express = require('express')
const fetch = require('node-fetch')
var router = express.Router();

router.get('/', async (req,res) => {
    var responseBody = await fetchComics()
    res.json(responseBody)

})

async function fetchComics(){
    var promiseArray = [];
    var comics = []
    for (let index = 0; index < 10; index++) {
        promiseArray.push(
            fetch('http://xkcd.com/' + Math.floor(Math.random() * 2481 + 1) + '/info.0.json')
                .then(res => res.json())
                .then(res => comics.push({img: res.img, title:res.title}))
                .catch(err => console.log(err))
        )
    }

    await Promise.all(promiseArray)
    return comics;
}

module.exports = router;