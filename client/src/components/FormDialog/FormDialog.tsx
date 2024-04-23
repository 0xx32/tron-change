import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '../ui/button';

interface FormDialogProps {
    link: string;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

export const FormDialog = ({ link, isVisible }: FormDialogProps) => {
    return (
        <Dialog open={isVisible}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">Перейти к оплате</DialogTitle>
                    <DialogDescription>
                        После обработки платежа, TRX сразу же зачислиться на ваш адрес
                    </DialogDescription>
                </DialogHeader>

                <a href={link}>
                    <Button variant="outline" className="w-full">
                        Оплатить
                    </Button>
                </a>
            </DialogContent>
        </Dialog>
    );
};
