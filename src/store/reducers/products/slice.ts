import { v4 as uuidv4 } from 'uuid';
import { Product } from "@/@types/models/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateProps {
    products: Product[]
}

const INITIAL_STATE: StateProps = {
    products: []
}

export const productsSlice = createSlice({
    name: "products",
    initialState: INITIAL_STATE,
    reducers: {
        addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
            const newProduct: Product = {
                id: uuidv4(),
                ...action.payload
            };
            state.products.push(newProduct);
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateProduct: (state, action: PayloadAction<{ id: string, updatedFields: Omit<Product, 'id' | 'thumb' | 'alt'> }>) => {
            const { id, updatedFields } = action.payload;
            let productToUpdate = state.products.find(product => product.id === id);

            if (productToUpdate) {
                productToUpdate.name = updatedFields.name
                productToUpdate.description = updatedFields.description
                productToUpdate.price = updatedFields.price
            }
        }
    }
})