import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getUserAction } from '../../actions/authActions';
import Box from "../../components/Elements/Box";
import { AntdNotification } from '../../components/Elements/Notification';

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
        <div className='m-auto bg-glassmorphism p-3 rounded-md'>
            <h1 className="text-center text-3xl font-bold  m-auto drop-shadow-lg text-light " >Sistema de Gestión de Obra</h1>
            <Box className="w-full max-w-screen-sm bg-transparent mb-10 mx-auto text-center">
                <Button type='primary' onClick={redirectToGoogleSSO}> Entrar con Google </Button>
            </Box>
        </div>
        </>
    )
};
