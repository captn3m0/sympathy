extensions={
  js: 'javascript',
  css: 'css',
  c: 'clike',
  java:'clike',
  cs:'clike',
  h:'clike',
  'txt':'markdown',
  cpp: {
    name:'clike',
    useCPP:true
  },
  mkd: 'markdown',
  md: 'markdown',
  php: 'php',
  py: 'python',
  rb: 'ruby',
  sh: 'shell',
  bashrc:'shell',
  xml: 'xml',
  less: 'less',
  sql: 'mysql',
  json: {
    name:'javascript',
    json:true
  },
  yaml: 'yaml',
  r: 'r'
};
var path =  document.location.pathname.split('/')
var lastBit = path[path.length-1]
var pieces = lastBit.split(".");
var extension = pieces[pieces.length-1];
if(extensions.hasOwnProperty(extension)){
  var file = lastBit.split('.');
  document.location.href = chrome.extension.getURL('main.html'+'#'+location.pathname);
}
else if(lastBit == ''){
  console.log('we are in a folder');
  //we are in a folder
  Array.prototype.slice.call(document.querySelectorAll('.file'),0).map(function(el){
    var pieces = el.innerText.split('.');
    var ext = pieces[pieces.length-1];
    if(extensions.hasOwnProperty(ext)){
      console.log("yes");
      el.addEventListener('click',function(el){
        console.log(el.target.pathname);
        document.location.href=chrome.extension.getURL('main.html'+'#'+this.pathname);
        el.preventDefault();
        return false;
      });
    }
  });
}