var domPacketSend = false;



function getRandomFloat(min, max) {
  
	return Math.random() * (max - min) + min;

}
//[Column(TypeName = "varchar")]
//[MaxLength]

var array = new Uint16Array(8);

//window.crypto.getRandomValues(array);
//!!! do somthing if  in sql db exists note with same rid(primary key)
var rid = createUUID()


function createUUID() {
 // http://www.ietf.org/rfc/rfc4122.txt
 var s = [];
 var hexDigits = "0123456789abcdefgh"; 
 for (var i = 0; i < 36; i++) {
 s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
 }
 s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
 s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
 s[8] = s[13] = s[18] = s[23] = "-";
 var uuid = s.join("");
 return uuid;
}



var dat = document.documentElement;
//if (dat && 19E4 < ("" + dat.innerHTML).length) 
	//return;
var counter = 1;
	
	var e1 = document.getElementsByTagName('*')

	for( var i=0; i < e1.length; i++ )
	{
		e1[i].setAttribute('nodeId', counter);
		e1[i].nodeId = counter
		
		counter++;
	}
	 


// set nodeId to all send elements
var countPacketsSend = 0



/*var e1 = document.getElementsByTagName('*')
var num = 1
for( var i=0; i < e1.length; i++ )
{
	e1[i].nodeId = num
	num++;
}*/







var waitForSendBusy = false;

function sendDataToServer(url, data) {

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
	xhr.onreadystatechange = function() {
		
		 if (this.readyState == 4 && this.status == 200) 
		 {   
			
			waitForSendBusy = false
			
		 }
		 
		 
			 
		 
	}
    
		
	xhr.onerror = function() {
		//alert("Error")
		console.log("Retrying...");
        //setTimeout(function(){sendDataToServer(url, data)}, 5000);
        
	}
	xhr.send(data);
	waitForSendBusy = true
	
}



var cnt = 0;
function sendInfo()
{
	if ( domPacketSend == false )
		return;
		
		cnt = 0;
		var sendMutationList = sendTurn.shift()
		
		//logToSend = log.splice(0, log.length);
		//var data = btoa((logToSend.join("|")).toString());
		//packetCounter++;
		// обернуть русский язык
		
		//!!!!!
		sendDataToServer('http://localhost:35002/api/log/stat?login=' + sitelogProject , 'num='+ countPacketsSend++ + '&rid=' + rid +'&stat=' + /*btoa(unescape(encodeURIComponent(JSON.stringify(*/sendMutationList/*))))*/ );
		//console.log(atob(data));
		//timer = false;
		
	
}


	

var startScriptTime = Date.now();







var tempMutationList = []
var lengthMutationListForSend = 4000 // 4000 symbols of message
var timeToSend = 20 // every 20 seconds send message

var sendTurn = []



var check = null;
function sendFromSendTurnLoopByTime() {
    if (check == null) {
        
		orderNumberMutation = 0;		
        check = setInterval(function () 
		{ 
			if ( cnt > 2000  )
			{
				sendInfo();
				
			}
			
			cnt += 1;
			
			
			//console.log('cnt  ' + cnt)
			 
		}, 1);
    }
}
//sendFromSendTurnLoopByTime()


function checkSendTurnLoop() 
{
	if (sendTurn.length > 0 && !waitForSendBusy)
	{
		sendInfo();
		
	}

	setTimeout(function(){checkSendTurnLoop()}, 500);

}
checkSendTurnLoop()


////////console
function getStringWithVariables( arguments)
{
	
	var ar = Array.prototype.slice.call(arguments);
	var rep= ar.slice(1, ar.length);
	var i=0;
	//!!!!!! try other %S %d %s %i
	var output = arguments[0].replace(/%s|%d|%f|%@/g, function(match,idx) {
		
		return( rep.slice(i, ++i) );
	})
	return output
	//alert( output );
}
// define a new console


var console=(function(oldCons){
    return {
        log: function(text){
            oldCons.log.apply(text, arguments);
			if(arguments.length> 1)
			{
				AddEventQueueAndSend({ eventType: 'console', eventMethod: 'log', eventText: getStringWithVariables(arguments), time:  Date.now() - startScriptTime });
				
			}
			else
				AddEventQueueAndSend({ eventType: 'console', eventMethod: 'log', eventText: text, time:  Date.now() - startScriptTime });
			
           
			
        },
        info: function (text) {
            oldCons.info.apply(text, arguments);
            if(arguments.length> 1)
			{
				AddEventQueueAndSend({ eventType: 'console', eventMethod: 'info', eventText: getStringWithVariables(arguments), time:  Date.now() - startScriptTime });
				
			}
			else
				AddEventQueueAndSend({ eventType: 'console', eventMethod: 'info', eventText: text, time:  Date.now() - startScriptTime });
        },
        warn: function (text) {
            oldCons.warn.apply(text, arguments);
            if(arguments.length> 1)
			{
				AddEventQueueAndSend({ eventType: 'console', eventMethod: 'warn', eventText: getStringWithVariables(arguments), time:  Date.now() - startScriptTime });
				
			}
			else
				AddEventQueueAndSend({ eventType: 'console', eventMethod: 'warn', eventText: text, time:  Date.now() - startScriptTime });
        },
        error: function (text) {
            oldCons.error.apply(text, arguments);
            if(arguments.length> 1)
			{
				AddEventQueueAndSend({ eventType: 'console', eventMethod: 'error', eventText: getStringWithVariables(arguments), time:  Date.now() - startScriptTime });
				
			}
			else
				AddEventQueueAndSend({ eventType: 'console', eventMethod: 'error', eventText: text, time:  Date.now() - startScriptTime });
        }
    };
}(window.console));

//Then redefine the old console
window.console = console;




window.onerror = function (msg, url, lineNo, columnNo, error) {
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1){
        alert('Script Error: See Browser Console for Detail');
    } else {
        var message = [
            'Message: ' + msg,
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error.stack)
        ].join(' - ');
		
		//alert(message);
        //AddEventQueueAndSend(message);
    }

    return false;
};

//////////////////////////////

///////////////////xhr packets/////////////////////

//Need to add response data and think about method to match request and response

var xhr = 0;
(function() {
		var origOpen = XMLHttpRequest.prototype.open;
		XMLHttpRequest.prototype.open = function() {
			this.xhr = xhr; xhr++;
			console.log( xhr )
			//register event request
			if(arguments.length == 5)
			{
				
				// i > 3  value = undefined
				var xhrPacket = {
					eventType: 'xhr',
					packet: 'request',
					id: xhr,
					method: arguments[0],
					url: arguments[1],
					async: arguments[2],
					time: Date.now() - startScriptTime
					
				}
				//AddEventQueueAndSend(xhrPacket)
			}
			
			
			//register event response
			this.addEventListener('load', function() {
				
				var xhrPacket = {
					eventType: 'xhr',
					packet: 'response',
					id: xhr,
					time: Date.now() - startScriptTime
					
				}
				//foreach()
				//AddEventQueueAndSend(xhrPacket)
				console.log(this.getAllResponseHeaders())
			});
			origOpen.apply(this, arguments);
			
				
		};	
})();

function returnHeaders(ajaxrequest) {
	var headers = ajaxrequest.getAllResponseHeaders();
	var arrofheaders = headers.trim().split(/[\r\n]+/);
	var mapofheaders = {};
	arrofheaders.forEach(function(line) {
		var parts = line.split(': ');
		var header = part.shift();
		var value = parts.join(': ');
		mapofheaders[header] =value;
	});
	return mapheaders;
}







 

///////////////////////////////////////////////////























//write events to massive of events
function AddEventQueueAndSend( eventNote )
{
	tempMutationList.push(eventNote)
	
	if( JSON.stringify(tempMutationList).length >= lengthMutationListForSend   )
	{
		/*if ( countPacketsSend == 1 )
			sendTurn.push(encodeURIComponent(JSON.stringify(tempMutationList).substring(1, JSON.stringify(tempMutationList).length-1)))
		else*/
			sendTurn.push( encodeURIComponent(JSON.stringify(tempMutationList).substring(1, JSON.stringify(tempMutationList).length-1)))
		tempMutationList = []
		
	}
}

//// mutations
var Mutation = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

var mutationObserver = new Mutation(function(mutations) {
	mutations.forEach(function(mutation) {
		
		//console.log(mutation )
		
		switch(mutation.type) 
		{
			
		//childList
		//attributes
		//characterData
   			
			/*
			get DIV  tag name of element
			while (el && el.parentNode) {
				el = el.parentNode;
				if (el.tagName && el.tagName.toLowerCase() == tagName) {
				  return el;
				}
			  }
			*/
			case "childList":
				
				
				    
                                if (mutation.removedNodes && mutation.removedNodes.length) 
								{    
                                    for (var f = 0; f < mutation.removedNodes.length; f++) 
									{
									
										var node = mutation.removedNodes[f];
										
										var result = {
											nodeId: node.nodeId,
											targetId : mutation.target.nodeId,
											//outerHTML : node.outerHTML,
											tagName : !!node.tagName ? node.tagName.toLowerCase() : null,
											eventType: "mutation",
											//src : node.src,
											attributes: {},
											childNodes: {},
											time:  Date.now() - startScriptTime,
											isRemoved: true
										}
										
										
										if ( !!node.attributes && node.attributes.length != 0)
										{
											for( var i = 0; i< node.attributes.length; i++ )
											{
												result.attributes[node.attributes[i].nodeName] = node.attributes[i].nodeValue 
											}
										}
										if ( !!node.childNodes && node.childNodes.length != 0)
										{
											for( var i = 0; i< node.childNodes.length; i++ )
											{
												result.childNodes[node.childNodes[i].nodeName] = node.childNodes[i].nodeValue 
											}
										}
									//	console.log(result)
									//	console.log(mutation)
										
                                        
                                    }
								}
							if (mutation.addedNodes && mutation.addedNodes.length) 
							{		
									
								/*	getChildlistChange = function(t) {
										var e = this.childListChangeMap.get(t);
										return e || (e = new r, this.childListChangeMap.set(t, e)), e
									}
									n = mutation
									var r, i, o = this.getChildlistChange(n.target),
										u = n.previousSibling;
										*/
                                    for (var f = 0; f < mutation.addedNodes.length; f++) {
										//childNodes    attributes   nodeName nodeValue
										//for (var c = 0, d = u.removedNodes.length; d > c; ++c) r = u.removedNodes[c], o.getChange(r).removedFromParent(u.target);
										//for (var h = 0, f = u.addedNodes.length; f > h; ++h) r = u.addedNodes[h], o.getChange(r).insertedIntoParent(u.target);
										
										var node = mutation.addedNodes[f];
										
										
										
										var result = {
											nodeId: 0,
											targetId : mutation.target.nodeId,
											
											//tagName : !!node.tagName ? node.tagName.toLowerCase() : null,
											//attributes: {},
											//childNodes: {},
											eventType: "mutation",
											type : "",
											// !!!!!!!!!!! not detect nodeId nextElementSibling when loading page because it is too quick
											nextSiblingId : node.nextElementSibling != null && node.nextElementSibling.nodeId != undefined  ? node.nextElementSibling.nodeId : 0,
											time:  Date.now() - startScriptTime,
											//nextSiblingId : 0, // разобраться про sibling и для чего previosSibling  nextSibling node or mutation
											isRemoved: false,
											data: {}
										}
										
										//console.log(result.nextSiblingId)
										
										
										/*if (node.nextSibling != null && !!node.nextSibling.nodeId)
										{
											console.log('in'+!!node.nextSibling.nodeId)
											nextSiblingId = node.nextSibling.nodeId
										}*/
										
										/*if ( !!node.attributes && node.attributes.length != 0)
										{
											for( var i = 0; i< node.attributes.length; i++ )
											{
												result.attributes[node.attributes[i].nodeName] = node.attributes[i].nodeValue 
											}
										}
										if ( !!node.childNodes && node.childNodes.length != 0)
										{
											for( var i = 0; i< node.childNodes.length; i++ )
											{
												result.childNodes[node.childNodes[i].nodeName] = node.childNodes[i].nodeValue 
											}
										}*/
										
										getDataByNodeType(node, result);
										
										
										
																				
										/*if (node.tagName === 'IMG'){
											
											console.log(node.src);
										}
										if (node.tagName === 'SCRIPT'){
											
											console.log(node.src);
										}*/
										
										
                                        
                                    }
							}
                                    break;
                      case "attributes":
							
									// removedAttributes??? why check
									
                                    
									var result = {
										nodeId: mutation.target.nodeId,
										eventType: "mutation",
										time:  Date.now() - startScriptTime,
										attributes: {}
										
									}
									if (mutation.target.attributes.length != 0)
									{
										for( var i = 0; i< mutation.target.attributes.length; i++ )
										{
											result.attributes[mutation.target.attributes[i].nodeName] = mutation.target.attributes[i].nodeValue 
									  	}
									}
									//console.log(result)
									
                                    break;
                     case "characterData":
									//console.log('characterData')
									//console.log(mutation)
									//check equal oldvalue  and new value/ return if equal  
									var result = {
										nodeId: mutation.target.nodeId,
										time:  Date.now() - startScriptTime,
										eventType: "mutation",
										textContent: mutation.target.textContent
										
									}
									
                                    
                                   var m = mutation.target.textContent;
								  
					break;


				
			
		}
		
			
		AddEventQueueAndSend(result)
	
  
  });
});

mutationObserver.observe(document, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});


/*



key: "addEvent",
                    value: function(e, t) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                            r = Date.now();
                        this._run(function(o) {
                            o.addEvent(e, t, u({}, n, {
                                timeOverride: r
                            }))
                        })

t.addEvent("lr.core.LogEvent", function() {
                                return {
                                    logLevel: e.toUpperCase(),
                                    args: r
                                }
                            }
							
							 function getDataByNodeType(e) 
 {
            
                var t = e.tagName && e.tagName.toLowerCase(),
                    r = void 0;
                e.classList && e.classList.contains("_lr-hide") ? r = "hide" : "input" === t && e.type && "password" === e.type.toLowerCase() && (r = "blocked");
                var n = !!r;
                switch (e.nodeType) 
				{
                    case e.DOCUMENT_TYPE_NODE:
                        return {
                            isTainted: n,
                            documentTypeInfo: {
                                name: e.name || "",
                                publicId: e.publicId || "",
                                systemId: e.systemId || ""
                            }
                        };
                    case e.COMMENT_NODE:
                        return {
                            isTainted: n,
                            commentInfo: {
                                textContent: n ? Array(e.textContent.length + 1).join("X") : e.textContent
                            }
                        };
                    case e.TEXT_NODE:
                        var i = e.parentNode && e.parentNode.tagName,
                            s = n ? o(e.textContent) : e.textContent;
                        return "SCRIPT" === i && (s = ""), {
                            isTainted: n,
                            textInfo: {
                                textContent: s,
                                isStyleNode: "STYLE" === i
                            }
                        };
                    case e.ELEMENT_NODE:
                        for (var a = {}, u = 0; e.attributes.length > u; u++) {
                            var l = e.attributes[u],
                                c = l.value;
                            a[l.name] = c
                        }
                        var f = e.value;
                        if ("input" !== t && "textarea" !== t || (f && (f = n ? o(f) : f), a.value && (a.value = n ? o(a.value) : a.value)), "input" === t || "select" === t) {
                            var d = e.getAttribute("type");
                            "radio" === d || "checkbox" === d ? a.defaultChecked = !!e.checked : a.defaultValue = f
                        }
                        if (n) {
                            var h = "_lr_block_" + r;
                            a.class = a.class ? a.class + " " + h : h
                        }
                        return {
                            isTainted: n,
                            elementInfo: {
                                tagName: t,
                                attributes: a,
                                childNodes: []
                            }
                        };
                    case e.DOCUMENT_NODE:
                        return {
                            isTainted: n,
                            documentInfo: {
                                childNodes: []
                            }
                        };
                    default:
                        throw console.error(e), (0, p.default)(!1, "Unknown node type: " + e.nodeType), Error()
                }
			
 }
 "info",{get:s.oneOfGetter(t=["documentTypeInfo","commentInfo","textInfo","elementInfo","documentInfo"])
*/
 function getDataByNodeType(e, result) 
 {
            
                var t = e.tagName && e.tagName.toLowerCase()
                
                switch (e.nodeType) 
				{
                    case e.DOCUMENT_TYPE_NODE:
                        
						e.nodeId = counter;	
						e.setAttribute('nodeId', counter);
						result.nodeId = counter
						counter++;
                        result.type = 'documentTypeNode'  
					 
                        result.data = {
                                name: e.name || "",
                                publicId: e.publicId || "",
                                systemId: e.systemId || ""
                            }
                        break;
                    case e.COMMENT_NODE:
                        
							e.nodeId = counter;
							
							result.nodeId = counter
							counter++;							
                            result.type = 'commentNode'    
							result.data =  {
                                textContent:  e.textContent
                            }
                        break;
                    case e.TEXT_NODE:
						e.nodeId = counter;
						
						result.nodeId = counter
						counter++;
                        var i = e.parentNode && e.parentNode.tagName,
                            s =  e.textContent;
                        
                            
                            result.type = 'textNode'    
							result.data =  {
                                textContent: s,
                                isStyleNode: "STYLE" === i
                            }
                        break;
                    case e.ELEMENT_NODE:
                        
						var attr = {}
						var ch = {}
										if ( !!e.attributes && e.attributes.length != 0)
										{
											for( var i = 0; i< e.attributes.length; i++ )
											{
												attr[e.attributes[i].nodeName] = e.attributes[i].nodeValue 
											}
										}
										if ( !!e.childNodes && e.childNodes.length != 0)
										{
											for( var i = 0; i< e.childNodes.length; i++ )
											{
												ch[e.childNodes[i].nodeName] = e.childNodes[i].nodeValue 
											}
										}
                                                
							e.nodeId = counter;
							e.setAttribute('nodeId', counter);
                            
							result.nodeId = counter
							counter++;
                            result.type = 'elementNode'    
							result.data = {
                                tagName: t,
                                attributes: attr,
                                childNodes: ch
                            }
							
							
							
                       break;
                    case e.DOCUMENT_NODE:
                        
                            
                            result.type = 'documentNode'    
							result.data = {
                                childNodes: []
                            }
                        break;
                    default:
                        throw console.error("    Unknown node type: " + e.nodeType)
                }
			
 }
 
 
 
 
 
 
 
 
 //////// mouse and keyboard
 function addEvent(elem, evType, fn) {
		if (elem.addEventListener) {
			elem.addEventListener(evType, fn, false);
		}
		/// для IE
		else if (elem.attachEvent) {
			elem.attachEvent('on' + evType, fn)
		}
		else {
			elem['on' + evType] = fn
		}
	}
 
 
 
 
 
 
 
 startControl()
 function startControl()
{
	
	//paramsSender();
	
	addEvent(document, 'mousemove',   mousemoveHandler);
	addEvent(document, 'wheel',       wheelHandler);
	
	addEvent(document, 'mousedown',   mousedownHandler);
	addEvent(document, 'mouseup',     mouseupHandler);
	addEvent(document, 'click',       clickHandler);
	addEvent(document, 'dblclick',    dblclickHandler);
	/*addEvent(window,   'scroll',      scrollHandler);
	addEvent(document, 'contextmenu', contextmenuHandler);
	addEvent(document, 'mouseenter',  mouseenterHandler);
	addEvent(document, 'mouseleave',  mouseleaveHandler);
	
	addEvent(document, 'keydown',     keydownHandler);
	addEvent(document, 'keypress',    keypressHandler);
	addEvent(document, 'keyup',       keyupHandler);
	
	addEvent(window,   'resize', 	  resizeHandler);
	addEvent(window,   'hashchange',  hashchangeHandler);
	
	addEvent(document, 'copy', 		  copyHandler);
	addEvent(document, 'cut', 		  cutHandler);
	addEvent(document, 'paste', 	  pasteHandler);
	
	addEvent(window,   'blur', 		  blurwHandler);
	addEvent(document, 'blur', 		  blurdHandler);
	addEvent(window,   'focus', 	  focusHandler);
	addEvent(document, 'focusin', 	  focusinHandler);
	addEvent(document, 'focusout', 	  focusoutHandler);
	addEvent(document, 'beforeunload',beforeunloadHandler);
	addEvent(document, 'unload', 	  unloadHandler);
	*/
}

function endControl()
{
	removeEvent(document, 'mousemove', 	 mousemoveHandler);
	removeEvent(document, 'wheel', 		 wheelHandler);
	
	removeEvent(document, 'mousedown', 	 mousedownHandler);
	removeEvent(document, 'mouseup', 	 mouseupHandler);
	removeEvent(document, 'click', 		 clickHandler);
	removeEvent(document, 'dblclick', 	 dblclickHandler);
	/*removeEvent(window,   'scroll', 	 scrollHandler);
	removeEvent(document, 'contextmenu', contextmenuHandler);
	removeEvent(document, 'mouseenter',  mouseenterHandler);
	removeEvent(document, 'mouseleave',  mouseleaveHandler);
	
	removeEvent(document, 'keydown',     keydownHandler);
	removeEvent(document, 'keypress',    keypressHandler);
	removeEvent(document, 'keyup', 		 keyupHandler);
	
	removeEvent(window,   'resize',		 resizeHandler);
	removeEvent(window,   'hashchange',  hashchangeHandler);
	
	removeEvent(document, 'copy', 		 copyHandler);
	removeEvent(document, 'cut', 		 cutHandler);
	removeEvent(document, 'paste', 		 pasteHandler);

	removeEvent(window,   'blur', 		 blurHandler);
	removeEvent(document, 'blur', 		 blurHandler);
	removeEvent(window,   'focus', 		 focusHandler);
	removeEvent(document, 'focusin', 	 focusinHandler);
	removeEvent(document, 'focusout', 	 focusoutHandler);
	removeEvent(document, 'beforeunload', unloadHandler);
	removeEvent(document, 'unload', 	 unloadHandler);
*/	
}
 
 
 
 //log every sixth point coordinates
var coordinateMoveCount = 0;

function mousemoveHandler(event)
{
	/*if ( coordinateMoveCount != 6 )
	{	
		coordinateMoveCount++
		return
	}
	coordinateMoveCount = 0;*/

	//if (waitCounter > waitN)
	//	startNewSession();
	
	if (event.pageX < 0 || event.pageY < 0)
	{
		//console.log("coordinates < 0");
		return;
	}
	
	
	var eventNote = {
		eventType: 'mouse',
		type: 'mousemove',
		time:  Date.now() - startScriptTime,
		moves : []
		}
	
	eventNote.moves.push( { 
						pageX: event.pageX,  
						pageY: event.pageY, 
						nodeId: event.target.nodeId
						
					   }  )		
	
	
	AddEventQueueAndSend(eventNote)
	
		
}
function clickHandler(event)
{
	//if (waitCounter > waitN)
	//	startNewSession();
	
	if (event.pageX < 0 || event.pageY < 0)
	{
		//console.log("coordinates < 0");
		return;
	}
	
	
	var eventNote = {
		eventType: 'mouse',
		type: 'click',
		time:  Date.now() - startScriptTime,
		moves : []
		}
	
	eventNote.moves.push( { 
						pageX: event.pageX,  
						pageY: event.pageY, 
						nodeId: event.target.nodeId
					   }  )		
	
	
	AddEventQueueAndSend(eventNote)
	
		
}

///??? check
function dblclickHandler(event)
{
	//if (waitCounter > waitN)
	//	startNewSession();
	
	if (event.pageX < 0 || event.pageY < 0)
	{
		//console.log("coordinates < 0");
		return;
	}
	
	
	var eventNote = {
		eventType: 'mouse',
		type: 'dblclick',
		time:  Date.now() - startScriptTime,
		moves : []
		}
	
	eventNote.moves.push( { 
						pageX: event.pageX,  
						pageY: event.pageY, 
						nodeId: event.target.nodeId
					   }  )		
	
	
	AddEventQueueAndSend(eventNote)
	
		
}	
function wheelHandler(event)
{
	//if (waitCounter > waitN)
	//	startNewSession();
	
	var eventNote = {
		eventType: 'mouse',
		type: 'wheel',
		time:  Date.now() - startScriptTime,
		moves : []
		}
	
	eventNote.moves.push( { 
						deltaX: event.deltaX,  
						deltaY: event.deltaY,
						deltaZ: event.deltaZ, 
						deltaMode: event.deltaMode
					   }  )		
	
	
	AddEventQueueAndSend(eventNote)
	
}

function mouseupHandler(event)
{
	//if (waitCounter > waitN)
	//	startNewSession();
	
	var eventNote = {
		eventType: 'mouse',
		type: 'mouseup',
		time:  Date.now() - startScriptTime,
		moves : []
		}
	
	eventNote.moves.push( { 
						pageX: event.pageX,  
						pageY: event.pageY,
						nodeId: event.target.nodeId,
						selectText: getSelectionText()
					   }  )		
	
	AddEventQueueAndSend(eventNote)
	
	//console.log(getSelectionText())
}
function getSelectionText() 
{
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function mousedownHandler(event)
{
	//if (waitCounter > waitN)
	//	startNewSession();
	
	var eventNote = {
		eventType: 'mouse',
		time:  Date.now() - startScriptTime,
		moves : []
		}
	
	eventNote.moves.push( { 
						pageX: event.pageX,  
						pageY: event.pageY,
						nodeId: event.target.nodeId
					   }  )		
	
	AddEventQueueAndSend(eventNote)
 
}


function selectTextBetweenTwoElements(element1, element2) 
{
    var selection = window.getSelection();
    selection.removeAllRanges();
    var range = document.createRange();
    range.setStart(element1, 0);
    range.setEnd(element2, 1);
    selection.addRange(range);
}

// разобраться scroll
//window.pageYOffset
//window.scrollTo(40, 650);