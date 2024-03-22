import React, { useEffect, useState } from "react";
import useTitle from "../../shared/usetitle/useTitle";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Pasteword = () => {
  useTitle("Multiple Word ADD");
  const [isVerified, setIsVerified] = useState(false);
  const [wordData, setWordData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [editWord, setEditWord] = useState("");
  const [editKorean, setEditKorean] = useState("");
  const [editBangla, setEditBangla] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [uploadingToMongoDB, setUploadingToMongoDB] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("isVerified");
    setIsVerified(verified === "true");

    const storedWordData = JSON.parse(localStorage.getItem("wordData"));
    if (storedWordData && storedWordData.length > 0) {
      setWordData(storedWordData);
      setShowTable(true);
    }
  }, []);

  const handleVerify = (status) => {
    setIsVerified(status);
  };

  const handleUpload = (event) => {
    if (event.clipboardData) {
      const pastedData = event.clipboardData.getData("text");
      try {
        const parsedData = JSON.parse(pastedData);
        setWordData(parsedData);
        localStorage.setItem("wordData", JSON.stringify(parsedData));
        setShowTable(true);
        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 5000);
      } catch (error) {
        console.error("Error parsing pasted data:", error);
      }
    } else {
      console.error("Clipboard data is not available.");
    }
  };

  const handleUploadToMongoDB = async () => {
    try {
      setUploadingToMongoDB(true);
      // Extracting Bangla and Korean words from wordData
      const dataToSend = wordData.map(({ banglaWord, koreanword }) => ({
        banglaWord,
        koreanWord: koreanword,
      }));

      // Send dataToSend to the server-side
      const response = await fetch("http://localhost:9000/multiplewordadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log("Upload to MongoDB successful");
        console.log(dataToSend);
        toast.success("Upload to MongoDB successful");
      } else {
        const data = await response.json(); // Parse response body as JSON
        console.error("Failed to upload to MongoDB");
        toast.error(data.error || "Failed to upload to MongoDB");
      }
    } catch (error) {
      console.error("Error uploading to MongoDB:", error);
      toast.error("Error uploading to MongoDB");
    } finally {
      setUploadingToMongoDB(false);
    }
  };

  const handleClear = () => {
    localStorage.removeItem("wordData");
    setWordData([]);
    setShowTable(false);
  };

  const handleEdit = (serialNo, korean, bangla) => {
    setEditWord(serialNo);
    setEditKorean(korean);
    setEditBangla(bangla);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updatedWordData = wordData.map((item) => {
      if (item.serialNumber === editWord) {
        return {
          ...item,
          banglaWord: editBangla,
          koreanword: editKorean,
        };
      }
      return item;
    });
    setWordData(updatedWordData);
    localStorage.setItem("wordData", JSON.stringify(updatedWordData));
    setShowEditModal(false);
  };

  return (
    <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-16 m-12">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4 ">
          <div className="border shadow-lg p-3">
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your Multiple Word Paste here....
              </label>
              <textarea
                id="Paste JSON type word from Chat-GPT"
                rows="10"
                required
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder={`Paste JSON type word from Chat GPT...like this..
    [
      {
        "serialNumber": "০০৬০",
        "banglaWord": "বাহির",
        "koreanWord": "밖"
      }
    ]
  `}
                onPaste={(event) => handleUpload(event)}
              ></textarea>

              <button
                onClick={handleUpload}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Upload
              </button>
              {showSuccessToast && (
                <div className="mt-2 text-green-500">Upload success!</div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          {showTable && (
            <div className="mt-4 border border-t-gray-400 p-1">
              <div className="flex items-center justify-center space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75">
                    Total-Word: {wordData.length}
                  </span>
                </button>
                <button
                  onClick={handleClear}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Clear Word : {wordData.length}
                </button>
                <button
                  onClick={handleUploadToMongoDB}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  disabled={uploadingToMongoDB}
                >
                  {uploadingToMongoDB ? "Uploading..." : "Upload In MongoDB"}
                </button>
              </div>

              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Serial Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Korean Word
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Bengali Word
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wordData.map(
                    ({ serialNumber, koreanword, banglaWord }, index) => (
                      <tr key={index} className="border-b dark:border-gray-700">
                        <td className="px-6 py-4">{serialNumber}</td>
                        <td className="px-6 py-4">{koreanword}</td>
                        <td className="px-6 py-4">{banglaWord}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              handleEdit(serialNumber, koreanword, banglaWord)
                            }
                            className="font-medium text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="bg-gray-500 opacity-75 fixed inset-0"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="text-center sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Edit Word
                  </h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Edit Word:
                      </label>
                      <input
                        type="text"
                        value={editWord}
                        onChange={(e) => setEditWord(e.target.value)}
                        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Edit Korean Word:
                      </label>
                      <input
                        type="text"
                        value={editKorean}
                        onChange={(e) => setEditKorean(e.target.value)}
                        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Edit Bengali Word:
                      </label>
                      <input
                        type="text"
                        value={editBangla}
                        onChange={(e) => setEditBangla(e.target.value)}
                        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleSaveEdit}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save Edit
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pasteword;
