import '../../assets/scss/downloadButton.scss'

const Download = ({fn}) => {
    return ( <>
    <div className="download-button" onClick={fn}>
        <div className="download-button-wrapper">
        <div className="text">Descargar</div>
            <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17">
                </path>
            </svg>
            </span>
        </div>
    </div>
</> );
}
 
export default Download;