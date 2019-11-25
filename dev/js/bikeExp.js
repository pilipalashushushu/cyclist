function init(){
    //setting initialize
    bikeBasicSetting();
    //append
    bikeExpAppend();
    //behavior
    originImgUpdate();
    //callback 30~40 rounds = 1 second
    requestAnimationFrame( bikeExp );
    //ifresize
    document.getElementById('canvasToBuy').onclick = () => window.open('./CYProd.html', '_self');
}

function bikeBasicSetting(){
    canvasSetting = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    //global
    bikeExpSetting = {
        isstart: 0, //是否開始
        round: 0, //重複幾次
        part: 0, //移動幾個畫面
        xSpeed: 0 //x軸位移
    };
    // word = {
    //     isstartAdd: 0, //是否加速
    //     isstartBreak: 0, //是否減速
    //     time: 0, //經過時間
    //     delay: 30, //文字存在時間
    //     mouseX: null,
    //     mouseY: null
    // };
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
    };
    //load img
    background = new Image();
    background.src = './images/canvas-bg.jpg';
    road = new Image();
    road.src = './images/canvas-road.jpg';
    bikeTire = new Image();
    bikeTire.src= './images/bike01-tire.png';
    bikeBody = new Image();
    bikeBody.src= './images/bike01-body.png';
}

function bikeExpAppend(){
    // $('#canvas').attr({
    //     width: canvasSetting.width,
    //     height: canvasSetting.height,
    // });

    let bikeModule = `
    <section class="bikeexp center">
        <canvas id="drawHere" width="${canvasSetting.width}" height="${canvasSetting.height}" oncontextmenu="return false"></canvas>
        <div class="status">
            <div class="intro">
                <div class="intro-name">公路車
                    <span class="intro-style">CTX600</span>
                </div>
                <div class="intro-text">公路車適合追求速度的您</div>
                <div class="intro-adv">優勢: 速度+20%</div>
                <div class="intro-buy" id="canvasToBuy">立即選購</div>
            </div>
            <div class="chart">
                <h3>速度</h3>
                <h3>避震</h3>
            </div>
            <div class="speed">
                <h5><span id="canvasSpeed">18</span>km/h</h5>
                <h6 id="canvasTime">00:17:25ms</h6>
            </div>
        </div>
        <div class="btns">
            <div class="eviBtns">
                <div class="Btn"><div class="eviSkew"><h6>公路車</h6></div></div>
                <div class="Btn"><div class="eviSkew"><h6>登山車</h6></div></div>
                <div class="Btn"><div class="eviSkew"><h6>城市車</h6></div></div>
            </div>
            <div class="msBtns">
                <div class="add" id="add">加速</div>
                <div class="ms">
                    <div class="msl" id="msl"></div>
                    <div class="mss"></div>
                    <div class="msr" id="msr"></div>
                </div>
                <div class="break" id="break">剎車</div>
            </div>
            <div class="ctgBtns">
                <div class="Btn"><div class="eviSkew"><h6>公路</h6></div></div>
                <div class="Btn"><div class="eviSkew"><h6>山地</h6></div></div>
                <div class="Btn"><div class="eviSkew"><h6>城市</h6></div></div>
            </div>
        </div>
    </section>`;

    $('#cycling').append(bikeModule);
}

function bikeExp(){
    //timeRecord
    canvasRecord.buildStart();

    // resize
    $(window).resize(function(){
        canvasSetting.width = window.innerWidth;
        canvasSetting.height = window.innerHeight;
        $('#canvas').attr({
            width: canvasSetting.width,
            height: canvasSetting.height,
        });
    });

    //declare
    let canvas = document.getElementById('drawHere');
    let context = canvas.getContext('2d');
    wordArr = []; //若有文字產生將塞在這裡

    //set canvas width & height
    let canvasWidth = canvasSetting.width;
    let canvasHeight = canvasSetting.height;


    //reset canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

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
    let roadHeight = 200;
    context.drawImage(road, bikeExpSetting.xSpeed + canvasWidth * bikeExpSetting.part, canvasHeight - roadHeight, canvasWidth, roadHeight);
    context.drawImage(road, bikeExpSetting.xSpeed + canvasWidth * (bikeExpSetting.part+1), canvasHeight - roadHeight, canvasWidth, roadHeight);        

    //draw bycicle
    context.save();
    context.translate(0, canvasHeight);
    context.translate(canvasWidth/2 + 65 + 75, -180);
    context.rotate(-Math.PI * (bikeExpSetting.xSpeed)/ 180);
    context.drawImage(bikeTire, -75, -75, 150, 150);
    context.restore();
    context.save();
    context.translate(0, canvasHeight);
    context.translate(canvasWidth/2 - 135, -180);
    context.rotate(-Math.PI * (bikeExpSetting.xSpeed)/ 180);
    context.drawImage(bikeTire, -75, -75, 150, 150);
    context.restore();
    context.save();
    context.translate(0, canvasHeight);
    context.translate(canvasWidth/2 - 150, -340);
    context.drawImage(bikeBody, 0, 0, 300, 200);
    context.restore();

    //feedback
    $('#canvas').click(function(e){
        if(wordArr.length < 3){
            // wordArr.push( new wordAdd('加速', e.pageX, e.pageY - $('#canvas').offset().top) );
            // wordArr.push(1);
            // context.fillRect(0, 0, 100, 100);
            // console.log(wordArr);
        }
    });

    canvas.addEventListener('mousedown', function(e){
        e.preventDefault();        
        if(e.button === 0){
            $('#msl').css('backgroundColor', "#aaa");
        }else{
            $('#msr').css('backgroundColor', "#aaa");
            word.isstartBreak = 1;
        }
    }, false);

    canvas.addEventListener('mouseup', function(e){
        e.preventDefault();        
        if(e.button === 0){
            $('#msl').css('backgroundColor', "#ccc");
        }else{
            $('#msr').css('backgroundColor', "#ccc");
        }
    }, false);

    //wordArr有東西就會印
    // if(wordArr.length > 0){
    //     console.log(`wordArr has something`);
    //     wordArr.map(item => {
    //         if(item.time < item.delay){
    //             context.textBaseline = 'default';
    //             context.fillStyle = "#fff";
    //             context.font = "bold 100px Arial";
    //             context.fillText(item.text, item.mouseX, item.mouseY);
    //             item.time++;
    //         }else{
    //             wordArr.unshift();
    //         }
    //     });
    // }

    if(wordArr.length > 0){
        console.log(`wordArr has something`);
        context.textBaseline = 'default';
        context.fillStyle = "#fff";
        context.font = "bold 100px Arial";
        context.fillText(wordArr[0].text, wordArr[0].mouseX, wordArr[0].mouseY);
    }

    //variable count
    bikeExpSetting.xSpeed -= 1;
    if(bikeExpSetting.xSpeed < -canvas.width*9){
        bikeExpSetting.xSpeed = -canvas.width*9;
    }

    //timeRecordRender
    canvasRecord.timeRender();

    requestAnimationFrame( bikeExp );

    //closure
    // function wordAdd(text, x, y){
    //     context.textBaseline = 'default';
    //     context.fillStyle = "#fff";
    //     context.font = "bold 50px Arial";
    //     context.fillText(`${text}`,x, y);
    //     console.log('textin');
    // }
}

function originImgUpdate(){
    $('.Btn').click(function(){
        console.log('click');
        $('.Btn div').css({
            backgroundColor: '#1e3449',
        });
        $(this).find('div').css({
            backgroundColor: '#919cb0',
        });
        switch($(this).find('h6').text()){
            case "公路車":
                bikeBody.src = './images/bike01-body.png';
                bikeTire.src = './images/bike01-tire.png';
                break;
            case "登山車":
                bikeBody.src = './images/canvas-bg.jpg';
                bikeTire.src = './images/canvas-bg.jpg';
                break;
            case "城市車":
                bikeBody.src = './images/canvas-bg.jpg';
                bikeTire.src = './images/canvas-bg.jpg';
                break;
            case "公路":
                background.src = './images/canvas-bg.jpg';
                break;
            case "山地":
                background.src = './images/canvas-bg.jpg';
                break;
            case "城市":
                background.src = './images/canvas-bg.jpg';
                break;
        }
    });
}

window.addEventListener('load', init, false);