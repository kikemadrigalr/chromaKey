const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

//tomar source de video de la webcam
//se utiliza el API navigator media devices

navigator.mediaDevices
  .getUserMedia({
    video: true, // para especificar que quiero el source de video
  }) //devuelve una promesa con un stream de datos
  .then((stream) => {
    //utiliza .then para manejar la promesaa

    //asigno el stream de datos al video
    video.srcObject = stream;
  });

video.addEventListener("loadeddata", () => {
  //asigno al canvas las medidas de resolucion del webcam
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  // console.log(canvas.width, canvas.heikght);

  setInterval(() => {
    chromaKey();
  }, 40);
});

function chromaKey() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dataLength = imageData.data.length / 4;
  console.log(imageData.data);
  console.log(imageData.data);

  for (let i = 0; i < dataLength; i++) {
    const offset = i * 4;
    const red = imageData.data[offset + 0];
    const green = imageData.data[offset + 1];
    const blue = imageData.data[offset + 2];
    const alpha = imageData.data[offset + 3];

    // if (alpha > 90 && alpha > red && alpha > green && alpha > blue) {
    //   imageData.data[offset + 3] = 0;
    // }

    // if (red > 90 && red > green && red > blue) {
    //   imageData.data[offset + 3] = 0;
    // }

    // if (green > 90 && green > red && red > blue) {
    //   imageData.data[offset + 3] = 0;
    // }

    // if (blue > 90 && blue > red && blue > green) {
    //   imageData.data[offset + 3] = 0;
    // }
  }
  ctx.putImageData(imageData, 0, 0);
}
