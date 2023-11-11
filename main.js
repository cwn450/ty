leftWristx=0
leftWristy=0
rightWristx=0
rightWristy=0
scoreleftwrist=0

song=""
function preload()
{
song=loadSound("music.mp3")
}





function setup()
{
    canvas=createCanvas(600,500)
    canvas.center()

    video=createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose', gotposes)

}

function draw()
{
    image(video,0,0.600,500)
    fill("red")
    stroke("red")

    if(scoreleftwrist>0.2){
        circle(leftWristx,leftWristy,20)
        innumberleftWristx=Number(leftWristy)
        remove_decimal=floor(innumberleftWristy)
        volume=remove_decimal/500
        document.getElementById("volume").innerHTML="volume="+volume
        song.setVolume(volume)
    }
}
function play()
{
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function modelLoaded(){
    console.log('posenet is initialized')
}

function gotposes(results){
    if(results.length>0){
        console.log(results)
        leftWristx=results[0].pose.leftWrist.x
        leftWristy=results[0].pose.leftWrist.y
        console.log("leftWristx="+leftWristx+"leftWristy="+leftWristy)

        rightWristx=results[0].pose.rightWrist.x
        rightWristy=results[0].pose.rightWrist.y
        console.log("rightWistx="+rightWristx+"rightWristy="+rightWristy)
        scoreleftwrist=results[0].pose.keypoints[9].score
        console.log("scoreleftwrist="+scoreleftwrist)
    }
}