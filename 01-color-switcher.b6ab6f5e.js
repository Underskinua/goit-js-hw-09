!function(){var t=document.querySelector("body"),e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),a=null;function d(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}e.addEventListener("click",(function(){a||(a=setInterval(d,1e3),e.disabled=!0,n.disabled=!1)})),n.addEventListener("click",(function(){clearInterval(a),a=null,e.disabled=!1,n.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.b6ab6f5e.js.map
