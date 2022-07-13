import { Button, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react";

export default function UploadFile(params) {
    
    const { route } = params

    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    setUploading(true); // You can use any AJAX library you like

    fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

    return(
        <div className="flex flex-col content-center">
            <p className="text-sm text-dark py-2 text-center"> * Solo acepta archivos Excel *  </p>
            <Upload {...props} accept="application/vnd.ms-excel">
                <Button icon={<UploadOutlined />}>Selecciona Archivo</Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
            >
                {uploading ? 'Cargando' : 'Comenzar Carga'}
            </Button>
        </div>
    )
};
