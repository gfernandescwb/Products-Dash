import { useState } from "react";

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

import { DialogProps } from "@/@types/models/DialogProps";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setUser } from "@/store/reducers/auth/actions";

function SignupDialog({ open, setOpen }: DialogProps) {
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit() {
        if (username.trim() !== "" && email.trim() !== "") {
            dispatch(
                setUser({
                    username: username,
                    email: email,
                })
            );

            setOpen(false);
        }
    }

    const isSignupDisabled = username.trim() === '' || email.trim() === '' || password.trim() === '';

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sign up</DialogTitle>
                    <DialogDescription>
                        Fill the form below and create your account.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="formUsername" className="text-right">
                            Username:
                        </Label>
                        <Input
                            id="formUsername"
                            className="col-span-3"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
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
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={isSignupDisabled}>
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default SignupDialog;
