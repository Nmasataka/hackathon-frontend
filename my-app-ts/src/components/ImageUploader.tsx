import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Firebase設定ファイル
import { Box, Button, Typography,Avatar } from "@mui/material";

interface ImageUploaderProps {
    uid: string | null;
    onUploadComplete: (url: string) => void; // アップロード完了時のコールバック
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ uid, onUploadComplete }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadCompleted, setUploadCompleted] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // プレビュー用URLを生成
            setUploadCompleted(false);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        try {
            const storageRef = ref(storage, `user_icons/${uid}_${selectedFile.name}`);
            await uploadBytes(storageRef, selectedFile);
            const downloadUrl = await getDownloadURL(storageRef);
            onUploadComplete(downloadUrl); // 親コンポーネントにURLを渡す
            setUploadCompleted(true);
            alert("画像のアップロードが完了しました！");
        } catch (error) {
            console.error("画像のアップロード中にエラーが発生しました:", error);
            alert("画像のアップロードに失敗しました。");
        } finally {
            setUploading(false);
            setSelectedFile(null);
        }
    };

    return (
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography variant="body2" color="textSecondary">
                アイコン画像を選択してください
            </Typography>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "block", margin: "10px auto" }}
            />
            {previewUrl && (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 2 }}>
                    <Avatar
                        src={previewUrl}
                        alt="Avatar Preview"
                        sx={{
                            width: 100,
                            height: 100,
                            marginBottom: 2,
                            border: "2px ",
                        }}
                    />
                </Box>
            )}
            <Button
                variant={selectedFile && !uploading ? "contained" : "outlined"}
                color="primary"
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                sx={{ marginTop: 1 }}
            >
                {uploading ? "アップロード中..." : "アップロード"}
            </Button>
        </Box>
    );
};

export default ImageUploader;




