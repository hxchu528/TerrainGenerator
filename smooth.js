function smooth(arr){
	var stop = false;
	while(!stop){
		var count = 0;
		for(var i = 0; i<arr.length; i++){
			for(var j = 0; j<arr[0].length; j++){
				var prev = arr[i][j];
				if(arr[i][j]===0){
					var add = [];
					if(j>0 && arr[i][j-1]!=undefined && arr[i][j-1]>0){add.push(arr[i][j-1])}
					if(j<arr.length-1 && arr[i][j+1]!=undefined && arr[i][j+1]>0){add.push(arr[i][j+1])}
					if(i>0 && arr[i-1][j]!=undefined && arr[i-1][j]>0){add.push(arr[i-1][j])}
					if(i<arr.length-1 && arr[i+1][j]!=undefined && arr[i+1][j]>0){add.push(arr[i+1][j])}
					arr[i][j] = Math.round(add.reduce((acc,val)=>acc+val,0)/4)
				}
				if(arr[i][j]!=prev){count = 1;}
			}
		}
		if(count===0){stop = true;}
	}
}
