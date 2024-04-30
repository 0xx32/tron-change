import { FormSwap } from 'components/FormSwap';
import { Layout } from 'components/layout';
import { SuccessSreen } from '@/components/SuccessScreen';


export const App = () => {
    const serchParams = new URLSearchParams(window.location.search);
    const orderId = serchParams.get('order_id');

    return (
        <div className="content  h-screen">
            <Layout>
                <div className="pt-10">
                    <h1 className="text-center mb-10 text-3xl">Tron change</h1>
                    <div className="max-w-[540px] mx-auto">
                        {!orderId && <FormSwap />}
                        {orderId && <SuccessSreen orderId={orderId} />}
                        {/* <ErrorScreen /> */}
                    </div>
                </div>
            </Layout>
        </div>
    );
};
