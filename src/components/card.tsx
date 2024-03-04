import { useAppSelector } from "@/hooks/useAppSelector";
import { getThumbOrFallback } from "@/lib/utils";
import { Button } from "./ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { EditProductDialog } from ".";

type CardProps = {
    id: string;
    thumb: string;
    title: string;
    price: number;
    alt: string;
}

function Card({ thumb, title, price, alt, id }: CardProps) {
    const USER_DATA = useAppSelector(state => state.auth.user)

    const [edit, setEdit] = useState(false);

    function toggleEdit() {
        setEdit(!edit);
    }

    return (
        <div className="w-full h-[18rem] lg:w-[18.75rem] lg:h-[18.75rem] rounded border-border shadow-md overflow-hidden transition-all hover:scale-105">
            <header className="h-[70%]">
                <a href={`/products/${id}`}>
                    <img
                        loading="lazy"
                        className="w-full h-full object-cover"
                        src={getThumbOrFallback(thumb)}
                        alt={alt}
                        title={alt}
                    />
                </a>
            </header>

            <nav className="p-4">
                {!USER_DATA && (
                    <a href={`/products/${id}`}>
                        <h3 className="font-semibold mb-2 line-clamp-1">{title}</h3>
                    </a>
                )}

                {USER_DATA && (
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <a href={`/products/${id}`}>
                            <h3 className="font-semibold mb-2 line-clamp-1">{title}</h3>
                        </a>

                        <Button size={'icon'} variant={'ghost'} onClick={toggleEdit}>
                            <Pencil2Icon className="h-4 w-4" /> 
                        </Button>
                    </div>
                )}

                <p className="text-sm text-muted-foreground">{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </nav>

            <EditProductDialog open={edit} setOpen={setEdit} id={id} />
        </div>
    )
}

export default Card;
