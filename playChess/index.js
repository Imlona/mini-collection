// 找到所有红色表格中的td
var alltds = document.querySelectorAll('#board2 td');

// 当前回合，初始值设置为black
var turn = 'black';


var round = document.getElementById('round');

var finish = false;


// 悔棋
var his = [];


// td的点击事件函数,鼠标点击事件监听
function tdClick(e){

    if(finish){
        return;
    }

    // 点击的地方变红
    // e.target.style.backgroundColor = 'red';


    var td = e.target ;

    // 下过子的地方，不能再下子
    var side = td.getAttribute('chess');
    if(side){
        return;
    }


    // 先下黑子
    td.setAttribute('chess',turn);

    // 判断是否胜利
    winCheck(e.target.index);


    if(turn == 'black'){
        turn = 'white';

        round.textContent = '白方回合';

    }else{
        turn = 'black';

        round.textContent = '黑方回合';
    }

    // 悔棋
    his.push(e.target);

}
// for循环
for(var i=0;i<alltds.length;i++){
    alltds[i].onclick = tdClick;

    
    alltds[i].index = i;


    // 显示数字
    // alltds[i].textContent= i;
}
// 悔棋
function back(){

    finish = false;

    if(his.length > 0){
        var td = his.pop();
        td.removeAttribute('chess');
        // turn = turn == 'black' ? 'white' : 'black';
        if(turn == 'black'){
            turn = 'white';

            round.textContent = '白方回合';

        }else{
            turn = 'black';

            round.textContent = '黑方回合';
        }
    }
}


function restart(){
    window.location.reload();
}

// 判断胜利的函数
function winCheck(index){
    

    if(horizontalCheck(index)||verticalCheck(index)||tlbrCheck(index)||tlblCheck(index)){


        finish = true;
        alert((turn=='black'?'黑':'白')+ "方胜利");
        
    }

}

// 检查横向 函数
function verticalCheck(index){

    var num = 1;
 // ---------------------------------------
    var currentIndex = index;

    var hasNext = currentIndex%19!=0&&alltds[currentIndex-1].getAttribute('chess')==turn;

    while(hasNext){
        num++;
        currentIndex--;

        hasNext = currentIndex%19!=0&&alltds[currentIndex-1].getAttribute('chess')==turn;

    }
 // ----------------------------------------

    var currentIndex = index;

    var hasNext = currentIndex%19!=18&&alltds[currentIndex+1].getAttribute('chess')==turn;

    while(hasNext){
        num++;
        currentIndex++;

        hasNext = currentIndex%19!=18&&alltds[currentIndex+1].getAttribute('chess')==turn;

    }
 // ------------------------------
    return num >= 5;

}


// 纵向检查 函数
function horizontalCheck(index){

    var num = 1;
 // ---------------------------------------
    var currentIndex = index;

    var hasNext = currentIndex>=19&&alltds[currentIndex-19].getAttribute('chess')==turn;

    while(hasNext){
        num++;
        currentIndex-=19;

        hasNext = currentIndex>=19&&alltds[currentIndex-19].getAttribute('chess')==turn;

    }
 // ----------------------------------------

    var currentIndex = index;

    var hasNext = currentIndex<342&&alltds[currentIndex+19].getAttribute('chess')==turn;

    while(hasNext){
        num++;
        currentIndex+=19;

        hasNext = currentIndex<342&&alltds[currentIndex+19].getAttribute('chess')==turn;

    }
 // ------------------------------
    return num >= 5;
    
}

// 从左上到右下，斜向的检查
function tlbrCheck(index){

    var num = 1;
 // ---------------------------------------
    var currentIndex = index;

    var hasNext = currentIndex%19!=0&&currentIndex>=19&&alltds[currentIndex-20].getAttribute('chess')==turn;

    while(hasNext){
        num++;
        currentIndex-=20;

        hasNext = currentIndex%19!=0&&currentIndex>=19&&alltds[currentIndex-20].getAttribute('chess')==turn;

    }
 // ----------------------------------------

    var currentIndex = index;

    var hasNext = currentIndex<342&&currentIndex%19!=18&&alltds[currentIndex+19].getAttribute('chess')==turn;

    while(hasNext){
        num++;
        currentIndex+=20;

        hasNext = currentIndex<342&&currentIndex%19!=18&&alltds[currentIndex+19].getAttribute('chess')==turn;

    }
 // ------------------------------
    return num >= 5;
    
}

// 从右上到左下，斜向的检查
function tlblCheck(index){

    var num = 1;
 // ---------------------------------------
    var currentIndex = index;

    var hasNext = currentIndex%19!=18&&currentIndex>=19&&alltds[currentIndex-18].getAttribute('chess')==turn;

    while(hasNext){
        num++;
        currentIndex-=18;

        hasNext = currentIndex%19!=18&&currentIndex>=19&&alltds[currentIndex-18].getAttribute('chess')==turn;

    }
 // ----------------------------------------

    var currentIndex = index;

    var hasNext = currentIndex<342&&currentIndex%19!=18&&alltds[currentIndex+19].getAttribute('chess')==turn;

    while(hasNext){
        num++;
        currentIndex+=18;

        hasNext = currentIndex<342&&currentIndex%19!=18&&alltds[currentIndex+19].getAttribute('chess')==turn;

    }
 // ------------------------------
    return num >= 5;
    
}
