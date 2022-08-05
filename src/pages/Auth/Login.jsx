import { useDispatch, useSelector } from 'react-redux'
import { getUserAction } from '../../actions/authActions';
import { AntdNotification } from '../../components/Elements/Notification';
import {FcGoogle} from 'react-icons/fc'
import Logotipo from "../../assets/img/Logotipo Devarana_blanco.png"

export default function Login() {

    const dispatch = useDispatch()

    const {errors} = useSelector( state => state.auth )

    const redirectToGoogleSSO = async ()  => {
        const googleLoginUrl = `${process.env.REACT_APP_URL}/login`
        const newWindow = window.open(googleLoginUrl, "_blank", "width=500,height=600")

        if(newWindow){
            const timer = setInterval(() => {
                if(newWindow.closed){
                    dispatch(getUserAction())
                    if(timer){
                        clearInterval(timer)
                    }
                }
            }, 500)
        }
    }

    return (
        <>
        {errors ?  <AntdNotification type='error' description={errors} /> : null }
        <div className='mx-auto p-3 rounded-md align-middle h-screen flex flex-col px-5'>
            <img src={Logotipo} className="max-w-xs w-full mx-auto my-auto drop-shadow"/>
            <button 
                className='flex items-center rounded-3xl border text-dark font-bold px-4 py-1 bg-white justify-center my-auto mx-auto
                hover:opacity-70' 
                onClick={redirectToGoogleSSO}>  
                <FcGoogle className='mx-2 text-lg'/> Continuar con Google 
            </button>
        </div>
        </>
    )
};
