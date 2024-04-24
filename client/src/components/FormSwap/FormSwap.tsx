import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';

import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { useGetRate } from 'hooks/useGetRate';
import { useFormSwap } from './useFormSwap';
import { FormDialog } from '../FormDialog';

export const FormSwap = () => {
    const [paymentAmount, setPaymentAmount] = useState(0);
    const { form, submitHandler, paymentModalState } = useFormSwap({ paymentAmount: paymentAmount });
    const rateQuery = useGetRate({ currency: 'USD' });
    const amountTrx = form.watch('amount-trx');

    useEffect(() => {
        if (!rateQuery.state?.course) return;

        const paymentAmount = amountTrx ? Math.round(+amountTrx * +rateQuery.state?.course) : '';

        setPaymentAmount(+paymentAmount);
    }, [rateQuery.state?.course, amountTrx]);

    return (
        <form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col gap-8 ">
            <div className="text-right text-xs text-red-400 -mb-2">
                Текущий курс TRX ~ {rateQuery.state?.course} {rateQuery.state?.to}
            </div>

            <div className="relative">
                <Input
                    type="number"
                    placeholder="Введите нужное количество TRX"
                    {...form.register('amount-trx', { required: true })}
                />
                <span className="absolute top-1/2 translate-y-[-50%] right-4 text-product">TRX</span>
                <p className="text-xs text-red-800/70 absolute left-2 -bottom-5 z-10">
                    {form.formState.errors['amount-trx']?.message}
                </p>
            </div>

            <div className="flex gap-2">
                <label className="relative w-full">
                    <NumericFormat
                        value={paymentAmount === 0 ? '' : paymentAmount}
                        customInput={Input}
                        allowLeadingZeros
                        thousandSeparator=","
                        readOnly
                        placeholder="Примерная сумма к оплате"
                    />

                    <span className="absolute top-1/2 translate-y-[-50%] right-4 text-green-600">USD</span>
                </label>
            </div>

            <div className="w-full relative ">
                <Input type="text" placeholder="Введите адрес tron" {...form.register('address', { required: true })} />
                <p className="text-xs text-red-800/70 absolute left-2 -bottom-5 z-10">
                    {form.formState.errors.address?.message}
                </p>
            </div>

            <div className="flex flex-col gap-4 border border-1 p-4 pl-3 rounded-md">
                <p className="text-white/60 text-xs">- Курс зафиксируется при оплате</p>
                <p className="text-white/60 text-xs">- Курс зафиксируется при оплате</p>
            </div>

            <div>
                <Button disabled={false} className="w-full" variant={'accent'} type="submit">
                    Обменять
                </Button>
            </div>

            <FormDialog
                isVisible={paymentModalState.paymentModalShow}
                setIsVisible={paymentModalState.setPaymentModalShow}
                link={paymentModalState.paymentLink}
            />
        </form>
    );
};
