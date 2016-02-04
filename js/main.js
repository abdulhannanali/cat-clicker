$(document).ready(function () {
	var catsHolder = $("#catsHolder")

	// almost all the code was changed
	var cats = [
		{
			name: "japanese cutie",
			filename: "japancat.jpg"
		},
		{
			name: "soooo cute",
			filename: "cat1.jpg"
		},
		{
			name: "inspiration",
			filename: "cat2.jpg"
		}
	]

	cats.forEach(function (value, index, array) {
		var clicks = 0
		var title = $("<h1>").text(value.name).addClass("catTitle")
		var image = $("<img />")
						.attr("src", "assets/" + value.filename)
						.attr("alt", "cat pic " + index)
		var timesClick = $("<h3>")
		setTimesText(timesClick, clicks)

		image.click(function (event) {
			clicks++
			setTimesText(timesClick, clicks)
		})

		function setTimesText(element, num) {
			element.text("You have clicked this cute cat " + num + " " + (num > 1 ? "times" : "time"))
		}

		var catDiv = $("<div class='catDiv'>")
			.append(title)
			.append(image)
			.append(timesClick)

		catsHolder.append(catDiv)
	})
})