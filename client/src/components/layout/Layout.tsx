import { Button } from '../ui/button';

export const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="layout pt-20 px-10 h-screen">
        {children}
        <div className="flex justify-end absolute bottom-10 right-10">
            <a href="https://t.me/ahhiweb" target="_blank">
                <Button variant="link">Поддержка</Button>
            </a>
        </div>
    </div>
);
