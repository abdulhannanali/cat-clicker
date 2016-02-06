$(document).ready(function () {
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



	 // Model for the representation of cats in memory
	 var model = {
	 	init: function () {
	 		var cats = [
				{
					name: "soooo cute",
					filename: "cat1.jpg",
					clicks: 0
				},
				{
					name: "japanese cutie",
					filename: "japancat.jpg",
					clicks: 0
				},
				{
					name: "inspiration",
					filename: "cat2.jpg",
					clicks: 0
				},
				{
					name: "Two cute cats",
					filename: "twocutecats.jpg",
					clicks: 0
				},
				{
					name: "Big cat and small cute cats",
					filename: "zoocats.jpg",
					clicks: 0
				},
				{
					name: "So cute it hurts",
					filename: "hurtingcute.jpg",
					clicks: 0
				},
				{
					name: "cowboy dave",
					filename: "cowboy-dave.jpg",
					clicks: 0
				}
			]
	 		this.cats = cats
	 	},
	 	getCats: function () {
	 		return this.cats
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
	 	getSelected: function () {
	 		return this.selectedImage 
	 	},
	 	selectImage: function (i) {
	 		this.selectedImage = i
	 		catsNameView.changeSelect(i)
	 		catDisplayView.render()
	 	},
	 	init: function () {
	 		this.selectedImage = 0
	 		model.init()
	 		catsNameView.init()
	 		catDisplayView.init()
	 		catDisplayView.render()
	 	}
	 }


	 // catDisplay - view 
	 // displays the current cat
	 // a cache for not deleting the picture once displayed
	 var catDisplayView = {
	 	init: function () {
	 		this.catDisplay = $("#catDisplay")
	 		this.rootDirectory = "assets/cats/"
	 		this.cache = {}
	 	},
	 	render: function () {
	 		this.catDisplay.empty()
	 		var selectedImage = octopus.getAllCats()[octopus.getSelected()]

	 		var h1 = $("<h1>")
	 			.text(selectedImage.name)
	 		var timesClick = $("<h2>")
	 			.text(setTimesClick(selectedImage.clicks))

	 		var catPic = $("<img>")
	 			.attr("src", this.rootDirectory + selectedImage.filename)
	 			.addClass("catPic")

	 		catPic.click(function (event) {
	 			octopus.incrementClick(this.selectedImage)
	 		})
	 		
	 		this.catDisplay.append([h1, timesClick, catPic])

	 		function setTimesClick(times) {
	 			return "You have clicked this cute cat " + times + " " + (times > 1 ? "times" : "time")
	 		}
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
	 				.data("index", index)

	 			if (selectedImage == index) {
	 				catName.addClass("clicked")
	 			}

	 			catNodes.push(catName)
	 		})
	 		this.catsName.append(catNodes)
	 		this.catsName.children().click(this.selectEvent)
	 	},
	 	selectEvent: function (event) {
	 		event.preventDefault()
	 		octopus.selectImage($(this).data("index"))
	 	},
	 	changeSelect: function (i) {
	 		$(this.catsName.children()).removeClass("clicked")
	 		$(this.catsName.children()[i]).addClass("clicked")
	 	},
	 	init: function () {
	 		this.catsName = $("#catsName")
	 		this.render()
	 	},

	 }


	 octopus.init()
})