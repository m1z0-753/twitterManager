const twitter = require("twitter")
const fs = require("fs")

const client = new twitter(JSON.parse(fs.readFileSync("secret/secretTwitter.json", "utf-8")))
const params = {
  screen_name: 'taberu_salad_jp',
  cursor:-1
}

client.get('followers/ids', params, function(error, followers, response){
  console.log(followers)
  fs.writeFileSync("log/followers.json",JSON.stringify(followers) + "\n", "utf-8")
})

  