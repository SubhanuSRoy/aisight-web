import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import dummy from "../images/dummy.jpg";
import waiting from "../images/waiting.gif";

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

function Upload() {
  const [img, setImg] = useState(null);
  const [imageURL, setimageURL] = useState(null);

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

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
    setLoading(true);
    // Send file as form data to backend
    const formData = new FormData();
    formData.append("my_file", img);

    console.log(formData);

    // fetch("http://172.17.239.224:8050/file", {
    //   method: "POST",
    //   body: formData,
    // })
    // .then(response => console.log(response))
    // .catch(error => console.log(error));

    axios
      .post("http://192.168.245.158:8050/file", formData)
      .then((res) => {
        setResArr(res.data.Scores);
      })
      .catch((error) => {
        console.log(error.message);
        // notify("error");
      });
  };

  // file upload
  const fileUpload = (event) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
    setImg(event.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {imageFile === null ? (
        <>
          <img src={dummy} alt="upload iris image" className="max-w-sm mb-4" />
          <input type="file" onChange={fileUpload} />
        </>
      ) : (
        <>
          {resArr == null ? (
            <>
              <img src={imageFile} alt="cannot display" className="max-w-sm" />
              {loading && <img src={waiting} />}
              {!loading && (
                <form onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    className="bg-[#5f47a8] text-white font-bold rounded-md mt-4 p-4"
                  >
                    Get Diagnosis
                  </button>
                </form>
              )}
            </>
          ) : (
            <div className="bg-white rounded-md p-4 w-3/4 h-3/4">
              <Bar
                options={options}
                data={data}
                className="text-black w-full"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Upload;
