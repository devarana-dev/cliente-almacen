
import { DeleteOutlined } from '@ant-design/icons';
import { Image, Button } from 'antd';
import {useDropzone} from 'react-dropzone'



export const useUploadFile = (files, setFiles) => {

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: acceptedFiles => {
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }))
            ]);
    
        },
        // accept images and pdf
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png'],
            'application/pdf': ['.pdf']
        }
    })

    const thumbs = files.map(file => (
        <div key={file.name}>
          <div className="relative py-4">
                <Image
                    src={file.preview}
                    alt={file.name} 
                    width={150}
                    height={150}
                    className="rounded-md object-contain"
                    // Revoke data uri after image is loaded
                    // onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
                <Button className="bottom-0 left-0  absolute w-full" type="icon-secondary-new" onClick={
                    () => {
                        setFiles(files.filter(f => f.name !== file.name))
                    }
                }>
                    <DeleteOutlined />
                </Button>
          </div>
        </div>
    ));

    return {getRootProps, getInputProps, isDragActive, files, setFiles, thumbs}
}

