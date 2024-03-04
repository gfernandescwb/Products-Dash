import { DialogProps } from "@/@types/models/DialogProps";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setUser } from "@/store/reducers/auth/actions";
import { useState } from "react";

function LoginDialog({ open, setOpen }: DialogProps) {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [loginError, setLoginError] = useState<string | null>(null);

    function handleSubmit() {
        if (email === 'admin@admin.com' && password === 'admin') {
            dispatch(setUser({
                username: 'Admin',
                email: email
            }));

            setOpen(false);
        } else {
            setLoginError('Invalid e-mail or password.');
        }
    }

    const isLoginDisabled = email.trim() === '' || password.trim() === '';

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                        Fill the form below to be logged in.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="formEmail" className="text-right">
                            E-mail:
                        </Label>
                        <Input 
                            type="email" 
                            id="formEmail" 
                            className="col-span-3" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="formPassword" className="text-right">
                            Password:
                        </Label>
                        <Input 
                            type="password" 
                            id="formPassword" 
                            className="col-span-3" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    {loginError && <span className="text-right text-destructive">{loginError}</span>}
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={isLoginDisabled}>Enter</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog;
