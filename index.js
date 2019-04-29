$(document).ready(function() {
			var url= "https://api.flickr.com/services/feeds/photos_public.gne?id=148133817@N04&format=json&jsoncallback=?&tags=qcpic";
			//loads the images from flickr into the bxslider	
			//images are sourced with their original locations on the descriptions of the photos on flickr
			$.getJSON(url, function(data){
				$.each(data.items, function(i, item){
					//it appears the flickr json loads the small image, changing the _m to _c fixes that.
					item.media.m=item.media.m.replace("_m","_c");
					$("#slider").append(
					"<div>"+
					"<a href='" + item.link + "'>"+
					"<img src='"+item.media.m+"'>"+"</a>"+
					"</div>"
					); 
				});	
				//needs to load bxslider after all the images have been appended.
				$("#slider").bxSlider({
					mode: 'fade',
					infiniteLoop: true,
					auto: true,
					minSlides: 1,
					maxSlides: 1,
					pager: true,
					pagerType:'short',
					adaptiveHeight:true,
					adaptiveHeightSpeed: 700
				});		
			});
			//pulls in ajax request from a json file to display a random question and the button can be clicked again to grab another question.
			$("#reload").click(function(){
				$.getJSON("questions.json", function(data) { 
				$.each(data, function() { 
					$.each(this, function(key, value) {
						var num= Math.round(Math.random()*11);
						while(key==num){
						$("#quiz").text("");
						$("#quiz").append(
							"<p>From the page: " + value.Section + "</p>" + 
							"<p>Question: " + value.Question + "</p>" + 
							"<p>For the answer, hover your mouse over the black bar to reveal:</p>"+
							"<p class='spoiler'>Answer: " + value.Answer + "</p>"
						);
						break;
						}
					});
				}); 
				});
			});
});