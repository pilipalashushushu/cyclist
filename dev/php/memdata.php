<?php
session_start();
$errMsg = "";
try{

    require_once("localhost.php");
    
    $sql = "select * from `member` where memNo='$_SESSION[memNo]'"; 

    $member=$pdo->query($sql);

    if($member->rowCount()==0){
          echo "找不到資料";
    }else{
        
     $arr=[];
     $i=0;
        while($result = $member->fetch(PDO::FETCH_ASSOC)){
         $arr[$i]=$result;
         $i++;
          };          
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }

}catch(PDOEexception $e){
    $errMsg.="錯誤訊息:".$e->getMessage()."<br>";
    $errMsg.="錯誤行數:".$e->getLine()."<br>";
};


?>