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
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { addProduct } from "@/store/reducers/products/actions";
import supabase from "@/config/supabase";
import { v4 as uuidv4 } from 'uuid';

function NewProductDialog({ open, setOpen }: DialogProps) {
    const dispatch = useAppDispatch();

    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [thumb, setThumb] = useState<File | null>(null);
    const [alt, setAlt] = useState<string>('');

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        setLoading(true)

        if (name.trim() === '' || price.trim() === '' || description.trim() === '' || thumb === null || alt.trim() === '') {
            setError('All fields are required.');
            return;
        }

        const fileName = `${name}-${uuidv4()}`;

        const { error } = await supabase.storage
            .from('Posts')
            .upload(fileName, thumb)

        if (error) {
            return setError(error.message);
        }

        try {

            const { data } = supabase.storage
                .from('Posts')
                .getPublicUrl(fileName)

            dispatch(addProduct({
                name,
                price: Number(price),
                description,
                thumb: data.publicUrl,
                alt
            }));

            setName('');
            setPrice('');
            setDescription('');
            setThumb(null);
            setAlt('');

            setOpen(false);
        } catch (error) {
            setError('Error when uploading an image.');
        } finally {
            setLoading(false)
        }
    }

    const isBtnDisabled = name.trim() === '' || price.trim() === '' || description.trim() === '' || thumb === null || alt.trim() === '' || loading;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Enter a new product</DialogTitle>
                    <DialogDescription>
                        Fill the form below in order to create a new product.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="formName" className="text-right">
                            Name:
                        </Label>
                        <Input
                            type="text"
                            id="formName"
                            className="col-span-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="formPrice" className="text-right">
                            Price:
                        </Label>
                        <Input
                            type="number"
                            id="formPrice"
                            className="col-span-3"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="formDescription" className="text-right">
                            Description:
                        </Label>
                        <Textarea
                            id="formDescription"
                            className="col-span-3 h-20"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="formThumb" className="text-right">
                            Thumb:
                        </Label>
                        <Input
                            type="file"
                            id="formThumb"
                            className="col-span-3"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setThumb(e.target.files[0]);
                                }
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="formAlt" className="text-right">
                            Alt (Thumb description):
                        </Label>
                        <Input
                            type="text"
                            id="formAlt"
                            className="col-span-3"
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                        />
                    </div>
                    {error && <span className="text-right text-destructive">{error}</span>}
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={isBtnDisabled}>{loading ? 'Loading...' : 'Enter'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default NewProductDialog;
