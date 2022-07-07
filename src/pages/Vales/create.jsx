import { Steps, Form  } from 'antd';
import { useState } from 'react';
import CreateValesSalida1 from './create_step_one';

const CreateValesSalida = () => {

    const { Step } = Steps;

    const [current, setCurrent] = useState(0);

    const handleSubmit = () => {
        console.log('submit')
    }
    return ( 
        <div className="max-w-2xl w-full mx-auto">
            <h1 className="text-center text-2xl font-bold text-dark pb-10">Vale de salida</h1>

            <Steps current={current} className="pb-10 text-base" responsive={false} >
                <Step title="Información General" />
                <Step title="Añadir Materiales"  />
                <Step title="Finalizar"  />
            </Steps>


            <Form 
                autoComplete='off' 
                onFinish={handleSubmit}
                layout="vertical"
            >
                {
                    current === 0 ?
                        <CreateValesSalida1 current={current} setCurrent={setCurrent}/>
                    : current === 1 ?
                        <CreateValesSalida1 />
                    : current === 2 ?
                        <CreateValesSalida1 />
                    : null

                }
            </Form>
        </div>
    );
}
 
export default CreateValesSalida;