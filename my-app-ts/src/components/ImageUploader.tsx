import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Firebaseの設定ファイルからstorageを取得

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string>("");

  // ファイル選択時の処理
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // ファイルアップロード処理
  const handleUpload = async () => {
    if (!selectedFile) return alert("ファイルを選択してください");

    const storageRef = ref(storage, `images/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    // アップロード状況の監視
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress)); // 進捗状況を丸めて表示
      },
      (error) => {
        console.error("アップロード中にエラーが発生しました:", error);
        alert("アップロードに失敗しました");
      },
      async () => {
        // アップロード完了時にダウンロードURLを取得
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setDownloadURL(url);
          alert("アップロード成功！");
        } catch (error) {
          console.error("ダウンロードURL取得中にエラーが発生しました:", error);
        }
      }
    );
  };

  return (
    <div>
      <h2>画像アップロード</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        アップロード
      </button>
      <div>アップロード進行状況: {uploadProgress}%</div>
      {downloadURL && (
        <div>
          <p>ダウンロードURL:</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            {downloadURL}
          </a>
          <img src={downloadURL} alt="Uploaded" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;


