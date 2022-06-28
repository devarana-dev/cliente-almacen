import Box from "../../components/Elements/Box";
import Button from "../../components/Elements/Button";

export default function Login() {
    return (
        <>
        <h1 className="text-center text-3xl font-bold text-white m-auto">App</h1>
        <Box className="w-full max-w-screen-sm bg-transparent mb-10 mx-auto text-center">
            <Button className="bg-white text-dark block mx-auto"> Entrar con Google </Button>
        </Box>
        </>
    )
};
