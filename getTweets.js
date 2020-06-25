const twitter = require("twitter")
const fs = require("fs")

const client = new twitter(JSON.parse(fs.readFileSync("secret/secretTwitter.json","utf-8")))

const params = {screen_name: 'taberu_salad_jp',count:20}

console.log("@" + params.screen_name)
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets)
    fs.appendFileSync("log/timeline.json",JSON.stringify(tweets) + "\n","utf-8")
  }
});