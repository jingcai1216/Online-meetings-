var http=require("http"); //引入一个模块
var fs=require("fs"); //引入文件系统模块
var ws=require("socket.io")//引入socket.io模块

var server=http.createServer(function(req,res)
	{
        var html=fs.readFileSync("./client.html");//调用fs模块中的同步读文件方法
		
		res.end(html);
	}).listen(3000);

var io=ws(server);//http服务与we服务相关联 返回io服务实例

io.on("connection",function(socket){
	//发生在用户连接io服务器的时候
	console.log("有新用户进入房间");
    //接受客户端的消息
    socket.on("message",function(obj){
    	console.log(obj);
         io.emit("message",obj);//发送消息给所有已经连接的客户端 广播

    });
});
