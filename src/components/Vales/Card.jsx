export default function Card({fn, icon, text, count, color}) {

    const gradient = `bg-gradient-to-tr from-${color} to-${color}-lighter`;

    return (
        <>
        <div className="from-info to-info-lighter hidden" /> 
        <div className="from-dark to-dark-lighter hidden" /> 
        <div className="from-warning to-warning-lighter hidden" /> 
        <div className="from-primary to-primary-lighter hidden" /> 
        
        <div className="p-1 sm:p-5 shadow-md bg-white rounded-sm col-span-1 cursor-pointer" onClick={ fn }>
            <div className="flex sm:justify-between justify-center flex-wrap gap-x-5">
                <div className={`text-white ${gradient} sm:w-16 sm:h-16 w-12 h-12 -mt-10 p-4 rounded-md shadow align-middle flex`}>
                    <div className="text-base sm:text-3xl  w-full justify-center flex m-auto">
                        {icon}
                    </div>
                </div>
                    <div className="sm:text-right text-center sm:py-0 pt-2">
                    <p className="text-custom-dark2 font-light sm:text-base text-sm">{text}</p>
                    <p className="lg:text-2xl text-lg text-custom-dark">{count || 0}  </p>
                </div>
            </div>
        </div>
        </>
    )
    
};
