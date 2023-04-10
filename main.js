song = "";
leftWristX = 0 ;
leftWristY = 0 ;
function preload()
{
    song = loadSound('music.mp3');
    song.setVolume(1);
    song.rate(1)
}
function setup()
{
canvas= createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video,modelLoaded);
}
function modelLoaded()
{
    console.log('PoseNet is Initalized');
    poseNet.on('pose',gotposes);
}
function gotposes(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = result[0].pose.keypoint[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('leftWristX = ' + leftWristX+"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('rightWristX = ' + rightWristX +'rightWristY = ' +rightWristY)
    }
}
function draw()
{
    image( video, 0,0,600,500);

    fill('#FF0000');
    stroke('#FF0000')
    
if(scoreLeftWrist > 0.2)
{
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY= Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = "+ volume
    song.setVolume(volume);
}
}
function play()
{
    song.play();
}
