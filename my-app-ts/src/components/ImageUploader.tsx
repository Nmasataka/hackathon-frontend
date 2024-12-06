import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Firebase設定ファイルをimport

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>(""); // アップロード状況
  const [imageUrl, setImageUrl] = useState<string>(""); // アップロード後のURL

  // ファイル選択
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // ファイルアップロード
  const handleUpload = async () => {
    if (!image) {
      alert("画像を選択してください！");
      return;
    }

    const storageRef = ref(storage, `uploads/${image.name}`); // "uploads" フォルダに保存
    setUploadStatus("アップロード中...");

    try {
      // Firebase Storage にアップロード
      await uploadBytes(storageRef, image);

      // アップロードしたファイルのURLを取得
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      setUploadStatus("アップロード成功！");
    } catch (error) {
      console.error("アップロードエラー:", error);
      setUploadStatus("アップロードに失敗しました。");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>アップロード</button>
      <p>{uploadStatus}</p>
      {imageUrl && (
        <div>
          <p>アップロードされた画像:</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
