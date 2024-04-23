import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

import * as Select from 'components/ui/select';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { useGetRate } from 'hooks/useGetRate';
import { useFormSwap } from './useFormSwap';
import { FormDialog } from '../FormDialog';

const currencyList = ['RUB', 'USDT', 'ETH'];

export const FormSwap = () => {
    const [paymentCurrency, setPaymentCurrency] = useState(currencyList[0]);
    const { form, submitHandler, paymentModalState } = useFormSwap();
    const rateQuery = useGetRate({ currency: paymentCurrency });
    const amountTrx = form.watch('amount-trx');
    const paymentAmount = rateQuery.state?.course && amountTrx ? Math.round(+amountTrx * +rateQuery.state?.course) : '';

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
                        value={paymentAmount}
                        customInput={Input}
                        allowLeadingZeros
                        thousandSeparator=","
                        name="amount-to"
                        readOnly
                        placeholder="Примерная сумма к оплате"
                        onChange={() => {}}
                    />

                    {/* <span className="absolute top-1/2 translate-y-[-50%] right-4 text-product">USD</span> */}
                </label>

                <Select.Select onValueChange={setPaymentCurrency} defaultValue={currencyList[0]}>
                    <Select.SelectTrigger className="w-[100px] text-product">
                        <Select.SelectValue />
                    </Select.SelectTrigger>
                    <Select.SelectContent>
                        {currencyList.map((currency) => (
                            <Select.SelectItem key={currency} value={currency}>
                                {currency}
                            </Select.SelectItem>
                        ))}
                    </Select.SelectContent>
                </Select.Select>
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
