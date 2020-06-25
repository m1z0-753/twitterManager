const fs = require("fs")
const firebase = require("firebase")
require("firebase/firestore")

firebase.initializeApp(JSON.parse(fs.readFileSync("secret/secretFirebase.json", "utf-8")))
var db = firebase.firestore()
const followers = JSON.parse(fs.readFileSync("followers.json", "utf-8"))
const date = new Date().toString()

var followList = new Array()
var unfollowList = new Array()

db.collection("userIds").get().then(function(querySnapshot) {
  var savedList = []
  querySnapshot.forEach(function(doc) {
    savedList.push(doc.data().id)
  })
  // 新たなフォローの時
  getDiff(followers.ids, savedList, item => followList.push(item))
  if (followList.length !== 0) {
    console.log('followList', followList)
    loopSlowly(setFirebase, followList.length, 1000)
  } else {
    console.log('no follow')
  }
  // アンフォローの時
  getDiff(savedList, followers.ids, item => unfollowList.push(item))
  if (unfollowList.length !== 0) {
    console.log('unfollowList', unfollowList)
    loopSlowly(delFirebase, unfollowList.length, 1000)
  } else {
    console.log("no unfollow")    
  }
})

function getDiff(x, y, op){
  x.forEach(item => {
    if (!y.includes(item)) op(item)
  })
}

var followIndex = -1
const setFirebase = function() {
  followIndex++
  console.log('set', followIndex, followList[followIndex])
  db.collection("userIds").doc(followList[followIndex].toString()).set({
    id: followList[followIndex],
    followed_date: date
  }).then(() => {
    console.log("Document successfully setted!")
  }).catch(function(error) {
    console.error("Error adding document: ", error)
  })
}

var unfollowIndex = -1
const delFirebase = function() {
  unfollowIndex++
  console.log('set', unfollowIndex, unfollowList[unfollowIndex])
  db.collection("userIds").doc(unfollowList[unfollowIndex].toString()).delete().then(function() {
    console.log("Document successfully deleted!")      
  }).catch(function(error) {
    console.error("Error removing document: ", error)
  })
}

function loopSlowly(func, loop, interval) {
	console.log('start...')
	for(let i = 0; i < loop; i++) {
		setTimeout(func, i * interval)
	}
}
