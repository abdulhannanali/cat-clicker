window.onload = function () {
	var clickTimes = 0
	var timesText = document.getElementById("timesText")
	var catPic = document.getElementById("catPic")

	setTimesText(clickTimes)
	catPic.addEventListener("click", function (event) {
		clickTimes++
		setTimesText(clickTimes)
	})

	function setTimesText(num) {
		timesText.innerHTML = "You have clicked this cat " + num + " " + (num > 1 ? "times" : "time")
	}
}