
var current_page = 1;
var records_per_page = 12;
var page;

//search photos from unsplash library

function SearchPhotos() 
{
	let clientId = "WLxLSi8FkWSFyjm657qYSOP5MehHonMESl0v41LyufA";
	let query = document.getElementById('search_image_text').value;
	let url = "https://api.unsplash.com/search/photos/?page="+page+"&per_page="+records_per_page+"&client_id=" +clientId+ "&query="+query;

	//make request to fetch

	fetch(url)
		.then(function (data){
			return data.json();	
		})
		.then(function (data){
			console.log(data);
				data.results.forEach(photo =>{
				let result = `
				<div class="col"> 	
					<div class="col align-self-center">
						<img src="${photo.urls.regular}" id="img-thumbnail-new" onClick="EnlargePhoto('${photo.urls.regular}')"/>
							<div class="row details-area">
								<div class="col">
									<img src="${photo.user.profile_image.large}" class="author-image"/>
								</div>
								<div class="col align-self-center">
									<h3 align="center">${photo.user.name}</h3><br>
								</div>
								<div>
									<br><b>${photo.user.bio}</b>
								</div>
								<div>
									Total Likes of Photographer <b style="color: red">${photo.user.total_likes}</b><br>
									Total Likes of Photo <b style="color: red">${photo.likes}</b><br>
									Total Uploaded Photos <b style="color: red">${photo.user.total_photos}</b><br>
									Created On <b style="color: red">${photo.created_at}</b>
								</div>
							</div>
					</div>
				</div>
				`;	
				$("#result").append(result);
				});
		})
		$("#result").empty();
}

//pagination
function changePage(page)
{
	let clientId = "WLxLSi8FkWSFyjm657qYSOP5MehHonMESl0v41LyufA";
	let query = document.getElementById('search_image_text').value;
	let url = "https://api.unsplash.com/search/photos/?page="+page+"&per_page="+records_per_page+"&client_id=" +clientId+ "&query="+query;
	
	fetch(url)
		.then(function (data){
			return data.json();	
		})
		.then(function (data){
			let totalpages = data.total_pages;
			//console.log("pagesCustom");
			var btn_next = document.getElementById("btn_next");
		    var btn_prev = document.getElementById("btn_prev");   
		    var page_span = document.getElementById("page");
		    // Validate page
		    //console.log("pagesCustom1");
		    if (page < 1) 
		    {
		    	page = 1;
		    }
		    else if (page > data.total_pages)
		    {
		    	 page = data.total_pages;
		    }
	    newContent(page);
	    page_span.innerHTML = page;
	});
}

function prevPage()
{
    if (current_page > 1) 
    {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
	let clientId = "WLxLSi8FkWSFyjm657qYSOP5MehHonMESl0v41LyufA";
	let query = document.getElementById('search_image_text').value;
	let url = "https://api.unsplash.com/search/photos/?page=2&per_page="+records_per_page+"&client_id=" +clientId+ "&query="+query;
	
	fetch(url)
		.then(function (data){
			return data.json();	
		})
		.then(function (data){
			let totalpages = data.total_pages;
			//console.log("nextPage");

		    if (current_page < data.total_pages) 
		    {
		        current_page++;
		        changePage(current_page);
		    }
		});
}

function newContent(page)
{
	$("#result").empty();
	console.log("newContent enter");
	let clientId = "WLxLSi8FkWSFyjm657qYSOP5MehHonMESl0v41LyufA";
	let query = document.getElementById('search_image_text').value;
	let url = "https://api.unsplash.com/search/photos/?page="+page+"&per_page="+records_per_page+"&client_id=" +clientId+ "&query="+query;
	
	fetch(url)
		.then(function (data){
			return data.json();	
		})
		.then(function (data){
			console.log(data);
				data.results.forEach(photo =>{
				let newresult = `
				<div class="col"> 	
					<div class="col align-self-center">
						<img src="${photo.urls.regular}" id="img-thumbnail-new" onClick="EnlargePhoto('${photo.urls.regular}')"/>
							<div class="row details-area">
								<div class="col">
									<img src="${photo.user.profile_image.large}" class="author-image"/>
								</div>
								<div class="col align-self-center">
									<h3 align="center">${photo.user.name}</h3><br>
								</div>
								<div>
									<br><b>${photo.user.bio}</b>
								</div>
								<div>
									Total Likes of Photographer <b style="color: red">${photo.user.total_likes}</b><br>
									Total Likes of Photo <b style="color: red">${photo.likes}</b><br>
									Total Uploaded Photos <b style="color: red">${photo.user.total_photos}</b><br>
									Created On <b style="color: red">${photo.created_at}</b>
								</div>
							</div>
					</div>
				</div>
				`;	
			$("#newresult").append(newresult);
			});
		})
	console.log("newContent 3");
	$("#newresult").empty();
}

//enlarge photo onclick
function EnlargePhoto(src)
{
	console.log(src);
	console.log('src');
	var enlarged = document.getElementById("enlargedImage");
	// Get the image and insert it inside the enlarged - use its "alt" text as a caption
	var img = document.getElementById("searchedImage");
	var enlargedImg = document.getElementById("img01");

	enlarged.style.display = "block";
	enlargedImg.src = src;		

	// Get the <span> element that closes the enlarged
	var span = document.getElementsByClassName("close-new")[0];

	// When the user clicks on <span> (x), close the enlarged
	span.onclick = function() { 
	  enlarged.style.display = "none";
	}
}

