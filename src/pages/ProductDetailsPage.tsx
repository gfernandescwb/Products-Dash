import { useAppSelector } from "@/hooks/useAppSelector"
import { getThumbOrFallback } from "@/lib/utils";
import { useParams } from "react-router-dom"

function ProductDetailsPage() {
    const PRODUCTS = useAppSelector(state => state.products.products)

    const { id } = useParams();

    const specificProduct = PRODUCTS.find(p => p.id === id);

    return (
        <main className="lg:max-w-[60rem] lg:my-4 lg:mx-auto lg:p-0 flex flex-col-reverse gap-4 p-4 md:flex-row md:justify-between">
            {specificProduct && (
                <>
                    <section className="md:w-[40%] lg:w-[50%]">
                        <h2 className="border-b pb-2 text-4xl font-semibold mb-4">{specificProduct.name}</h2>

                        <p>{specificProduct?.description}</p>

                        <h3 className="text-3xl border-t pt-2 mt-2 font-semibold block md:hidden">{specificProduct?.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </section>

                    <section className="md:w-[50%] lg:w-[40%]">
                        <img
                            className="w-full h-full lg:h-[40rem] object-cover object-center rounded shadow mb-2"
                            src={getThumbOrFallback(specificProduct.thumb)}
                            alt={specificProduct?.alt}
                            title={specificProduct.alt}
                        />

                        <h3 className="text-3xl font-semibold hidden md:block">{specificProduct?.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </section>
                </>
            )}
        </main>
    )
}

export default ProductDetailsPage
