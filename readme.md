crear el .env
PORT=3100
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=e
DB_DATABASE=r
JWT_SECRET=eU


crear la carpeta log y darle permisos

mkdir log
cd log
touch log.log
chmod 777 log.log

usar el comanddo para crear lo losgs
pm2 start server.js --name "back_respirador" -- start --log log/log.log --time

pm2 list
 
pm2 save


