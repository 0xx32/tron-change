import { Dialog, DialogContent, DialogHeader, DialogTitle, Button } from '@/components/ui';
import { usePaymentMethod } from './usePaymentMethod';
import { STATIC_PATH } from '@/constants/api';

interface PaymentMethodDialogProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    onClick: (method: PaymentMethodType) => void;
}
export const PaymentMethodDialog = ({ isVisible, setIsVisible, onClick }: PaymentMethodDialogProps) => {
    const { state, query } = usePaymentMethod();

    if (!state.paymentMethods || !query.isFetched) return null;

    return (
        <Dialog open={isVisible} onOpenChange={setIsVisible}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">Выберете способ оплаты</DialogTitle>
                </DialogHeader>
                <div className="flex gap-4">
                    {state.paymentMethods.map((item) => (
                        <Button
                            disabled={!item.enabled}
                            key={item.id}
                            variant="outline"
                            className="py-4 h-auto w-full flex items-center gap-4"
                            onClick={() => onClick(item.type)}
                        >
                            <i>
                                <img width={30} height={30} src={`${STATIC_PATH}${item.logo}`} className="rounded-md" />
                            </i>
                            <div>{item.name}</div>
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};
