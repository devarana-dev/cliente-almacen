
import { DeleteOutlined, FilePdfFilled } from '@ant-design/icons';
import { Image, Button } from 'antd';
import {useDropzone} from 'react-dropzone'



export const useUploadFile = (files, setFiles) => {

    
    const {getRootProps, getInputProps, isDragActive, fileRejections} = useDropzone({
        onDrop: (acceptedFiles, fileRejections) => {
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }))
            ]);
        
    },
    // accept images and pdf
    accept: {
        'image/*': ['.jpg', '.jpeg', '.png'],
        'application/pdf': ['.pdf']
    },
    // max file size 25MB
    maxSize: 25 * 1024 * 1024,
    validator: (file) => {
        if (file.size > 25 * 1024 * 1024) {
            return {
                code: 'file-too-large',
                message: 'El archivo es demasiado grande - 25MB max.'
            }
        }
        return null
        }
    });

    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    
    const thumbs = files.map((file, index) => (
        <div key={index} className='max-w-[81px]'>
            
        <div className="relative py-4">
        
            {
                file.type.match( /image\/(png|jpeg|jpg|gif)/ ) ?
                
                <Image
                src={file.preview}
                alt={file.name} 
                width={80}
                height={80}
                className="rounded-md object-contain"
                />
                :
                <div className="flex items-center justify-center rounded-md bg-gray-100" style={{
                    width: 80,
                    height: 87
                }}>
                        
                        <FilePdfFilled className='text-red-500 text-3xl'/>
                    </div>
            }
                
            
                <Button htmlType='button' className="bottom-0 left-0  absolute w-full" type="icon-secondary-new" onClick={
                    () => {
                        setFiles(files.filter(f => f.name !== file.name))
                    }
                }>
                    <DeleteOutlined />
                </Button>
            </div>
            <div className='text-xs font-extralight w-full'>
                {/* short name */}
                {/* {file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name} -  */}
                <p className='text-center py-1'>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
        </div>
    ));
        
    return {getRootProps, getInputProps, isDragActive, files, setFiles, thumbs, fileRejections, totalSize}
}

