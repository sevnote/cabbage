Cabbage
=======
分布式计划任务流控制系统

#服务端启动

##配置文件
cp config/config.json.template config/config.json

##守护进程
建议安装PM2来管理
pm2 start server.js -i 4 (启动Cluster模式)

或者
node server.js

#Agent代理
##配置文件
cp agent/config/config.json.template agent/config/config.json

##启动
pm2 start agent.js -i 2 
or
node agent.js


#UI
![image]('https://raw.githubusercontent.com/sevnote/cabbage/master/image/screenshot.jpg')
