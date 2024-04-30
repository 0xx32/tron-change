export const SuccessSreen = ({ orderId }: { orderId: string }) => {
    return (
        <div className="border border-1 border-white/20 p-4 rounded-md">
            <h1 className="text-center mb-8 text-2xl text-green-700">Оплата прошла успешно</h1>
            <p className="text-center mb-3 text-white/70">
                <b>Номер вашего заказа:</b>
                <span className="text-product"> {orderId}</span>
            </p>
            <p className="text-center">
                <span className="text-product">TRX</span> были зачислены на ваш адрес
            </p>
        </div>
    );
};
