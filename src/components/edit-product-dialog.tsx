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
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { removeProduct, updateProduct } from "@/store/reducers/products/actions";
import { useAppSelector } from "@/hooks/useAppSelector";
import supabase from "@/config/supabase";
import { toast } from "sonner";

type EditDialogProps = DialogProps & { id: string }

function EditProductDialog({ open, setOpen, id }: EditDialogProps) {
    const dispatch = useAppDispatch();
    const PRODUCTS = useAppSelector(state => state.products.products);

    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    function handleSubmit() {
        if (name.trim() === '' || price.trim() === '' || description.trim() === '') {
            setError('All fields are required.');
            return;
        }

        dispatch(updateProduct({
            id,
            updatedFields: {
                description,
                name,
                price: Number(price)
            }
        }));

        setOpen(false);
    }

    async function deleteProduct() {
        setLoading(true);

        try {
            const specificProduct = PRODUCTS.find(p => p.id === id)

            if (specificProduct) {
                const { error } = await supabase.storage
                .from('Posts')
                .remove([specificProduct.thumb])

                if (error) {
                    return setError(error.message);
                }

                dispatch(removeProduct(id));
                toast('Product deleted successfully!', { position: 'top-right', duration: 1200 });
            }
        } catch(error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    } 

    useEffect(() => {
        const fillFormFields = () => {
            const specificProduct = PRODUCTS.find(p => p.id === id)

            if (specificProduct) {
                setName(specificProduct.name);
                setPrice(String(specificProduct.price));
                setDescription(specificProduct.description);
            }
        }

        fillFormFields();
    }, [PRODUCTS]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit an existing product</DialogTitle>
                    <DialogDescription>
                        Fill the form below in order to edit an existing product.
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
                    {error && <span className="text-right text-destructive">{error}</span>}
                </div>
                <DialogFooter>
                    <Button type="button" disabled={loading} variant={"destructive"} onClick={deleteProduct}>{loading ? 'Deleting...' : 'Delete'}</Button>
                    <Button type="submit" onClick={handleSubmit}>Edit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditProductDialog;
