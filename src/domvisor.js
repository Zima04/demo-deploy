

var timeStart = (new Date).getTime();

sendDataToServerDom('http://localhost:35002/api/log/data?login=' + sitelogProject , 'num='+ countPacketsSend++ + '&time=' + timeStart + '&rid=' + rid + '&ua='+ navigator.userAgent + '&site=' + btoa(unescape(encodeURIComponent(document.location.href)))  + '&content='+ btoa(unescape(encodeURIComponent(document.documentElement.outerHTML)))  )


function sendDataToServerDom(url, data) {

	var XHR = window.XDomainRequest || window.XMLHttpRequest;
	var xhr = new XHR();
		
    //xhr.open('GET', url, true);
	xhr.open('POST', url, true);
	//xhr.contentType = "application/x-www-form-urlencoded";
	try
	{
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}catch (ex)
	{	}
	xhr.onload = function () {
      if (this.readyState == 4 && this.status == 200 ) 
	  {
        console.log(this.status);
		domPacketSend = true;
		sendInfo();
      } 
	  
    };

    //xhr.onload = function() {
	//	frame_loaded();
	//}
		
	xhr.onerror = function() {
		//alert("Error")
		console.log("Retrying...");
        //setTimeout(function(){sendDataToServerDom(url, data)}, 5000);
	}
	xhr.send(data);
}