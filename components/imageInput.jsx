import Image from "next/image";
import { useState } from "react";
import { BiImage } from "react-icons/bi";
const ImageInput = ({ title, variant, alt, onSelect }) => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const bufferReader = new FileReader();

    reader.onload = (e) => {
      setImage(reader.result);
    };

    bufferReader.onload = (e) => {
      onSelect(bufferReader.result);
    };

    reader.readAsDataURL(file);
    bufferReader.readAsArrayBuffer(file);
  };

  return (
    <div
      className={`hover p-[30px] border-purple ${
        variant === "filled" ? "bg-purple" : "bg-white"
      } border-[1px] rounded-[4px] relative items-center flex justify-center cursor-pointer`}
    >
      <input
        onChange={handleChange}
        type="file"
        className=" flex-1 absolute w-full h-full opacity-0 z-10"
      />
      <div
        className={`flex flex-col min-h-[120px] ${
          variant === "filled" ? "text-white" : "text-purple"
        } items-center justify-between space-y-[30px] flex-nowrap`}
      >
        {image && (
          <Image
            fill
            alt={alt}
            src={image}
            style={{
              objectFit: "contain",
            }}
          />
        )}
        {!image && (
          <>
            <BiImage size={72} />
            <div>{title}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
