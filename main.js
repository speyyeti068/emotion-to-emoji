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

function captureImage() {
    Webcam.snap(function (dataURI) {
        document.getElementById("result").innerHTML = "<img id = 'imageResult' src = '" + dataURI + "'>";
    })
}

console.log("ML5 Version = " + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/wf-GisCLL/model.json", function () {
    console.log("Model Loaded")
})

function speak() {
    var synth = window.speechSynthesis;

    var speechData1 = "The First Prediction Is: " + predict1;
    var speechData2 = "The Second Prediction Is: " + predict2;

    var speechUtterance = new SpeechSynthesisUtterance(speechData1 + speechData2);

    synth.speak(speechUtterance);
}

function check() {
    var webcam = document.getElementById("imageResult");

    classifier.classify(webcam, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);

        document.getElementById("emotionNameResult1").innerHTML = result[0].label;
        document.getElementById("emotionNameResult2").innerHTML = result[1].label;

        if (result[0].label == "Happy") {
            document.getElementById("emojiResult1").innerHTML = "&#128522";
        } else if (result[0].label == "Shocked") {
            document.getElementById("emojiResult1").innerHTML = "&#x1f632";
        } else {
            document.getElementById("emojiResult1").innerHTML = "&#128548";
        }

        if (result[1].label == "Happy") {
            document.getElementById("emojiResult2").innerHTML = "&#128522";
        } else if (result[1].label == "Shocked") {
            document.getElementById("emojiResult2").innerHTML = "&#x1f632";
        } else {
            document.getElementById("emojiResult2").innerHTML = "&#128548";
        }

        predict1 = result[0].label
        predict2 = result[1].label;

        speak();
    }
}