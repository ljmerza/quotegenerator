'use strict'

/* 
 * create xhr object, data/url variables
 * get quote input, quote generator, and tweet elements
 */
var request = new XMLHttpRequest()
var data
var url = 'api/famous'
var quoteEl = document.getElementById("quoteInput")
var authorEl = document.getElementById("quoteAuthor")
var tweetBtn = document.getElementById("tweet")
var genBtn = document.getElementById("generate")



/*
 * Function that opens a ajax request and sends the 
 * request to the local server
 */
genBtn.addEventListener("click", function sendXHR () {
	request.open('GET', url, true)
	request.send()
})



/*
 * Set the default onload and error xhr events to famous quotes
 */
request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
		var data = JSON.parse(request.responseText)

		// if data is undefined then display error
		if(!data.quote || !data.author) {
			error()
		} else {
			quoteEl.innerHTML = data.quote
			authorEl.innerHTML = data.author
			tweet()
		}
	}
}
request.onerror = function() {
	// connection error
	error()
}
function error() {
	quoteEl.innerHTML = ''
	authorEl.innerHTML = ''
	tweetBtn.style.display = 'none'
	document.getElementById("error").innerHTML = "There was an error with your request. Please try again."
}



/*
 * Get the element of each radio button and ass a click listener
 * to change the xhr url and onload function to extract the quote data
 */
document.getElementById("famous").addEventListener("click", function (e) {
	url = 'api/famous'
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText)

			// if data is undefined then display error
			if(!data.quote || !data.author) {
				error()
			} else {
				quoteEl.innerHTML = data.quote
				authorEl.innerHTML = data.author
				tweet()
			}
		}
	}
})
document.getElementById("got").addEventListener("click", function (e) {
	url = 'api/got'
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText)

			// if data is undefined then display error
			if(!data.quote || !data.character) {
				error()
			} else {
				quoteEl.innerHTML = data.quote
				authorEl.innerHTML = data.character
				tweet()
			}
		}
	}
})
document.getElementById("compsci").addEventListener("click", function (e) {
	url = 'api/compsci'
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText)

			// if data is undefined then display error
			if(!data.quote || !data.author) {
				error()
			} else {
				quoteEl.innerHTML = data.quote
				authorEl.innerHTML = data.author
				tweet()
			}
		}
	}
})
document.getElementById("cn").addEventListener("click", function (e) {
	url = 'api/cn'
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText)

			// if data is undefined then display error
			if(!data.value) {
				error()
			} else {
				quoteEl.innerHTML = data.value
				authorEl.innerHTML = 'Chuck Norris'
				tweet()
			}
		}
	}
})


/*
 * Set tweet button link
 */
function tweet() {
	tweetBtn.setAttribute("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quoteEl.innerHTML + " \n\n-- " + authorEl.innerHTML))
	tweetBtn.style.display = ''
}


/*
 * set default tweetBtn display to none and load first quote
 */
tweetBtn.style.display = 'none'
genBtn.click()