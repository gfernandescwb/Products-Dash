import { useState } from "react";
import { LoginDialog } from ".";
import { Button } from "./ui/button";
import SignupDialog from "./signup-dialog";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/store/reducers/auth/actions";

function MainHeader() {
    const USER_DATA = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(false);

    function toggleLoginDialog() {
        setLogin(!login);
    }

    function toggleSignupDialog() {
        setSignUp(!signUp);
    }

    function userLogout() {
        dispatch(logout())
    }

    return (
        <header className="p-4 bg-zinc-50 shadow">
            <nav className="flex flex-col gap-4 md:flex-row items-center md:justify-between">
                <a href="/" className="select-none">
                    <h1 className="text-4xl lg:text-5xl font-extrabold">MockShop</h1>
                </a>

                {USER_DATA ? (
                    <ul className="flex items-center gap-6">
                        <li>
                            <span className="font-semibold">{USER_DATA.username}</span>
                        </li>
                        <li>
                            <Button variant={"outline"} onClick={userLogout}>Logout</Button>
                        </li>
                    </ul>
                ) : (
                    <ul className="flex items-center gap-6">
                        <li>
                            <a href="#">
                                <Button onClick={toggleLoginDialog}>Login</Button>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <Button onClick={toggleSignupDialog} variant={"link"}>Sign up</Button>
                            </a>
                        </li>
                    </ul>
                )}
            </nav>

            <LoginDialog open={login} setOpen={setLogin} />
            <SignupDialog open={signUp} setOpen={setSignUp} />
        </header>
    )
}

export default MainHeader;
