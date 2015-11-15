// noprotect
var CSSCriticalPath = function(w, d) {
  var css = {};
  var pushCSS = function(r) {
    // The last selector wins, so over-write
    // merging existing css will happen here...
    css[r.selectorText] = r.cssText; 
  };
  
  var parseTree = function() { 
    // Get a list of all the elements in the view.
    var height = w.innerHeight;
    var walker = d.createTreeWalker(d.body, NodeFilter.SHOW_ELEMENT, function(node) { return NodeFilter.FILTER_ACCEPT; }, true);

    while(walker.nextNode()) {
      var node = walker.currentNode;
      var rect = node.getBoundingClientRect();
      if(rect.top < height) {
        // element is in the first scroll of the screen
        var rules = w.getMatchedCSSRules(node);
        if(!!rules) {
          for(var r = 0; r < rules.length; r++) {
            pushCSS(rules[r]); 
          }
        }
      } 
    }
  };
 
  this.generateCSS = function() {
    var finalCSS = "";
    for(var k in css) {
      finalCSS += css[k] + "\n";
    }
    
    return finalCSS;
  };
  
  parseTree();
  
};
 
window.onload = function() {
  var cp = new CSSCriticalPath(window, document);
  var css = cp.generateCSS();
  
  output.innerText = css;
 
};
var cp = new CSSCriticalPath(window, document);
  var css = cp.generateCSS();
   //output.innerText = css;
  console.log(css);