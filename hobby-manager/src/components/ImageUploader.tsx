import { FC, useState } from "react";

export interface ImageControl {
  imageValue: string;
  setImageValue: (newValue: string) => void;
}

export const useImageInput = (
  initialValue: string,
): ImageControl => {
  const [imageValue, setImageValue] = useState<string>(initialValue);

  return {
    imageValue,
    setImageValue,
  };
};

const ImageUploader: FC<{ controller: ImageControl }> = ({ controller }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (loadEvent) => {
        // const base64Data = reader.result as string;
        const base64Data = loadEvent.target?.result as string;
        
        controller.setImageValue(base64Data);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="image upload" className="form-label">Upload Image</label>
      <input
        id="image upload"
        className="form-control"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleImageUpload}
      />
      {controller.imageValue && (
        <div>
          <h2>Uploaded Image:</h2>
          <img className="img-fluid img-thumbnail" src={controller.imageValue} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;