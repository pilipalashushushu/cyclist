function init(){ajax()}function ajax(){let t=new XMLHttpRequest;t.onload=function(){200==t.status?alert(t.response):alert(t.status)},t.open("get","./php/CYShop.php",!0),t.send(null)}window.addEventListener("load",init,!1);