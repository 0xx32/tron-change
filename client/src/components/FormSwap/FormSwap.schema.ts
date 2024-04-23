import * as v from 'valibot';

export const formSwapSchema = v.object({
    'amount-trx': v.string([v.minLength(1, 'Необходимо указать количество TRX')]),
    address: v.string([v.minLength(1, 'Адрес не может быть пустым')]),
});

export type FormSwapType = v.Input<typeof formSwapSchema>;
