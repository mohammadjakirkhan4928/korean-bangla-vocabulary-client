import React from "react";

const Grammar = () => {
  const grammarData = [
    {
      name: "grammar 1",
      image_url: "https://i.ibb.co/Gkfgxy5/IMG-20240229-WA0007.jpg",
    },
    {
      name: "grammar 2",
      image_url: "https://i.ibb.co/JBL3S0G/IMG-20240229-WA0006.jpg",
    },
    {
      name: "grammar 3",
      image_url: "https://i.ibb.co/HFz9Sn2/IMG-20240229-WA0005.jpg",
    },
    {
      name: "grammar 4",
      image_url: "https://i.ibb.co/y8t0RSM/IMG-20240229-WA0004.jpg",
    },
    {
      name: "grammar 5",
      image_url: "https://i.ibb.co/MpCMrmB/IMG-20240229-WA0003.jpg",
    },
    {
      name: "grammar 6",
      image_url: "https://i.ibb.co/W2tpK9f/IMG-20240229-WA0001.jpg",
    },
  ];

  const handleDownload = async (url) => {
    try {
      // Fetch image data
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a temporary URL for the blob object
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "image.jpg"; // You can set the filename here
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };


  return (
    <section className="py-6 bg-gray-100 text-gray-900">
      <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
        {grammarData.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full rounded shadow-sm min-h-48 bg-gray-500 aspect-square"
            />
            <button
              className="absolute bottom-2 right-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded"
              onClick={() => handleDownload(item.image_url)}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Grammar;
