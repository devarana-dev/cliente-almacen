
import { DeleteOutlined, FilePdfFilled } from '@ant-design/icons';
import { Image, Button } from 'antd';
import {useDropzone} from 'react-dropzone'



export const useUploadFile = (files, setFiles, options = {}) => {

    const { 
        maxFiles, 
        fileTypes = [
        'image/png', 
        'image/jpeg',
        'image/jpg',
        'application/pdf'
        ]
    } = options;
    
    const {getRootProps, getInputProps, isDragActive, fileRejections} = useDropzone({
        onDrop: (acceptedFiles, fileRejections) => {
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }))
            ]);
        
    },
    maxFiles: maxFiles,    
    validator: (file) => {

        const errors = [];

        // max size
        if (file.size > 25 * 1024 * 1024) {
            errors.push({
                code: 'file-too-large',
                message: 'El archivo es demasiado grande - 25MB max.'
            })
        }

        // file type
        if (!fileTypes.includes(file.type)) {
            errors.push({
                code: 'file-type-not-allowed',
                message: 'El tipo de archivo no es permitido'
            })
        }

        // max files
        if (maxFiles && files.length >= maxFiles) {
            errors.push({
                code: 'too-many-files',
                message: 'Demasiados archivos'
            })
        }

        return errors.length ? errors : null;
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
                <p className='text-center py-1'>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
        </div>
    ));
        
    return {getRootProps, getInputProps, isDragActive, files, setFiles, thumbs, fileRejections, totalSize}
}

