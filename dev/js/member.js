
//頁籤&月曆
$(function() {
  var $tabPanel = $("#tab-panel"),
    $tabs = $tabPanel.find(".tabs"),
    $tab = $tabs.find("a"),
    $tabContent = $tabPanel.find(".tab-content"),
    $content = $tabContent.find("> li");

  $tab.eq(0).addClass("active");
  $content.eq(0).show();
  let isCalendarInit = false;
  
  let calendarInit = function(params) {
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: ["dayGrid",'interaction' ],
      events: 
        [{
            url: './act.php',
            method: 'POST',
            rrule: { }
        }]

    });
    calendar.render();

    isCalendarInit = true;
  };
  
  $tab.on("click", function(ev) {
    let targetClass = ev.target.className;
    var $tabIndex = $(this).index();

    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");

    $content.each(function(id, item) {
      console.log(item);
      if (item.className == targetClass) {
        $(item).show(function (params) {
          setTimeout(() => {
            if (isCalendarInit) return;
            calendarInit();
          }, 100);
        });
      } else {
        $(item).hide();
      }
    });
  });
});

 //會員資料撈取
$(document).ready(function(){     
    $.ajax({
    type:"post",  
    url: "memdata.php",
    dataType: "json",
    success: function(data){                        
    let apiData = '<table class="baic_txt">';
        for(let i=0; i<data.length; i++){
        apiData +=
        `<tr>
            <td>
              <p class="p_title">暱  稱</p>
            </td>                            
            <td>
            <input  id="re-memNickName" class="memsand" type="text" value="${data[i].memNickName}">
            </td></tr>
        <tr>
            <td>
              <p class="p_title">帳  號</p>
            </td>
            <td>
            <input id="re-memId" class="memsand" type="text" value="${data[i].memId}">    
            </td>
        </tr>
        <tr>
            <td>
              <p class="p_title">密  碼</p>
            </td>
            <td>
            <input id="re-memPsw" class="memsand" type="text" value="${data[i].memPsw}">    
            </td>
        </tr>
        <tr>
            <td>
              <p class="p_title">信  箱</p>
            </td>
            <td>
            <input id="re-memEmail" class="memsand" type="text" value="${data[i].memEmail}">    
            </td>
        </tr>
        <tr>
            <td>
              <p class="p_title">姓  名</p>
            </td>
            <td>
            <input id="re-memName" class="memsand" type="text" value="${data[i].memName}">    
            </td>
        </tr>
        <tr>
            <td>
              <p class="p_title">電  話</p>
            </td>
            <td>
            <input id="re-tel" class="memsand" type="text" value="${data[i].tel}">    
            </td>
        </tr>
        <tr>
            <td>
              <p class="p_title">地  址</p>
            </td>
            <td>
            <input id="re-memAddr"  class="memsand" type="text" value="${data[i].memAddr}">    
            </td>
        </tr>
        <tr>
            <td>
              <p class="p_title">購物金</p>
            </td>
            <td>
              <input disabled="disabled" class="memsand" type="text" value="$ ${data[i].coupon}"            
            </td>
        </tr>
        <tr>
          <td class="mem-time" colspan="2">
            最後修改時間:<span class="memDate">${data[i].memDate}</span>
          <input id="re-mem" type="submit" class="button1" name="submit" value="修改"/>            
          </td>
        </tr>`                       
        ;}
                                           
    apiData += '</table>';
                  
  $('#memfeedback').append(apiData);
  $("#re-mem").click(function(){
    memNickName=$("#re-memNickName").val();
    memId= $("#re-memId").val();
    memPsw= $("#re-memPsw").val();
    memName= $("#re-memName").val();
    memEmail= $("#re-memEmail").val();
    memAddr= $("#re-memAddr").val();
    tel= $("#re-tel").val();
   $.post("memUpdata.php",{memNickName:memNickName,memId:memId,memPsw:memPsw,memName:memName,memEmail:memEmail,memAddr:memAddr,tel:tel},function(result){
    location.reload();  
    alert("成功");
      });
                     
  });


  },
  });       
});        



  //我舉辦的活動
    $(document).ready(function(){     
           $.ajax({
              type:"post",  
              url: "memact.php",
              dataType: "json",
              success: function(data){
               let apiData = '<table class="my-act"><h3>我舉辦的活動</h3><tr><th>活動日期</th><th>活動名稱</th><th>活動地點</th><th>備註</th></tr>';                            
                   for(let i=0; i<data.length; i++){
                   apiData +=
                   `<tr>                       
                       <td>${data[i].actStartDate}</td>
                       <td>${data[i].actName}</td>
                       <td>${data[i].actLoc}</td>
                       <td>
                           <a href="#">
                           <button class="button">編輯</button>
                          </a>
                           <button class="cancel-btn" name="actNo" type="button" id="cancel-${data[i].actNo}" value="${data[i].actNo}">
                           取消
                           </button>                    
                       </td>                         
                   </tr>`;}
                                                  
                   apiData += '</table>';
                         
                   $('#act-master').append(apiData);
                      $(".cancel-btn").click(function(){
                      txt=$(this).val();
                       $.post("actCancelStat.php",{actNo:txt},function(result){
                       alert("txt");
                       });
                           
                       });
                                           
               },                    
           }); //$.ajax                       
    });

 //我參加的活動 
    $(document).ready(function(){      
           $.ajax({
              type:"post",  
              url: "act-join.php",
              dataType: "json",
              success: function(data){
               let apiData = '<h3>我參加的活動</h3><table class="my-act"><tr><th>活動日期</th><th>活動名稱</th><th>活動地點</th><th>備註</th></tr>';         
                   
                   for(let i=0; i<data.length; i++){
                   apiData +=
                   `<tr>                       
                       <td>${data[i].actStartDate}</td>
                       <td>${data[i].actName}</td>
                       <td>${data[i].actLoc}</td>
                       <td>                      
                           <button class="nojoin-btn" name="actNo" type="button" id="nojoin-${data[i].actNo}" value="${data[i].actNo}">
                           取消
                           </button>
                       </td>                            
                   </tr>`;}
                                                  
                   apiData += '</table>';
                         
                   $('#act-master').append(apiData);
                     $(".nojoin-btn").click(function(){
                       let actcancel=$(this).parent().parent()                    
                      txt=$(this).val();
                     $.post("cancel-join.php",{actNo:txt},function(result){
                      actcancel.remove();  
                      alert("已取消報名");  
                        });                          
                     });                                          
               },                    
           }); //$.ajax                       
      
   
    });


  //我的訂單撈取
 $(document).ready(function(){     
     $.ajax({
     type:"post",  
     url: "memord.php",
     dataType: "json",
     success: function(data){                         
     let apiData = '<h3 class="ord-head">商品訂單</h3><div class="baic_txt my-ord" style="border-bottom:2px solid orange;"><span class="col-md-3 col-3">訂單編號</span><span class="col-md-3 col-3">訂購日期</span><span class="col-md-3 col-3">總金額</span><span class="clo-md-3 col-3">備註</span></div>';
         for(let i=0; i<data.length; i++){
         apiData +=
         

         `<div class="my-ord">
             <span class="col-md-3 col-3">${data[i].ordNo}</span> 
             <span class="col-md-3 col-3">${data[i].ordDate}</span> 
             <span class="col-md-3 col-3">${data[i].ordTotal}</span>                           
             <span class="col-md-3 col-3">
              <button class="ord-btn" name="ordNo" type="button" id="ord-btn" value="${data[i].ordNo}">
              展開</button>          
             </span>     
         </div>
         <div id="ord${data[i].ordNo}" class="my-ord" style="display:none;">
            <div id="box"></div>
            <div class="col-12 col-md-12 textLeft">收件者:${data[i].ordName}</div> 
            <div class="col-12 col-md-12 textLeft">電話:${data[i].ordTel}</div> 
            <div class="col-12 col-md-12 textLeftB">地址:${data[i].ordAddr}</div>          
          </div>`   
                             
         ;}
                                            
     apiData += '</div>';
                   
   $('#memord-data').append(apiData);

     $(".ord-btn").one("click",function(){

      //let pos = $(this).parent().parent();
      let ordaddr = $(this).parent().parent().next();      
      let position = $(this).parent().parent();
     
      txt=$(this).val();
      $.post("memordprod.php",{ordNo:txt},function(ord){

        let proData = '<div id="prodname"><span class="col-md-3 col-3">商品名稱</span><span class="col-md-3  col-3">數量</span><span class="col-md-3  col-3">單價</span><span class="col-md-3  col-3"></span>';
        
        for(let i=0; i<ord.length; i++){
          proData +=
         `<div>
          <span class="col-md-3 col-3">${ord[i].prodName}</span>
          <span class="col-md-3 col-3">${ord[i].amount}</span>
          <span class="col-md-3 col-3">${ord[i].prodPrice}</span>
          <span class="col-md-3 col-3"></span>
          </div>`
        ;}
        proData += '</div>';
        
        ordaddr.css({"display":"block"});
       
        position.append(proData);
          

        
       // pos.css({"background-color":"blue"});
        console.log(pos);
        
        //postiion.slideToggle(1000);
        //return false;
         //tex=${data[i].ordNo};
      // $('#ord-btn').append(proData);
        //$("div[id='']").append(proData);
        },"json");                   
        });
     },
     });       
   });        


   
//客製訂單
  $(document).ready(function(){     
      $.ajax({
      type:"post",  
      url: "memord.php",
      dataType: "json",
      success: function(data){                        
      let apiData = '<h3 class="ord-head" >客製訂單</h3><div class="baic_txt><span class="col-md-3 col-3" style="border-bottom:1px solid orange">訂單編號</span><span class="col-md-3 col-3">訂購日期</span><span class="col-md-3 col-3">總金額</span><span class="col-md-3 col-3">備註</span></div>';
          for(let i=0; i<data.length; i++){
          apiData +=
          `<div class="ord-bor">
              <span class="col-md-3 col-3">${data[i].cusNo}</span> 
              <span class="col-md-3 col-3">${data[i].ordNo}</span>  
              <span class="col-md-3 col-3">${data[i].ordTotal}</span>                           
              <span class="col-md-3 col-3">
                <button class="cus-btn" name="ordNo" type="button" id="cus-btn">
                展開</button>          
              </span>     
          </div>
          <div id="cus-Addr" style="display:none" class="textLeft col-12 col-md-12">
             <div class="col-md-12 col-12">收件者:${data[i].ordName}</div> 
             <div class="col-md-12 col-12">電話:${data[i].ordTel}</div> 
             <div class="col-md-12 col-12">地址:${data[i].ordAddr}</div> 
          </div>`                       
          ;}
                                             
      apiData += '</div>';
                    
    $('#cus-data').append(apiData);
      $('.cus-btn').click(function(){
       let cusdata= $(this).parent().parent().next();  
       console.log(cusdata);
       cusdata.css({
         display: "block",
         backgroundColor: "#DAE9F7",
         overflow: 'hidden',
        });

      });   
      },
      });       
    });        








