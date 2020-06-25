const firebase = require("firebase")
require("firebase/firestore")
const fs = require("fs")

const followers = JSON.parse(fs.readFileSync("followers.json", "utf-8"))
const f_lengh = followers.ids.length

firebase.initializeApp(JSON.parse(fs.readFileSync("secret/secretFirebase.json", "utf-8")))
var db = firebase.firestore()
const date = new Date().toString()
var index = -1

const exampleFunc = function() {
	index++;
	console.log("users", index, followers.ids[index])
	db.collection("userIds").doc(followers.ids[index].toString()).set({
		id: followers.ids[index],
		followed_date: date
	})
	.then(() => {
		console.log("Document successfully setted!")
	})
	.catch(function(error) {
		console.error("Error adding document: ", error)
	})
};

function loopSlowly(loop, interval) {
	console.log('start...')
	for(let i = 0; i < loop; i++) {
		setTimeout(exampleFunc, i * interval);
	}
}

loopSlowly(f_lengh - 1, 1000)