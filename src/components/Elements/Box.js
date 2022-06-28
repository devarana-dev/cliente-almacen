const Box = (props) => {
    return ( 
        <div id={props.id} className={`p-5 shadow-ext bg-white rounded ${props.className ? props.className : ""}` }>
            {props.children}
        </div>
     );
}
 
export default Box;