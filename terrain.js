var map = [
]
var stack = [[0,0,1],[4,0,1],[0,2,1],[4,2,1]];
while(stack.length>0){
	if(map[stack[0][1]][stack[0][0]] === 1){
		map[stack[0][1]][stack[0][0]] = stack[0][2]+1;
	}
	if(stack[0][0]>0 && map[stack[0][1]][stack[0][0]-1]===1){
		stack.push([stack[0][0]-1,stack[0][1],stack[0][2]+1])
	}
	if(stack[0][0]<map[stack[0][1]].length-1 && map[stack[0][1]][stack[0][0]+1]===1){
		stack.push([stack[0][0]+1,stack[0][1],stack[0][2]+1])
	}
	if(stack[0][1]>0 && map[stack[0][1]-1][stack[0][0]]===1){
		stack.push([stack[0][0],stack[0][1]-1,stack[0][2]+1])
	}
	if(stack[0][1]<map.length-1 && map[stack[0][1]+1][stack[0][0]]===1){
		stack.push([stack[0][0],stack[0][1]+1,stack[0][2]+1])
	}
	stack.shift();
}
map.forEach(val=>document.write(val+"<br>"))
