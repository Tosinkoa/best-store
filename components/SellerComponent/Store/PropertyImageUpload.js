import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";

const PropertyImageUpload = () => {
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);

  useEffect(() => {
    if (imagesToUpload.length > 0) {
      const newUrls = imagesToUpload
        .filter((eachImage) => {
          return !imagesUrl.some((existingImage) => existingImage.id === eachImage.id);
        })
        .map((eachImage) => ({
          id: eachImage.id,
          theImageUrl: URL.createObjectURL(eachImage.imageSrc),
        }));
      setImagesUrl((prev) => [...prev, ...newUrls]);
    }
  }, [imagesToUpload, imagesUrl]);

  const imageUploadOnchangHandler = (e) => {
    setImagesToUpload((prev) => [
      ...prev,
      {
        id: prev.length === 0 ? 1 : prev[prev.length - 1].id + 1, // Get last id and add one to id if item exist in array
        imageSrc: e.target.files[0],
      },
    ]);
  };

  const removeImage = (index) => {
    // Filter out the image with its id from imagesUrl
    const newImagesUrl = imagesUrl.filter((image) => image.id !== index);
    // Filter out the image with its id from imagesToUpload
    const newImagesToUpload = imagesToUpload.filter((image) => image.id !== index);

    // Update state with the new arrays
    setImagesUrl(newImagesUrl);
    setImagesToUpload(newImagesToUpload);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full lg:gap-4 gap-2 place-items-center mx-auto">
        {imagesUrl?.length > 0 &&
          imagesUrl.map((eachImageUrl) => (
            <div key={eachImageUrl.id} className="md:h-36  w-[95%] h-40  relative rounded-md">
              <div
                onClick={() => removeImage(eachImageUrl.id)}
                className="absolute cursor-pointer text-2xl font-light flex text-secondary-50 bg-black bg-opacity-75 right-2 top-2 rounded-full  h-8 w-8 items-center place-content-center  z-10 rotate-45 transform"
              >
                <p className="mb-1.5">+</p>
              </div>
              <Image src={eachImageUrl.theImageUrl} objectFit="cover" layout="fill" alt="users-profile" className="rounded-md" />
            </div>
          ))}
        {imagesUrl.length < 9 && imagesUrl.length !== 8 && (
          <div className="text-5xl relative md:h-36 md:w-40 w-full h-40 my-auto bg-secondary-300 border rounded-md flex place-content-center">
            <input type="file" onChange={imageUploadOnchangHandler} className="absolute inset-0 md:h-36 md:w-40 w-full h-40 opacity-0" accept="image/*" />
            <RiImageAddLine className="m-auto" />
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyImageUpload;
