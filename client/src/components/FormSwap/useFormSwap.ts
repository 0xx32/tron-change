import { useState } from 'react';
import { toast } from 'sonner';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { AxiosError, AxiosResponse } from 'axios';

import { FormSwapType, formSwapSchema } from './FormSwap.schema';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/requests/orders';

export const useFormSwap = () => {
    const [paymentModalShow, setPaymentModalShow] = useState(false);

    const [paymentLink, setPaymentLink] = useState('');

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
            toast.error(err.response?.data.message, { description: 'Введите адрес кошелька TRX' });
        },
        onSuccess({ data }: AxiosResponse<CreateOrderResponse>) {
            toast.success(data.message);
            setPaymentModalShow(true);
            setPaymentLink(data.paymentUrl);
        },
    });

    const submitHandler: SubmitHandler<FormSwapType> = async (value) => {
        await createOrderMutattion.mutateAsync({
            address: value.address,
            amount: +value['amount-trx'],
            currency: 'TRX',
            network: 'tron',
        });
    };

    return {
        form,
        submitHandler,
        mutatuion: {
            createOrderMutattion,
        },
        paymentModalState: {
            paymentModalShow,
            paymentLink,
            setPaymentModalShow,
        },
    };
};
