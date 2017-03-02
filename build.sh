echo 'deploying....';
cd ../skills-app
echo 'Pull started';
git pull https://gi thub.com/ashish-iitr/skills-app.git
echo 'Pull ended';
#echo 'Stopping the server';
#sudo fuser -KILL -k -n tcp 80
#nohup http-server -p 80 &
#echo 'Starting the server';


