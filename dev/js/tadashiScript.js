function init(){
    switch(document.title){
        case "CYCLIST":
            console.log('首頁');
            three("three");
            bikeExpSetting();
            requestAnimationFrame( bikeExp );
            //wite data to html
            document.getElementById('canvasSpeed').innerHTML = canvasRecord.SpeedRender();
            //submit
            document.getElementById('canvasToBuy').onclick = () => window.open('./CYProd.html', '_self');
            break;
        case "CY嚴選":
            store();
            //write data to html
            $('.prodTitle').click(function(){
                let word = $(this).text();
                let amount = 50;
                $('#prodListTitle').html(`${word}<span>(${amount})</span>`);
            });
            $('.prod-buy-directly').click(function(e){
                e.stopPropagation();
                let tmp = $(this).parent().parent().clone();
                let axis = $(this).parent().parent().offset();
                $('body').append(tmp);
                tmp.offset(axis);
                tmp.css({
                    width: $(this).parent().parent().css('width')
                });
                tmp.addClass('addToCart');
                console.log($(window).width());
                TweenMax.to('.addToCart', .5, {
                    x: $(window).width()-$(tmp).offset().left-300,
                    y: -$(tmp).offset().top + $(window).scrollTop() - 130,
                    scale: 0,
                    onComplete: ()=>{
                        $('.addToCart').remove();
                    },
                    ease: Power2.easeIn
                });
            });
            break;
        case "商品頁面":
            console.log('商品頁面');
            store();
            bikeExpSetting();
            requestAnimationFrame( bikeExp );
            break;
        case "單車體驗":
            bikeExpSetting();
            //callback 30~40 rounds = 1 second
            requestAnimationFrame( bikeExp );
            //wite data to html
            document.getElementById('canvasSpeed').innerHTML = canvasRecord.SpeedRender();
            //submit
            document.getElementById('canvasToBuy').onclick = () => window.open('./CYProd.html', '_self');
            break;
        default:
            break;
    };
}

function store(){
    console.log('store start');
    filter();
    mddlSld();
    setBar();
    openProdInfo();
}

//Resize
window.addEventListener('resize', function(){
    setBar();
}, false);

//search bar color height
function setBar(){
    $('.square').css('height', $('.square').css('width'));
}

//open prod info
function openProdInfo(){
    $('.prod').click(function(){
        window.open('./CYProd.html', '_self');
    });
}

    function mddlSld(){
        if(!mddlSld.left){
            mddlSld.left = 0;
        }else{
            console.log(mddlSld.left);
        }
        $('#tags').mouseover((e)=>{
            // console.log(e.pageY);
            $('body').addClass('stop-scroll');
            $('#tags').mouseleave(()=>{
                $('body').removeClass('stop-scroll');
            });
            $('#tags').mousewheel((e)=>{
                console.log(e.deltaY);
                let tarWidth = parseInt($('#tags').css('width'));
                if(e.deltaY < 0 && mddlSld.left < tarWidth){
                    mddlSld.left += 2;
                }else if(mddlSld.left > 0){
                    mddlSld.left -= 2;
                }
                $('#tags').scrollLeft(mddlSld.left);
            });
        });
    }

    function filter() {
        let fltrWdth = -parseFloat($('#fltr').css('width'));
        $('#fltr').css({
            right: fltrWdth
        });
        $(window).resize(() => {
            fltrWdth = -parseFloat($('#fltr').css('width'));
            $('#fltr').css({
                right: fltrWdth
            });
        });
        $('#fll-btn').click(() => {
           if( parseInt($('#fltr').css('right')) === 0){
                $('#fltr').css({ right: fltrWdth });
           }else{
                $('#fltr').css({ right: 0 });
            }
        });
        $('#fltrClz').click(()=>{
            $('#fltr').css({ right: fltrWdth });
        })
    }

//canvas setting
function bikeExpSetting(){
    //global
    bikeExpSetting = {
        isstart: 0, //是否開始
        round: 0, //重複幾次
        part: 0, //移動幾個畫面
        xSpeed: 0 //x軸位移
    }
    word = {
        isstartAdd: 0, //是否加速
        isstartBreak: 0, //是否減速
        time: 0, //經過時間
        delay: 30 //文字存在時間
    }
    canvasRecord = {
        Speed: 10, //讀取速度
        SpeedRender: () => canvasRecord.Speed, //速度render
        startTime: null, //開始時間
        buildStart: ()=>{ //建立開始時間
            if(!canvasRecord.startTime) canvasRecord.startTime = Date.now();
        },
        endTime: null, //結束時間
        timeRender: ()=>{ //時間render
            canvasRecord.endTime = Date.now();
            let diff = canvasRecord.endTime - canvasRecord.startTime;
            let timeTrans = new Date(diff);
            let final = `${timeTrans.getMinutes()}:${timeTrans.getSeconds()}:${Math.floor(timeTrans.getMilliseconds()/10)}ms`;
                        document.getElementById('canvasTime').innerHTML = final;
            }
    }
    //load img
    background = new Image();
    background.src = '../images/canvas-bg.jpg';
    road = new Image();
    road.src = '../images/canvas-road.jpg';
    bikeTire = new Image();
    bikeTire.src= '../images/bike01-tire.png';
    bikeBody = new Image();
    bikeBody.src= '../images/bike01-body.png';
}

// canvas
function bikeExp(){

    //timeRecord
    canvasRecord.buildStart();

    //declare
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    //reset canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    //repeat condition
    if(bikeExpSetting.xSpeed % canvas.width === 0 && bikeExpSetting.isstart !== 0){
        bikeExpSetting.part++;
        console.log(`part: ${bikeExpSetting.part} | speed: ${bikeExpSetting.xSpeed}`);
    }
    if(bikeExpSetting.isstart === 0){
        bikeExpSetting.isstart = 1;
    }
    if(bikeExpSetting.xSpeed % (canvas.width * 9) === 0){
        bikeExpSetting.part = 0;
        bikeExpSetting.xSpeed = 0;
        bikeExpSetting.round++;
    }

    //draw background
    context.drawImage(background, bikeExpSetting.xSpeed, 0, canvas.width*10, canvas.height);
    context.drawImage(road, bikeExpSetting.xSpeed + canvas.width * bikeExpSetting.part, canvas.height-150, canvas.width, 150);
    context.drawImage(road, bikeExpSetting.xSpeed + canvas.width * (bikeExpSetting.part+1), canvas.height-150, canvas.width, 150);        

    //draw bycicle
    context.save();
    context.translate(canvas.width/2 + 65 + 75, 380);
    context.rotate(-Math.PI * (bikeExpSetting.xSpeed)/ 180);
    context.drawImage(bikeTire, -75, -75, 150, 150);
    context.restore();
    context.save();
    context.translate(canvas.width/2 - 135, 380);
    context.rotate(-Math.PI * (bikeExpSetting.xSpeed)/ 180);
    context.drawImage(bikeTire, -75, -75, 150, 150);
    context.restore();
    context.save();
    context.translate(canvas.width/2 - 150, 220);
    context.drawImage(bikeBody, 0, 0, 300, 200);
    context.restore();

    //feedback
    canvas.addEventListener('mousedown', function(e){
        e.preventDefault();        
        if(e.button === 0){
            document.getElementById('msl').style.backgroundColor = "#aaa";
            word.isstartAdd = 1;
        }else{
            document.getElementById('msr').style.backgroundColor = "#aaa";
            word.isstartBreak = 1;
        }
    }, false);

    canvas.addEventListener('mouseup', function(e){
        e.preventDefault();        
        if(e.button === 0){
            document.getElementById('msl').style.backgroundColor = "#ccc";
        }else{
            document.getElementById('msr').style.backgroundColor = "#ccc";
        }
    }, false);

    if(word.isstartAdd === 1){
        if(word.time < word.delay){
            wordAdd("加速", 300);
            word.time++;
        }else{
            word.isstartAdd = 0;
            word.time = 0;
        }
    }

    if(word.isstartBreak === 1){
        if(word.time < word.delay){
            wordAdd("減速", 500);
            word.time++;
        }else{
            word.isstartBreak = 0;
            word.time = 0;
        }
    }

    //variable count
    bikeExpSetting.xSpeed -= 10;
    if(bikeExpSetting.xSpeed < -canvas.width*9){
        bikeExpSetting.xSpeed = -canvas.width*9;
    }

    //timeRecordRender
    canvasRecord.timeRender();

    requestAnimationFrame( bikeExp );

    //closure
    function wordAdd(text, x){
        context.textBaseline = 'default';
        context.fillStyle = "#fff";
        context.font = "bold 50px Arial";
        context.fillText(`${text}`, x, 300);
    }
}

//3D Model
function three(Id){
    //setting
    let width = $(`#${Id}`).parent().css("width");
    let height = $(`#${Id}`).parent().css("height");
    $(Id).attr("width", width);
    $(Id).attr("height", height);
    //scene&camera
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, parseInt(width)/parseInt(height), 0.1, 1000);
    camera.position.set(10, 0, 0);

    //Light
    var spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(20, 20, 5);
    scene.add(spotLight);        

    //3D Model
    var mtlLoader = new THREE.MTLLoader().setPath('./model/');
    var objLoader = new THREE.OBJLoader().setPath('./model/');
    mtlLoader.load('./11717_bicycle_v2_L1.mtl', (materials)=>{
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load('./11717_bicycle_v2_L1.obj',function(obj){
            obj.position.set(0, -20, 0);
            obj.rotation.x = Math.PI * 1.5;
            scene.add(obj);
            animate();
        })
    });

    //background
    var textureLoader = new THREE.TextureLoader().setPath('./images/');
    textureLoader.load('./evi1.jpg', function(texture){
        scene.background = texture;
    });

    //render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(parseInt(width), parseInt(height));
    renderer.setClearColor(0xaaaaaa);
    document.getElementById('three').appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 50;
    controls.maxDistance = 90;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5.0;

    function animate(){
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
}

window.addEventListener('load', init, false);