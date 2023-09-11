"use client";
import { useState } from "react";
import imglyRemoveBackground from "@imgly/background-removal";
import Image from "next/image";

export default function InputFile() {
  const [img, setImg] = useState<string>("");

  const [file, setFile] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFile(file);
    setLoading(true);

    setImg(URL.createObjectURL(file));
    const blob = new Blob([file], { type: "image/jpeg" });

    imglyRemoveBackground(blob)
      .then((blob: Blob) => {
        setImg(URL.createObjectURL(blob));
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  const downloadImage = () => {
    const a = document.createElement("a");
    a.href = img;
    a.download = file?.name ?? "image.png";
    a.click();
  };

  const handleOpenFolder = () => {
    const input = document.querySelector("#input-img") as HTMLInputElement;
    input?.click();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl md:text-6xl font-bold text-white">
        Quita el fondo a las imágenes
      </h1>
      <div className="mt-10">
        <input
          type="file"
          className="hidden"
          onChange={handleInputFile}
          id="input-img"
        />
        <button
          className="bg-white py-3 px-5 rounded-full font-bold"
          onClick={handleOpenFolder}
        >
          Cargar imagen
        </button>
        {img && (
          <div className="bg-white md:w-[400px] md:h-[400px] p-5 m-auto mt-10 rounded">
            {loading ? (
              <div className="relative items-center block max-w-sm p-6 rounded-lg shadow-md">
                <Image
                  src={img}
                  alt=""
                  width={200}
                  height={200}
                  className="w-full h-full object-fit text-center opacity-20"
                />

                <div
                  role="status"
                  className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 flex flex-col items-center"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                  <span>Procesando imagen...</span>
                </div>
              </div>
            ) : (
              <div className="w-80 h-80 m-auto">
                <Image
                  src={img}
                  alt=""
                  width={200}
                  height={200}
                  className="w-full h-full object-fit text-center"
                />
              </div>
            )}
          </div>
        )}
      </div>
      {!loading && img && (
        <button
          className="bg-blue-500 py-3 text-white px-5 rounded-full font-bold mt-5"
          onClick={downloadImage}
        >
          Descargar
        </button>
      )}
    </div>
  );
}
