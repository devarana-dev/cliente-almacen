import { Button, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadMassiveInsumo } from "../../actions/insumoActions";

export default function UploadFile(params) {
    
    // const { route, fn, uploading } = params

    const { upload, uploadState, uploadMessage, uploadedCount} = useSelector(state => state.insumos)

    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
        formData.append('insumos', file);
    });
    dispatch(uploadMassiveInsumo(formData))
  };


  const uploadedState = () => {
    
    if(uploadState === 'error'){
        message.error(uploadMessage)
    }
    if(uploadState === 'success'){
        message.success(uploadedCount + ' ' + uploadMessage)
        setFileList([])
    }

    setUploading(upload);
  }

    useEffect(() => {
        uploadedState()
    }, [upload])

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
    progress: {
        strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068'
        },
        strokeWidth: 3,
        format: (percent) => `${percent}%`
    }
  };

    return(
        <div className="flex flex-col content-center">
            <p className="text-sm text-dark py-2"> * Solo acepta archivos cvs *  </p>
            {/* acceptar solo csv */}
            <Upload {...props} accept=".csv">
                <Button icon={<UploadOutlined />}> Selecciona Archivo</Button>
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
