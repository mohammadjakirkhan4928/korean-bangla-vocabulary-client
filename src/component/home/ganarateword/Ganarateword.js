import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../../shared/loader/Loader";
import useTitle from "../../../shared/usetitle/useTitle";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Ganarateword = () => {
  useTitle("Generate Pdf");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isPDFGenerated, setIsPDFGenerated] = useState(false);

  const itemsPerPage = 10;
  const {
    data: wordsData,
    isLoading,
    isError,
    refetch,
  } = useQuery(["words", currentPage, searchTerm], fetchWords);

  async function fetchWords() {
    const response = await fetch(
      `https://koran-bangla-word-book.vercel.app/allwords?page=${currentPage}&q=${searchTerm}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch words");
    }
    const data = await response.json();
    return data;
  }

  const totalWordsCount = wordsData?.totalCount || 0;
  localStorage.setItem("totalWordsCount", totalWordsCount.toString());

  const filteredWords = wordsData?.words.filter((word) => {
    const koreanWord = (word.koreanWord || "").toLowerCase();
    const banglaTranslation = (word.banglaTranslation || "").toLowerCase();
    const query = searchTerm.toLowerCase();
    return koreanWord.includes(query) || banglaTranslation.includes(query);
  });

  const totalPages = wordsData?.totalCount
    ? Math.ceil(wordsData.totalCount / itemsPerPage)
    : 0;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const generatePDF = () => {
    setIsGeneratingPDF(true);
    if (!wordsData) return;

    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate Blob URL for the PDF
      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;
      link.download = "word_list.pdf";

      // Trigger a click event on the anchor element to start the download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      setIsGeneratingPDF(false);
      setIsPDFGenerated(true);
      setTimeout(() => {
        setIsPDFGenerated(false);
      }, 5000); // Hide the success message after 5 seconds
    });
  };

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <div className="flex justify-center items-center h-full">
        Error fetching data
      </div>
    );

  return (
    <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-16 m-12">
      {" "}
      <button
        type="button"
        onClick={generatePDF}
        disabled={isGeneratingPDF}
        className="btn md:w-full bg-gray-800 text-white font-bold"
      >
        {isGeneratingPDF ? "Generating PDF..." : "Generate PDF"}
      </button>
      <div>
        <div className="flex justify-center items-center h-full">
          <div className="p-12">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Serial No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Bangla Word
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Korean Translation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWords &&
                    filteredWords.map((word, index) => (
                      <tr key={index} className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {index + 1 + (currentPage - 1) * itemsPerPage}
                        </th>
                        <td className="px-6 py-4"> {word.koreanWord}</td>
                        <td className="px-6 py-4"> {word.banglaTranslation}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex justify-center  mb-4">
                <div className="flex flex-col items-center ">
                  <span className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-semibold text-gray-900 ">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-gray-900 ">
                      {Math.min(
                        currentPage * itemsPerPage,
                        wordsData.totalCount
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {wordsData.totalCount}
                    </span>{" "}
                    Entries
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0 gap-20">
                    <button
                      className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900  ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <svg
                        className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 5H1m0 0 4 4M1 5l4-4"
                        />
                      </svg>
                      Prev
                    </button>
                    <button
                      className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <svg
                        className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ganarateword;
