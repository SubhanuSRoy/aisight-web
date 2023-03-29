import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import waiting from "../images/waiting.gif";


function Capture() {
  const [img, setImg] = useState(null);
  const [imageFile, setimageFile] = useState(null);

  const [loading, setLoading] = useState(false);

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

  const [resArr, setResArr] = useState(null);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "AISight",
      },
    },
  };

  const labels = ["Normal", "Cataract", "Diabetes", "Glaucoma"];

  const data = {
    labels,
    datasets: [
      {
        label: "Your diagnosis",
        data: resArr,
        backgroundColor: "#551D6A",
      },
    ],
  };
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // setImg(event.target.files[0]);
    setLoading(true);
    console.log(img);
    // Convert Base64 to file
    const blob = base64ToBlob(img);
    const file = new File([blob], "AISight_capture.png", { type: "image/png" });

    console.log(file);
    // Send file as form data to backend
    const formData = new FormData();
    formData.append("my_file", file);

    // Make a POST request to backend API
    // fetch(process.env.REACT_APP_BACKEND_SERVER + "uploadfile", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));

    axios
      .post("http://192.168.245.158:8050/file", formData)
      .then((res) => {
        setResArr(res.data.Scores);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error.message);
        // notify("error");
      });
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

  // file upload
  const fileUpload = (event) => {
    setImg(event.target.files[0]);
  };

  useLayoutEffect(() => {
    console.log(img);
  }, [img]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      transition={{ duration: 2 }}
    >
      {/* <Webcam imageSmoothing={true} width={480} height={720} videoConstraints={videoConstraints}/> */}

      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            height={1200}
            width={800}
            className="rounded-md shadow-md"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button
            onClick={capture}
            className="bg-white rounded-md p-4 my-4 hover:bg-transparent hover:text-white hover:border-2 hover:border-gray-100"
          >
            Capture image
          </button>
        </>
      ) : (
        <>
          {resArr == null ? (
            <>
              <img src={img} alt="captured image" className="w-3/4" />
              <div className="flex items-center justify-center gap-4 mt-4">
                <form onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    className="bg-[#5f47a8] text-white font-bold rounded-md p-4"
                  >
                    Submit
                  </button>
                </form>

                <button
                  onClick={() => setImg(null)}
                  className="bg-white rounded-md p-4"
                >
                  Retake
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-md p-4 w-3/4 h-3/4">
              {loading && <img src={waiting} />}
              {!loading && (
                <Bar
                  options={options}
                  data={data}
                  className="text-black w-full"
                />
              )}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default Capture;
