export default function Card({fn, icon, text, count, color, size = 'md'}) {

    const gradient = `bg-gradient-to-tr from-${color} to-${color}-lighter`;

    return (
        <>
        <div className="from-info to-info-lighter hidden" /> 
        <div className="from-dark to-dark-lighter hidden" /> 
        <div className="from-warning to-warning-lighter hidden" /> 
        <div className="from-primary to-primary-lighter hidden" />
        <div className="from-orange to-orange-lighter hidden" />
        <div className="from-secondary to-secondary-lighter hidden" />
        
        <div className="p-1 sm:p-4 shadow-md bg-white rounded-sm col-span-1 cursor-pointer" onClick={ fn }>
            <div className="flex sm:justify-between justify-center flex-wrap gap-x-5 content-center">
                <div className={`text-white ${gradient} ${ size === 'md'? 'sm:w-16 sm:h-16 w-12 h-12' : 'sm:w-12 sm:h-12 w-8 h-8' } -mt-10 p-4 rounded-md shadow align-middle flex`}>
                    <div className={`w-full justify-center flex m-auto items-center`}>
                        {icon}
                    </div>
                </div>
                    <div className="sm:text-right text-center sm:py-0 pt-2">
                    <p className={`text-custom-dark2 font-light ${ size === 'md' ? 'sm:text-base text-sm' : 'sm:text-sm text-xs'} `}>{text}</p>
                    <p className={`${ size === 'md' ? 'lg:text-2xl text-lg' : 'lg:text-xl text-base'}  text-custom-dark`}>{count || 0}  </p>
                </div>
            </div>
        </div>
        </>
    )
    
};
