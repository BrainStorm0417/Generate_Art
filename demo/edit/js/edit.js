var ptsdef = "";
var currFile = "";

var demos = document.querySelectorAll(".demo");

for (var i=0; i<demos.length; i++) {
  var file = demos[i].getAttribute("data-src");
  demos[i].addEventListener("click", function() {
    var sel = this.getAttribute("data-src");
    if (sel.indexOf("https://") === 0) {
      window.open( sel, "pts_demo" );
    } else {
      window.location.href = window.location.origin+window.location.pathname+"?name="+sel;
    }
  }.bind( demos[i] ) );
}

document.getElementById('demo').onload = function(evt) {
  if (window.frames.length > 0) {
    loadEditor();
  }
}

document.getElementById("run").addEventListener("click", function(evt) {
  runCode();
});

document.getElementById("load").addEventListener("click", function(evt) {
  document.getElementById("loadmenu").className = "open";
});

document.getElementById("back").addEventListener("click", function(evt) {
  window.location.href = window.location.origin + "/demo/?name="+currFile;
});

document.getElementById("closemenu").addEventListener("click", function(evt) {
  document.getElementById("loadmenu").className = "";
});


document.getElementById("save").addEventListener("click", function(evt) {
  var html = '<html><head><script src="https://unpkg.com/pts/dist/pts.min.js"></script></head>'
  html += '<body style="font-family: sans-serif; margin: 0;"><div id="pt" style="width: 800px; height: 600px; margin: 30px auto 0;"></div>'
  html += '<div style="padding: 20px 0; font-family: sans-serif; font-size: 0.8em; color: #9ab; text-align: center;">Generated by <a href="https://ptsjs.org/demo/edit">Pts demo editor</a>. Learn more at <a href="https://ptsjs.org">https://ptsjs.org</a>.</div><script>';
  html += window.editor.getValue();
  html += '</script></body></html>';
  var blob = new Blob([ html ], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "pts_demo.html");
});

function _load( file, callback ) {
  var client = new XMLHttpRequest();
  client.open('GET', file);
  client.onload = callback;
  client.send();
}

function loadEditor() {
  _load( './js/autocomplete.d.ts', function(evt) {
    ptsdef = evt.target.responseText;
    vscode();
  });
}

function runCode() {
  if (window.frames.length > 0) {
    frames[0].update( editor.getValue() );
  }
}


function loadCode( editor ) {
  currFile = "";
  var qfile = qs("name", 30);
  if (qfile) {
    _load( '../'+qfile+'.js', function(evt) {
      if (evt.target.statusText == "OK" || evt.target.statusText.length === 0) {
        editor.setValue( evt.target.responseText );
        currFile = qfile;
        runCode();
      } else {
        editor.setValue( "// An error has occured while loading demo \n// File: "+qfile+" ("+ clean_str(evt.target.statusText, 20)+")" );
      }
    })
  }
}


function vscode() {
  require.config({ paths: { 'vs': './vs' }});
  require(['vs/editor/editor.main'], function() {
      
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({ noLib: true, allowNonTsExtensions: true });
      monaco.languages.typescript.javascriptDefaults.addExtraLib( ptsdef );
      
      window.editor = monaco.editor.create(document.getElementById('editor'), {
          value: "// Welcome to Pts demo editor!\n// Load a demo, or start coding from scratch.",
          language: 'javascript',
          theme: "vs",
          minimap: { enabled: false }
      });

      loadCode( window.editor );

      window.editor.addCommand([monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KEY_0], function() {
        runCode();
      });

      document.getElementById("loader").style.display = "none";

  });
}


function qs(name, limit) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  let q = (results === null) ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  return clean_str( q, limit );
}

function clean_str( str, limit ) {
  if (limit) str = str.substr(0, limit);
  return str.replace( /[^a-zA-Z0-9._]/g, "_" );
}