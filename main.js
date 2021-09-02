rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;

leftWristY = 0;
leftWristX = 0;
scoreLeftWrist = 0;

JelousyJelousy = ""; 
LofiMusic = "";

songStatus1 = "";
songStatus2 = "";

function preload()
{
    JelousyJelousy = loadSound("JelousyJelousy.mp3");
    LofiMusic = loadSound("LofiMusic.mp3");
}

function setup()
{
    canvas = createCanvas(400, 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 400, 350);

    songStatus1 = JelousyJelousy.isPlaying();
    songStatus2 = LofiMusic.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
        fill('sky blue');
        stroke('blue');
        circle(leftWristX, leftWristY, 20);
        
        LofiMusic.stop();

        if(songStatus2 == false)
        {
            JelousyJelousy.play();
            document.getElementById("SongNameH2").innerHTML = "Jelousy Jelousy";
        }
    } 
    
    if(scoreRightWrist > 0.2)
    {
        fill('sky blue');
        stroke('blue');
        circle(rightWristX, rightWristY, 20);
        
        JelousyJelousy.stop();

        if(songStatus1 == false)
        {
            LofiMusic.play();
            document.getElementById("SongNameH2").innerHTML = "Lofi Music";
        }
    } 
}

function modelLoaded()
{
    console.log("PoseNet is initialized!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        console.log("rightWristY = " + rightWristY);
        console.log("rightWristX = " + rightWristX);

        leftWristY = results[0].pose.leftWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        console.log("leftWristY = " + leftWristY);
        console.log("leftWristX = " + leftWristX);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
    }
}