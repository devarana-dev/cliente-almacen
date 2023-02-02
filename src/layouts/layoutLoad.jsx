export default function LayoutLoad({ children }) {

    return (
        <div className="p-5 text-dark text-center bg-white h-screen w-full flex">
            <div className="m-auto">
                {children}
            </div>
        </div>
    );

    
};
