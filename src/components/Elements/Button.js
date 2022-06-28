export default function Button({children, btnType, className, type, fn, ...props}) {

    const btnClasses = (btnType) => {
        switch (btnType) {
            case '':
                
                break;
        
            default:
                break;
        }
    }

    return (
        <button 
            className={`py-2 px-4 rounded-lg text-white hover:opacity-80 ${className}`} 
            type={type} 
            onClick={fn} 
            >
                { children } 
        </button>
    )
};
