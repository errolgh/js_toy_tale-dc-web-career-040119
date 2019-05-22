const addBtn = document.getElementById('new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener("DOMContentLoaded",function(){
fetchAllToys()
})


// YOUR CODE HERE
/*
1. When I load the page I want to make a GET fetch, I want all the toys to be in view, so I have to select the toy-container. So i need to append all the toys to the container
*/

function fetchAllToys() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toysArray => toysArray.forEach(renderToy))
}

function renderToy(toy){
  let toyContainer = document.getElementById("toy-collection")
  let toyCard = document.createElement("div")
  toyCard.className = "card"
  toyContainer.appendChild(toyCard)

  let nameTile = document.createElement("h2")
  nameTile.innerText = toy.name
  toyCard.appendChild(nameTile)

  let imgTile = document.createElement("img")
  imgTile.src = toy.image
  imgTile.className = "toy-avatar"
//somehow giving it a class name satisfied the giant picture glitch
  toyCard.appendChild(imgTile)

  let likeTile = document.createElement('p')
  likeTile.innerText = (`Likes: ${toy.likes}`)
  toyCard.appendChild(likeTile)

  let likeButton = document.createElement('button')
  likeButton.innerText = (`Like <3`)
  likeButton.className = "like-btn"
  toyCard.appendChild(likeButton)
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
