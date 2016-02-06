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

	var catsHolder = $("#catsHolder")

	// almost all the code was changed
	var cats = [
		{
			name: "soooo cute",
			filename: "cat1.jpg"
		},
		{
			name: "japanese cutie",
			filename: "japancat.jpg"
		},
		{
			name: "inspiration",
			filename: "cat2.jpg"
		},
		{
			name: "Two cute cats",
			filename: "twocutecats.jpg"
		},
		{
			name: "Big cat and small cute cats",
			filename: "zoocats.jpg"
		},
		{
			name: "So cute it hurts",
			filename: "hurtingcute.jpg"
		}
	]

	var catsName = $("#catsName")
	var catDisplay = $("#catDisplay")

	cats.forEach(function (value, index, array) {
		var clicks = 0
		var sideTitle = $("<h1>").text(value.name).addClass("catTitle")
		var displayTitle = $("<h1>").text(value.name)
		var image = $("<img />")
						.attr("src", "assets/cats/" + value.filename)
						.attr("alt", "cat pic " + index)
						.addClass("catPic")

		var timesClick = $("<h3>")
		setTimesText(timesClick, clicks)


		sideTitle.click(function (event) {
			catsName.children().removeClass("clicked")
			sideTitle.addClass("clicked")
			displayCat()
		}) 

		catsName.append(sideTitle)

		function setTimesText(element, clicks) {
			element.text("You have clicked this cute cat " + clicks + " " + (clicks > 1 ? "times" : "time"))
		}

		function displayCat() {
			catDisplay.empty()
			catDisplay.append(displayTitle)
			catDisplay.append(timesClick)
			catDisplay.append(image)

			image.click(function (event) {
				clicks++
				setTimesText(timesClick, clicks)
			})
		}

		if (index == 1) {
			catsName.children()[0].click()
		}


	})
})