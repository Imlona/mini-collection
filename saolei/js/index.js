
//扫雷对象的构造函数，三个参数分别为矩阵的宽高和地雷数量
function SaoLei(width,height,boomNumber){
	this.width = width;
	this.height = height;
	this.boomNumber = boomNumber;
	
	//创建棋盘table
	this.$ele = $("<table id='game-rect'></table>");
	
	//存放所有td的二维数组
	this.$tds = [];
	
	//存放所有td的一维数组
	this.$alltds = [];
	
	//创建所有的tr和td
	for (var i = 0;i<height;i++) {
		var $tr = $("<tr></tr>");
		var tempArr = [];
		for (var j = 0;j<width;j++) {
			$td = $("<td></td>")
			.attr("row",i)
			.attr("col",j)
			.appendTo($tr);
			tempArr.push($td);
			this.$alltds.push($td);
		}
		$tr.appendTo(this.$ele);
		this.$tds.push(tempArr);
	}
	
	//处理格子点击事件的函数
	function gridClick(e){
		var row = $(e.target).attr("row")*1;
		var col = $(e.target).attr("col")*1;
		
//		console.log(e.button);
		
		if(e.button == 0){
			//左键
			
			//未打开的格子
			if(this.$tds[row][col].attr("sta")=="grid-plain"){
				
				this.openGrid(row,col);
			}
		}else if(e.button == 2){
			//右键
			if(this.$tds[row][col].attr("sta")=="grid-plain"){
				this.$tds[row][col].attr("sta","grid-flag");
			}else if(this.$tds[row][col].attr("sta")=="grid-flag"){
				this.$tds[row][col].attr("sta","grid-plain");
			}
		}
		
		//检查是否过关
		if(this.checkComplete()){
			alert("Complete!");
			this.reset();
		}
	}
	
	
	//为所有格子绑定事件函数
	this.$alltds.forEach(function(obj){
		
		//点击事件
		obj.mousedown(gridClick.bind(this));
		
		//右键菜单事件
		obj[0].oncontextmenu = function(e){
			e.preventDefault();
		}
		
	}.bind(this));
	
	
	this.reset();
}


//重置游戏
SaoLei.prototype.reset = function(){
	
	//随机生成雷的位置
	var randomArr = _.range(0,this.width*this.height);
	randomArr = _(randomArr).sample(this.boomNumber);
	
	//把所有格子状态还原
	this.$alltds.forEach(function(obj,index){
		obj.attr("sta","grid-plain");
		obj.attr("treated","no");
		if(randomArr.indexOf(index)>=0){
			obj.attr("boom","yes");
//			obj.attr("sta","grid-boom");
//			obj.attr("sta","open-1");
		}else{
			obj.attr("boom","no");
		}
	});
	
}

//计算某格周围的雷数
SaoLei.prototype.boomArround = function(r,c){
//	console.log(r+","+c);
	var num = 0;
	for (var i = r-1;i<=(r+1);i++) {
		for (var j = c-1;j<=(c+1);j++) {
			if(i>=0&&i<this.height&&j>=0&&j<this.width){
				if(i==r&&j==c){
					continue;
				}
				if(this.$tds[i][j].attr("boom")=="yes"){
					num++;
				}
			}
		}
	}
	return num;
}

//打开某个格子的函数
SaoLei.prototype.openGrid = function(r,c){
	
	this.$tds[r][c].attr("treated","yes");
	
	if(this.$tds[r][c].attr("boom")=="yes"){
		//点开的是炸弹
		this.$tds[r][c].attr("sta","grid-ex");
		this.gameover();
	}else{
		//点开的不是炸弹，先计算周围有多少颗雷。
		var ar = this.boomArround(r,c);
		this.$tds[r][c].attr("sta","open-"+ar);
		
		if(ar == 0){
			//如果四周都没有雷就把四周都打开
			for (var i = r-1;i<=(r+1);i++) {
				for (var j = c-1;j<=(c+1);j++) {
					if(i>=0&&i<this.height&&j>=0&&j<this.width){
						if(i==r&&j==c){
							continue;
						}
						if(this.$tds[i][j].attr("treated")=="no"){
							this.openGrid(i,j);
						}
					}
				}
			}
			
		}
		
	}
}



SaoLei.prototype.checkComplete = function(){
	return this.$alltds.every(function(obj){
		return obj.attr("sta")!="grid-plain";
	});
}

//游戏结束
SaoLei.prototype.gameover = function(){
	alert("GAME OVER");
	this.reset();
}
