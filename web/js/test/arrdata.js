var data = [
		{"user":"5993bee4207acb45e558dbab","name":"蒋政伟","dept":"算法平台","number":"E00105","time":"2017-08-28T07:48:07.329Z","mail":"zhengwei.jiang","isvip":true},
		{"user":"5993bee4207acb45e558dbab","name":"蒋政伟","dept":"算法平台","number":"E00105","time":"2017-08-28T07:48:07.329Z","mail":"zhengwei.jiang","isvip":false},
		{"user":"5993bee4207acb45e558dbab","name":"蒋政伟","dept":"算法平台","number":"E00105","time":"2017-08-28T07:48:07.329Z","mail":"zhengwei.jiang","isvip":false},
		{"user":"5993bee4207acb45e558dbab","name":"蒋政伟","dept":"算法平台","number":"E00105","time":"2017-08-28T07:48:07.329Z","mail":"zhengwei.jiang","isvip":false},
		{"user":"5993bee4207acb45e558dbab","name":"蒋政伟","dept":"算法平台","number":"E00105","time":"2017-08-28T07:48:07.329Z","mail":"zhengwei.jiang","isvip":true}
	]


arr(data)

function arrvip(data){
    var arr = []
    for(var i= data.length-1; i>=0; i--){
        if(data[i].isvip){
            arr.push(data[i])
            data.splice(i,1)
        }
    }
    return arr
}