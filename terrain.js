<!DOCTYPE html>
<html>
<body>
<canvas id = "ca" width = 400 height = 400></canvas>
</body>
<script>
var ctx = document.getElementById("ca").getContext("2d");
function elev(arr){
	var stack = [];
	for(var i = 0; i<arr.length; i++){
		for(var j = 0; j<arr[0].length; j++){
			var count = 0;
			if(j>0 && arr[i][j-1]!=0){count+=1;}
			if(i>0 && arr[i-1][j]!=0){count+=1;}
			if(j<arr[0].length-1 && arr[i][j+1]!=0){count+=1;}
			if(i<arr.length-1 && arr[i+1][j]!=0){count+=1;}
			if(count===1 && arr[i][j]!=0){stack.push([j,i,1])}
		}
	}
	while(stack.length>0){
		if(arr[stack[0][1]][stack[0][0]] === 1){
			arr[stack[0][1]][stack[0][0]] = stack[0][2]+1;
		}else{
			stack.shift();
			continue;
		}
		if(stack[0][0]>0 && arr[stack[0][1]][stack[0][0]-1]===1){
			stack.push([stack[0][0]-1,stack[0][1],stack[0][2]+1])
		}
		if(stack[0][0]<arr[stack[0][1]].length-1 && arr[stack[0][1]][stack[0][0]+1]===1){
			stack.push([stack[0][0]+1,stack[0][1],stack[0][2]+1])
		}
		if(stack[0][1]>0 && arr[stack[0][1]-1][stack[0][0]]===1){
			stack.push([stack[0][0],stack[0][1]-1,stack[0][2]+1])
		}
		if(stack[0][1]<arr.length-1 && arr[stack[0][1]+1][stack[0][0]]===1){
			stack.push([stack[0][0],stack[0][1]+1,stack[0][2]+1])
		}
		stack.shift();
	}
}
function scale(arr,s){
	var out = [];
	for(var i = 0; i<arr.length*s; i++){
		out.push([]);
		for(var j = 0; j<arr[0].length*s; j++){
			out[i].push(0);
		}
	}
	for(var i = 0; i<arr.length; i++){
		for(var j = 0; j<arr[0].length; j++){
			out[i*s][j*s] = arr[i][j];
		}
	}
	for(var i = 0; i<out.length; i+=s){
		for(var j = 0; j<out[0].length; j+=s){
			if(out[i][j]!=0){
				if(j<arr.length-1-s && out[i][j+s]!=0){
					for(var k = j; k<j+s; k++){
						out[i][k]=1;
					}
				}
				if(i<arr.length-1-s && out[i+s][j]!=0){
					for(var k = i; k<i+s; k++){
						out[k][j]=1;
					}
				}
				if(j>=s && out[i][j-s]!=0){
					for(var k = j; k>j-s; k--){
						out[i][k]=1;
					}
				}
				if(i>=s && out[i-s][j]!=0){
					for(var k = i; k>i-s; k--){
						out[k][j]=1;
					}
				}
			}
		}
	}
	return out
}
function gen(w,h = undefined){
	if(h === undefined){h = w;}
	var out = [];
	for(var i = 0; i<h; i++){
		out.push([]);
		for(var j = 0; j<w; j++){
			out[i].push(0)
		}
	}
	out[Math.floor(h/2)][Math.floor(w/2)] = 1;
	for(var iter = 0; iter<3; iter++){
		var count = out.flat().reduce((acc,val)=>val===1?1:0,0);
		while(count<out.length*out[0].length*0.2){
			var x,y;
			do{
				x = Math.floor(Math.random()*out[0].length);
				y = Math.floor(Math.random()*out.length);
			}while(out[y][x]===1);
			while(out[y][x-1]!=1 && out[y][x+1]!=1 && out[y-1][x]!=1 && out[y+1][x]!=1){
				var r = Math.floor(Math.random()*4);
				if(r===0){y-=1;}
				if(r===1){y+=1;}
				if(r===2){x-=1;}
				if(r===3){x+=1;}
			}
			count = out.flat().reduce((acc,val)=>val===1?1:0,0);
		}
		out = scale(out,2);
	}
	return out;
}
var a = gen(5)
a.forEach(val=>document.write("<br>"+val));
</script>
</html>
