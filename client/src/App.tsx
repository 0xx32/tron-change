import { FormSwap } from 'components/FormSwap';
import { Layout } from 'components/layout';

export const App = () => {
    return (
        <div className="content  h-screen">
            <Layout>
                <div className="pt-10">
                    <h1 className="text-center mb-10 text-3xl">Tron change</h1>
                    <div className="max-w-[600px] mx-auto">
                        <FormSwap />
                    </div>
                </div>
            </Layout>
        </div>
    );
};
