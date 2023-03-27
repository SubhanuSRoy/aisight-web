import React, { useCallback, useRef, useState } from "react";
import "./App.css";
import Webcam from "react-webcam";

function App() {
  const [img, setImg] = useState(null);
  const [imageFile, setimageFile] = useState(null);

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },
    facingMode: { exact: "user" },
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
    // setimageFile(img.file)
    console.log(img);
  }, [webcamRef]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Convert Base64 to file
    const blob = base64ToBlob(img);
    const file = new File([blob], "AISight_capture.png", { type: "image/png" });

    console.log(file)
    // Send file as form data to backend
    const formData = new FormData();
    formData.append("image", file);

    // Make a POST request to backend API
    // fetch("http://example.com/upload", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));
  };

  // Convert Base64 to blob
  const base64ToBlob = (base64) => {
    const byteString = atob(base64.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/png" });
  };

  return (
    <div className="bg-purple-600 w-screen h-screen flex flex-col items-center justify-center">
      {/* <Webcam imageSmoothing={true} width={480} height={720} videoConstraints={videoConstraints}/> */}

      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            height={800}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button onClick={capture} className="bg-white rounded-md p-4">
            Capture photo
          </button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <form onSubmit={handleSubmit}>
            <button type="submit" className="bg-green-300 rounded-md p-4">Submit</button>
          </form>

          <button
            onClick={() => setImg(null)}
            className="bg-white rounded-md p-4"
          >
            Retake
          </button>
        </>
      )}
    </div>
  );
}

export default App;
