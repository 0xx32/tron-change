import { useState } from 'react';
import { toast } from 'sonner';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { AxiosError, AxiosResponse } from 'axios';

import { FormSwapType, formSwapSchema } from './FormSwap.schema';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/requests/orders';

export const useFormSwap = ({ paymentAmount }: { paymentAmount: number }) => {
    const [paymentModalShow, setPaymentModalShow] = useState(false);
    const [paymenMethodModalShow, setPaymentMethodModalShow] = useState(false);

    const form = useForm<FormSwapType>({
        resolver: valibotResolver(formSwapSchema),
        mode: 'onBlur',
        defaultValues: {
            address: 'TG29SVZYLgYtZPPjkE43oWYhrNyy8QcjZP',
        },
    });

    const createOrderMutattion = useMutation({
        mutationKey: ['create-order'],
        mutationFn: (params: CreateOrderDto) => createOrder({ params }),
        onError(err: AxiosError<{ message: string }>) {
            toast.error(err.response?.data.message);
        },
        onSuccess({ data }: AxiosResponse<CreateOrderResponse>) {
            toast.success(data.message);
            setPaymentModalShow(false);
            form.reset();
            window.open(data.paymentUrl, '_blank');
        },
    });

    const submitHandler: SubmitHandler<FormSwapType> = async () => {
        setPaymentMethodModalShow(true);
    };

    const createOrderHandler = (paymentMethod: PaymentMethodType) => {
        const values = form.getValues();
        createOrderMutattion.mutate({
            address: values.address,
            amount: +values['amount-trx'],
            paymentAmount: paymentAmount,
            currency: 'TRX',
            network: 'tron',
            paymentMethod,
        });
    };

    return {
        form,
        submitHandler,
        mutatuion: {
            createOrderMutattion,
        },
        functions: {
            createOrderHandler,
        },
        paymentModalState: {
            isShow: paymentModalShow,
            setShow: setPaymentModalShow,
        },
        paymenMethodModaState: {
            isShow: paymenMethodModalShow,
            setShow: setPaymentMethodModalShow,
        },
    };
};
