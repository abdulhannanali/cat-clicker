// Useful notes
/*
 * Problems in this code

 * The models and the views are talking directly so it's not much of a seperation of concern
 * Even though it's better than andy's code it's not the best way to attain modularity in code
 * I need to have a very important component of the code namely Octopus which talks with model
 * and the views and updates them depending on the problem
 * Also, it'll be probably better to make two views instead of one
 * One for:
 * - CatsName
 * - CatsDisplay
 */
/*
 * Comparison with Ben's solution

 * Ben's is doing less DOM manipulation than me. Instead of adding a new DOM element
 * each time. He's just doing it once in the view before hand. And then manipulating those
 * DOM elements to display what it wants to display.
 * Ben is using closure instead of a $().data() method to display the data attributes
 * CurrentCat is contianed in the model instead of the view and I think too it should be
 * int the 
 */
 /*
  * Improvements made after referring to the Ben's solution

  * Instead of creating a separate DOM element now I am creating a single DOM element
  * and manipulating it's attributes therefore avoiding new dom elements creation
  * Instead of data attributes for the DOM manipulation I am using a closure 
  * for all the cats names in the CatNameView for selecting
  * Similarly, to increment the timesClick I am calling octopus and there's just one binding to 
  * the main element picture instead of so many other bindings.
  */

$(document).ready(function () {
	



	 // Model for the representation of cats in memory
	 var model = {
	 	init: function () {
	 		var cats = [
				{
					name: "soooo cute",
					filename: "assets/cats/cat1.jpg"
				},
				{
					name: "Tiger",
					filename: "assets/cats/tiger.jpg"
				},
				{
					name: "Keyboard Cat",
					filename: "assets/cats/keyboard-cat.jpg"
				},
				{
					name: "japanese cutie",
					filename: "assets/cats/japancat.jpg"
				},
				{
					name: "inspiration",
					filename: "assets/cats/cat2.jpg"
				},
				{
					name: "Two cute cats",
					filename: "assets/cats/twocutecats.jpg"
				},
				{
					name: "Big cat and small cute cats",
					filename: "assets/cats/zoocats.jpg"
				},
				{
					name: "So cute it hurts",
					filename: "assets/cats/hurtingcute.jpg"
				},
				{
					name: "cowboy dave",
					filename: "assets/cats/cowboy-dave.jpg"
				}
			]

			cats = cats.map(function (value, index) {
				value.clicks = 0
				return value
			})

	 		this.cats = cats
	 	},
	 	getCats: function () {
	 		return this.cats
	 	},
	 	updateCat: function (cat, i) {
	 		this.cats[i] = cat
	 	},
	 	incrementClick: function (i) {
	 		this.cats[i].clicks++
	 	}
	 }


	 // octopus - the thing which talks with Model and Views
	 var octopus = {
	 	incrementClick: function () {
	 		model.incrementClick(this.selectedImage)
	 		catDisplayView.render()
	 	},
	 	getAllCats: function () {
	 		return model.getCats()
	 	},
	 	updateCat: function (cat) {
	 		model.updateCat(cat, this.selectedImage)
	 		catDisplayView.render()
	 	},
	 	getSelected: function () {
	 		return this.selectedImage 
	 	},
	 	getCurrentCat: function () {
	 		return this.getAllCats()[this.selectedImage]
	 	},
	 	selectImage: function (i) {
	 		this.selectedImage = i
	 		catsNameView.changeSelect(i)
	 		catDisplayView.render()
	 		catAdminView.render()
	 	},
	 	init: function () {
	 		this.selectedImage = 0
	 		model.init()
	 		catsNameView.init()
	 		catDisplayView.init()
	 		catAdminView.init()
	 	}
	 }	


	 // catDisplay - view 
	 // displays the current cat
	 // a cache for not deleting the picture once displayed
	 var catDisplayView = {
	 	init: function () {
	 		this.catDisplay = $("#catDisplay")
	 		this.cache = {}

	 		this.nameHead = $("<h1>")
	 		this.timesClick = $("<h2>")
	 		this.catPic = $("<img>")
	 			.addClass("catPic")

	 		this.catPic.click(function (event) {
	 			octopus.incrementClick()
	 		})

	 		this.catDisplay.append([this.nameHead, this.timesClick, this.catPic])
	 		this.render()

	 	},
	 	render: function () {
	 		this.currentCat = octopus.getCurrentCat()

	 		this.nameHead
	 			.text(this.currentCat.name)

	 		this.timesClick
	 			.text(this.setTimesClick(this.currentCat.clicks))

	 		this.catPic
	 			.attr("src", this.currentCat.filename)
	 			.addClass("catPic")
	 	},
	 	setTimesClick: function (times) {
	 		return "You have clicked this cute cat " + times + " " + (times > 1 ? "times" : "time")
	 	},
	 	incrementTimes: function () {
	 		this.timesClick
	 			.text(this.setTimesClick(this.currentCat.clicks))
	 	}

	 }


	 // CatsName - View
	 // lists the name of all the cats

	 // first it will change model for selection and then it will re render the view
	 // selected name is gotten from the octopus
	 // rerendering this view each time is an expensive operation and should not be performed


	 var catsNameView = {
	 	render: function () {
	 		var catNodes = []
	 		var selectedImage = octopus.getSelected()
	 		octopus.getAllCats().forEach(function (cat, index) {
	 			var catName =  $("<h1>")
	 				.text(cat.name)

	 			if (selectedImage == index) {
	 				catName.addClass("clicked")
	 			}

	 			catNodes.push(catName)
	 			catName.click(function () {
	 				octopus.selectImage(index)
	 			})
	 		})
	 		this.catsName.append(catNodes)
	 	},
	 	changeSelect: function (i) {
	 		$(this.catsName.children()).removeClass("clicked")
	 		$(this.catsName.children()[i]).addClass("clicked")
	 	},
	 	init: function () {
	 		this.catsName = $("#catsName")
	 		this.render()
	 	}

	 }

	 var catAdminView = {
	 	init: function () {
	 		this.adminPanel = $("#adminPanel")
	 		this.adminButton = $("#adminButton")
	 		this.adminForm = $("#adminForm")

	 		this.catName = $("#catNameInput")
	 		this.catPicture = $("#catPictureInput")
	 		this.clicks = $("#clickInput")

	 		this.save = $("#saveBtn")
	 		this.cancel = $("#cancelBtn")

	 		
	 		this.adminButton.on("click", function (event) {
	 			this.adminForm.show()
	 		}.bind(this))

	 		this.save.on("click", function (event) {
	 			var cat = {
	 				name: this.catName.val(),
	 				filename: this.catPicture.val(),
	 				clicks: this.clicks.val()
	 			}
	 			octopus.updateCat(cat)
	 			this.adminForm.hide()
	 			event.preventDefault()
	 		}.bind(this))

	 		this.cancel.on("click", function (event) {
	 			this.adminForm.hide()
	 			event.preventDefault()
	 		}.bind(this))


	 		this.adminForm.hide() 

	 		this.render()
	 	},

	 	// function for setting the input details of the cat at hand
	 	setInputDetails: function (cat) {
	 		this.catName.val(cat.name)
	 		this.catPicture.val(cat.filename)
	 		this.clicks.val(cat.clicks)
	 	},
	 	render: function () {
	 		this.currentCat = octopus.getCurrentCat()

	 		this.setInputDetails(this.currentCat)
	 	}

	 }

	 octopus.init()
})