import { useDispatch, useSelector } from 'react-redux'
import { getUserAction } from '../../actions/authActions';
import { AntdNotification } from '../../components/Elements/Notification';
import {FcGoogle} from 'react-icons/fc'
import Logotipo from "../../assets/img/LogoAzulDevaranaG.png"

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
            <img src={Logotipo} className="max-w-md w-full px-2 m-auto drop-shadow" alt='Logo Devarana'/>
            <button 
                className='flex items-center rounded-3xl border 
                text-dark font-bold px-4 py-1 bg-white justify-around  m-auto mt-5 shadow-md hover:opacity-70' 
                onClick={redirectToGoogleSSO}>  
                <FcGoogle className='mx-2 text-lg'/> Ingresar con Google 
            </button>
        </div>
        </>
    )
};
