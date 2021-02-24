var predict1 = "";
var predict2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function captureImage(){
    Webcam.snap(function(dataURI){
        document.getElementById("result").innerHTML = "<img id = 'imageResult' src = '" + dataURI + "'>";
    })
}

console.log("ML5 Version = " + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/wf-GisCLL/model.json", function(){
    console.log("Model Loaded")
})

function speak(){
    var synth = window.speechSynthesis;

    var speechData1 = "The First Prediction Is: " + predict1;
    var speechData2 = "The Second Prediction Is: " + predict2;

    var speechUtterance = new SpeechSynthesisUtterance(speechData1 + speechData2);

    synth.speak(speechUtterance);
}

function predictEmotion(){
    speak();
}