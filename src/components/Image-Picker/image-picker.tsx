"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import classes from "./image-picker.module.css";
type ImagePickerProps = {
  label: string;
  name: string;
};
export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const imageInput = useRef<HTMLInputElement>({} as HTMLInputElement);

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event?.target?.files?.[0]; // nullish coalescing operator
    // here there will be only one file

    if (!file) {
      // if no file is selected
      setPickedImage(null); // set pickedImage to null (RESET)
      return;
    }

    const fileReader = new FileReader(); // create a new file reader

    fileReader.onload = () => {
      // when file is loaded
      setPickedImage(fileReader.result); // set pickedImage to the result of the file reader
      // we will reach here only when the file is loaded successfully
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage as string}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name} // name of the input field help with the form submission
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
