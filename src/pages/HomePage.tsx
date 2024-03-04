import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Card, NewProductDialog } from "@/components";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useState } from "react";

function HomePage() {
    const USER_DATA = useAppSelector(state => state.auth.user);
    const PRODUCTS = useAppSelector(state => state.products.products);

    const [productModal, setProductModal] = useState(false);

    function toggleProductModal() {
        setProductModal(!productModal);
    }

    return (
        <main>
            <section className="py-8 bg-zinc-100 text-center flex items-center justify-center shadow">
                <h2 className="border-b pb-2 text-3xl font-semibold">{USER_DATA ? `Welcome back, ${USER_DATA.username}!` : 'Be welcome 😊'}</h2>
            </section>

            <section className="py-8 px-4 lg:px-0 max-w-[60rem] m-auto flex flex-col">
                {!USER_DATA && PRODUCTS.length >= 1 && <h3 className="text-2xl font-semibold mb-4">Most recent added products</h3>}

                {USER_DATA && (
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                        <h3 className="text-2xl font-semibold">Most recent added products</h3>

                        <Button variant={'outline'} onClick={toggleProductModal}>
                            <PlusCircledIcon className="mr-2 h-4 w-4" />
                            New product
                        </Button>
                    </div>
                )}

                {PRODUCTS.length < 1 && (
                    <div className="text-center bg-muted py-4 rounded shadow">
                        <p className="font-semibold">There are no products available yet. Try to login/register and add some! 👈</p>
                    </div>
                )}

                {PRODUCTS.length >= 1 && (
                    <div className="flex items-center gap-6 flex-wrap">
                        {PRODUCTS.map(product => (
                            <Card
                                key={product.id}
                                id={product.id}
                                title={product.name}
                                alt={product.alt}
                                price={product.price}
                                thumb={product.thumb}
                            />
                        ))}
                    </div>
                )}
            </section>

            <NewProductDialog open={productModal} setOpen={setProductModal} />
        </main>
    )
}

export default HomePage;
