var h1 = document.getElementById("letter");
var p = document.getElementById("result");

//定义一个变量，记录正确的次数；
var correct = 0;

//记录错误的次数；
var error = 0;


function changeLetter(){
    // Math.random，生成一个随机数，范围在0-1之间。(大于等于0，小于1)
    var num = Math.random();

    //把随机数限定在65-91之间
    num = num*26+65;

    //Math.floor：向下取整。
    num = Math.floor(num);

    //根据数字生成对应编码的字符。
    var l = String.fromCharCode(num);

    h1.textContent = l;
}

changeLetter();


//-----------------------------------------------

var timer;

//监听键盘事件，为键盘(按下)事件绑定函数，每当某个键被按下时，该函数就会被调用。
document.body.onkeydown = function(e){
    //e.key表示本次事件所按下的键名。
    // alert(e.key);

    //将字符串转为大写。
    var k = e.key.toUpperCase();

    if(k==h1.textContent){
        //正确
        changeLetter();
        //添加动画
        h1.classList.add("zoomIn");
        timer = setTimeout(function() {
            h1.classList.remove("zoomIn");
        }, 500);

        correct++;
    }else{
        //错误
        h1.classList.add("shake");
        h1.style.color = "red";
        timer = setTimeout(function() {
            h1.classList.remove("shake");
            h1.style.color = "white";
        }, 500);

        error++;
    }

    var rate = correct/(correct+error)*100;

    //四舍五入，保留小数点后两位。
    rate = rate.toFixed(2);

    p.textContent = "正确"+correct+"个，错误"+error+"个，正确率"+rate+"%";

}



setTimeout(function() {
    alert("时间到");
}, 60*1000);

