export default function Card({fn, icon, text, count, color}) {

    return (

        <div className="p-1 sm:p-5 shadow-md bg-white rounded-sm col-span-1 cursor-pointer" onClick={ fn }>
            <div className="flex sm:justify-between justify-center flex-wrap gap-x-5">
                <div className={`text-white bg-gradient-to-tr from-${color} to-${color}-lighter sm:w-16 sm:h-16 w-12 h-12 -mt-10 p-4 rounded-md shadow align-middle flex`}>
                    <div className="text-base sm:text-3xl  w-full justify-center flex m-auto">
                        {icon}
                    </div>
                </div>
                    <div className="sm:text-right text-center sm:py-0 pt-2">
                    <p className="text-custom-dark2 font-light sm:text-base text-sm">{text}</p>
                    <h1 className="lg:text-2xl text-lg text-custom-dark">{count}</h1>
                </div>
            </div>
        </div>
    )
    
};
