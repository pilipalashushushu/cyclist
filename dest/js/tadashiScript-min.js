function init(){switch(document.title){case"CYCLIST":console.log("首頁"),three("three"),bikeExpSetting(),requestAnimationFrame(bikeExp),document.getElementById("canvasSpeed").innerHTML=canvasRecord.SpeedRender(),document.getElementById("canvasToBuy").onclick=(()=>window.open("./CYProd.html","_self")),$(".prod").click(()=>{window.open("./CYProd.html","_self")}),prodFly();break;case"CY嚴選":store(),$(".prodTitle").click(function(){let e=$(this).text();$("#prodListTitle").html(`${e}<span>(50)</span>`)}),$(".prod-buy-directly").click(function(e){e.stopPropagation();let t=$(this).parent().parent().clone(),n=$(this).parent().parent().offset();$("body").append(t),t.offset(n),t.css({width:$(this).parent().parent().css("width")}),t.addClass("addToCart"),console.log($(window).width()),TweenMax.to(".addToCart",.5,{x:$(window).width()-$(t).offset().left-300,y:-$(t).offset().top+$(window).scrollTop()-130,scale:0,onComplete:()=>{$(".addToCart").remove()},ease:Power2.easeIn})});break;case"商品頁面":console.log("商品頁面"),store(),bikeExpSetting(),requestAnimationFrame(bikeExp);break;case"單車體驗":bikeExpSetting(),requestAnimationFrame(bikeExp),document.getElementById("canvasSpeed").innerHTML=canvasRecord.SpeedRender(),document.getElementById("canvasToBuy").onclick=(()=>window.open("./CYProd.html","_self"))}}function store(){console.log("store start"),filter(),mddlSld(),setBar(),openProdInfo()}function setBar(){$(".square").css("height",$(".square").css("width"))}function openProdInfo(){$(".prod").click(function(){window.open("./CYProd.html","_self")})}function prodFly(){$(".prod-buy-directly").click(function(e){e.stopPropagation();let t=$(this).parent().parent().clone(),n=$(this).parent().parent().offset();$("body").append(t),t.offset(n),t.css({width:$(this).parent().parent().css("width")}),t.addClass("addToCart"),console.log($(window).width()),TweenMax.to(".addToCart",.5,{x:$(window).width()-$(t).offset().left-300,y:-$(t).offset().top+$(window).scrollTop()-130,scale:0,onComplete:()=>{$(".addToCart").remove()},ease:Power2.easeIn})})}function mddlSld(){mddlSld.left?console.log(mddlSld.left):mddlSld.left=0,$("#tags").mouseover(e=>{$("body").addClass("stop-scroll"),$("#tags").mouseleave(()=>{$("body").removeClass("stop-scroll")}),$("#tags").mousewheel(e=>{console.log(e.deltaY);let t=parseInt($("#tags").css("width"));e.deltaY<0&&mddlSld.left<t?mddlSld.left+=2:mddlSld.left>0&&(mddlSld.left-=2),$("#tags").scrollLeft(mddlSld.left)})})}function filter(){let e=-parseFloat($("#fltr").css("width"));$("#fltr").css({right:e}),$(window).resize(()=>{e=-parseFloat($("#fltr").css("width")),$("#fltr").css({right:e})}),$("#fll-btn").click(()=>{0===parseInt($("#fltr").css("right"))?$("#fltr").css({right:e}):$("#fltr").css({right:0})}),$("#fltrClz").click(()=>{$("#fltr").css({right:e})})}function bikeExpSetting(){bikeExpSetting={isstart:0,round:0,part:0,xSpeed:0},word={isstartAdd:0,isstartBreak:0,time:0,delay:30},canvasRecord={Speed:10,SpeedRender:()=>canvasRecord.Speed,startTime:null,buildStart:()=>{canvasRecord.startTime||(canvasRecord.startTime=Date.now())},endTime:null,timeRender:()=>{canvasRecord.endTime=Date.now();let e=canvasRecord.endTime-canvasRecord.startTime,t=new Date(e),n=`${t.getMinutes()}:${t.getSeconds()}:${Math.floor(t.getMilliseconds()/10)}ms`;document.getElementById("canvasTime").innerHTML=n}},background=new Image,background.src="../images/canvas-bg.jpg",road=new Image,road.src="../images/canvas-road.jpg",bikeTire=new Image,bikeTire.src="../images/bike01-tire.png",bikeBody=new Image,bikeBody.src="../images/bike01-body.png"}function bikeExp(){canvasRecord.buildStart();let e=document.getElementById("canvas"),t=e.getContext("2d");function n(e,n){t.textBaseline="default",t.fillStyle="#fff",t.font="bold 50px Arial",t.fillText(`${e}`,n,300)}t.clearRect(0,0,e.width,e.height),bikeExpSetting.xSpeed%e.width==0&&0!==bikeExpSetting.isstart&&(bikeExpSetting.part++,console.log(`part: ${bikeExpSetting.part} | speed: ${bikeExpSetting.xSpeed}`)),0===bikeExpSetting.isstart&&(bikeExpSetting.isstart=1),bikeExpSetting.xSpeed%(9*e.width)==0&&(bikeExpSetting.part=0,bikeExpSetting.xSpeed=0,bikeExpSetting.round++),t.drawImage(background,bikeExpSetting.xSpeed,0,10*e.width,e.height),t.drawImage(road,bikeExpSetting.xSpeed+e.width*bikeExpSetting.part,e.height-150,e.width,150),t.drawImage(road,bikeExpSetting.xSpeed+e.width*(bikeExpSetting.part+1),e.height-150,e.width,150),t.save(),t.translate(e.width/2+65+75,380),t.rotate(-Math.PI*bikeExpSetting.xSpeed/180),t.drawImage(bikeTire,-75,-75,150,150),t.restore(),t.save(),t.translate(e.width/2-135,380),t.rotate(-Math.PI*bikeExpSetting.xSpeed/180),t.drawImage(bikeTire,-75,-75,150,150),t.restore(),t.save(),t.translate(e.width/2-150,220),t.drawImage(bikeBody,0,0,300,200),t.restore(),e.addEventListener("mousedown",function(e){e.preventDefault(),0===e.button?(document.getElementById("msl").style.backgroundColor="#aaa",word.isstartAdd=1):(document.getElementById("msr").style.backgroundColor="#aaa",word.isstartBreak=1)},!1),e.addEventListener("mouseup",function(e){e.preventDefault(),0===e.button?document.getElementById("msl").style.backgroundColor="#ccc":document.getElementById("msr").style.backgroundColor="#ccc"},!1),1===word.isstartAdd&&(word.time<word.delay?(n("加速",300),word.time++):(word.isstartAdd=0,word.time=0)),1===word.isstartBreak&&(word.time<word.delay?(n("減速",500),word.time++):(word.isstartBreak=0,word.time=0)),bikeExpSetting.xSpeed-=10,bikeExpSetting.xSpeed<9*-e.width&&(bikeExpSetting.xSpeed=9*-e.width),canvasRecord.timeRender(),requestAnimationFrame(bikeExp)}function three(e){let t=$(`#${e}`).parent().css("width"),n=$(`#${e}`).parent().css("height");$(e).attr("width",t),$(e).attr("height",n);var d=new THREE.Scene,a=new THREE.PerspectiveCamera(75,parseInt(t)/parseInt(n),.1,1e3);a.position.set(10,0,0);var o=new THREE.SpotLight(16777215,1);o.position.set(20,20,5),d.add(o);var i=(new THREE.MTLLoader).setPath("./model/"),r=(new THREE.OBJLoader).setPath("./model/");i.load("./11717_bicycle_v2_L1.mtl",e=>{e.preload(),console.log("pnginside"),r.setMaterials(e),r.load("./11717_bicycle_v2_L1.obj",function(e){e.position.set(0,-20,0),e.rotation.x=1.5*Math.PI,d.add(e),c()})}),(new THREE.TextureLoader).setPath("./images/").load("./becyclist.jpg",function(e){d.background=e});var s=new THREE.WebGLRenderer({alpha:!0});s.setSize(parseInt(t),parseInt(n)),s.setClearColor("#a3ddce"),document.getElementById("three").appendChild(s.domElement);var l=new THREE.OrbitControls(a,s.domElement);function c(){requestAnimationFrame(c),l.update(),s.render(d,a)}l.minDistance=50,l.maxDistance=90,l.autoRotate=!0,l.autoRotateSpeed=5}window.addEventListener("resize",function(){setBar()},!1),window.addEventListener("load",init,!1);