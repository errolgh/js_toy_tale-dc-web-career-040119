const addBtn = document.getElementById('new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener("DOMContentLoaded",function(){
fetchAllToys()
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', addToyToDb)
    //i had to look to realize i needed to add this line...
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

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
//.prependChild to see the new object at the top of the page on reload
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
  
  likeTile.dataset.likeid = toy.id
  // what the fuck is this??????

  let likeButton = document.createElement('button')
  likeButton.innerText = (`Like <3`)
  likeButton.className = "like-btn"
  toyCard.appendChild(likeButton)

  likeButton.addEventListener("click", () => {
    handleLikes(toy)
    //must be anonymous in order to use it upon event, or else it will be invoked upon page load
  })
}


function handleLikes(toy){
  console.log("we liked it")
  let likePayLoad = {
  method: "PATCH",
  headers:
  {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(
  {
    "likes": toy.likes++
    //needed to be incremented
  })
}
//where does toy.id originate from
  fetch(`http://localhost:3000/toys/${toy.id}`, likePayLoad)
  .then(res => res.json())
  .then(newLikeObj => {
    let yeet = document.querySelector(`[data-likeid = '${newLikeObj.id}']`)
      yeet.innerText = (`Likes: ${newLikeObj.likes}`)
  })

}



















const submitToyButton = document.getElementById("submitNewToyButton")
submitToyButton.addEventListener('submit', addToyToDb)

function addToyToDb(event){
  event.preventDefault()
// did not invoke preventDefault function
//idr how we get this form data for the POST request
  nameInput = document.getElementById("toyName").value
  imageInput = document.getElementById("toyImage").value

  toyDataFormat = {
  method: "POST",
  headers:
  {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    "name": nameInput,
    "image": imageInput,
    "likes": 0
  })
  // missed the fact that they want us to hardcord the likes
}

  fetch(`http://localhost:3000/toys`, toyDataFormat)
  .then(res => res.json())
  .then(toyData => renderToy(toyData))//renderToy(toyDbObj))
}
//idr how to persist to database
//idr how to add to DOM
//never learned how to incriment like button
// OR HERE!
