chrome.contextMenus.create({
  title:"Edit using sympathy",
  contexts:["link"],
  onclick:function(info,tab){
	var link = document.createElement('a');
    link.href=info.linkUrl;
    var filename = link.pathname;
    var myid = chrome.i18n.getMessage("@@extension_id");
    window.open(chrome.extension.getURL("main.html")+'#'+filename);
  }
})