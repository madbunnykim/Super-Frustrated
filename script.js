let margin = .001;
// let locations = [];

window.addEventListener('load', preload);
// window.addEventListener('load', onLoad);

function preload(){
	// load location data
	axios.get("/locations.json")
		.then(function (response) {
    		// handle success
    		// console.log(response.data);
    		locations = response.data.locations;
				onLoad();
  		}
	);
}

function onLoad(){
	console.log("checking");
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(successCallback, errorCallback, {});

		function successCallback(currentPosition) {
			let lat = currentPosition.coords.latitude;
			let lon = currentPosition.coords.longitude;

			console.log(lat + " " + lon);

			let name = "";
			let disp = "";
			let text = "";
			locations.forEach(function(loc){
				if( Math.abs(loc.lat - lat) < margin && Math.abs(loc.lon - lon) < margin ) {
					name = loc.name;
					disp = loc.display;
					text = loc.text;
					console.log("at " + name);
					return;
				}
			});

			if(name != ""){
				hideAll();
				// display the relevant content
				document.getElementById(name).style.display = "block";
				// document.getElementById("loc_text").textContent = disp;
				document.getElementById("text").textContent = "Listen to a super frustrated modern love story at " + disp;
				// load the story in text form
				text_container = document.getElementById("text_container");
				if(text_container.children.length == 0){
					for (let i = 0; i < text.length; i++) {
						let p = document.createElement("p");
						p.textContent = text[i];
						text_container.appendChild(p);
					}
				}
				// enable the button to read the text
				document.getElementById("text_story_button").style.display = "block";
			}
		}
		function errorCallback(e) {
			console.log(e);
		}
	} else {
		alert("enable your location");
	}
}

// hide all audios
function hideAll(){
	locations.forEach(function(loc){
		let id = loc.name;
		document.getElementById(id).style.display = "none";
	});
}

// this function toggles stories in text
function showTextStory(){
	let text_status = document.getElementById("text_container").style.display;
	if(text_status == "block"){
		document.getElementById("text_container").style.display = "none";
		document.getElementById("text_story_button").textContent = "Read in text";
	}
	else{
		document.getElementById("text_container").style.display = "block";
		document.getElementById("text_story_button").textContent = "Hide text";
	}
}
