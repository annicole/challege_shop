import React, { useState } from 'react';
import './App.css';
import {ProductList} from "./components/product-list";
import {Cart} from "./components/cart";
import 'h8k-components';

const title = "HackerShop";

export const PRODUCTS = [
    {
        id: 1,
        heading: "Cap - $10",
        name: "Cap",
        image: `/images/items/cap.png`,
        price: 10,
        cartQuantity:0
    },
    {
        id: 2,
        heading: "Hand Bag - $30",
        name: "HandBag",
        image: `/images/items/handbag.png`,
        price: 30,
        cartQuantity:0
    },
    {
        id: 3,
        heading: "Shirt - $30",
        name: "Shirt",
        image: `/images/items/shirt.png`,
        price: 30,
        cartQuantity:0
    },
    {
        id: 4,
        heading: "Shoes - $50",
        name: "Shoe",
        image: `/images/items/shoe.png`,
        price: 50,
        cartQuantity:0
    },
    {
        id: 5,
        heading: "Pant - $40",
        name: "Pant",
        image: `/images/items/pant.png`,
        price: 40,
        cartQuantity:0
    },
    {
        id: 6,
        heading: "Slipper - $20",
        name: "Slipper",
        image: `/images/items/slipper.png`,
        price: 20,
        cartQuantity:0
    }
];

function App() {
    const [cartState, setCartState] = useState({
        items: [],
        subTotal: 0,
        totalPrice: 0,
        discount: 0,
        selectedCoupon: '0'
    })
    
    const [products,setProducts] = useState([
        {
            id: 1,
            heading: "Cap - $10",
            name: "Cap",
            image: `/images/items/cap.png`,
            price: 10,
            cartQuantity:0
        },
        {
            id: 2,
            heading: "Hand Bag - $30",
            name: "HandBag",
            image: `/images/items/handbag.png`,
            price: 30,
            cartQuantity:0
        },
        {
            id: 3,
            heading: "Shirt - $30",
            name: "Shirt",
            image: `/images/items/shirt.png`,
            price: 30,
            cartQuantity:0
        },
        {
            id: 4,
            heading: "Shoes - $50",
            name: "Shoe",
            image: `/images/items/shoe.png`,
            price: 50,
            cartQuantity:0
        },
        {
            id: 5,
            heading: "Pant - $40",
            name: "Pant",
            image: `/images/items/pant.png`,
            price: 40,
            cartQuantity:0
        },
        {
            id: 6,
            heading: "Slipper - $20",
            name: "Slipper",
            image: `/images/items/slipper.png`,
            price: 20,
            cartQuantity:0
        }
    ])

    const addToCart = (product) => {
        const cartItem = {
            ...product,
            quantity: 1
        }

        const subTotal = cartState.subTotal + product.price;
        const discount = calculateDiscount(subTotal,Number(cartState.selectedCoupon))
        const totalPrice = subTotal - discount
        const cart = {
            ...cartState,
            items: cartState.items.concat([cartItem]),
            subTotal,
            discount,
            totalPrice
        }
        
        setCartState(cart)
        const newProducts = products.map(x=>{
            if(x.id === product.id) {
                x.cartQuantity = 1;
            }
            return x;
        });

        setProducts(newProducts)
    }

    const removeFromCart = (product) => {
        const subTotal = cartState.subTotal - product.price;
        const discount = calculateDiscount(subTotal,Number(cartState.selectedCoupon))
        const totalPrice = subTotal - discount
        const cart = {
            ...cartState,
            items: cartState.items.filter(cartItem => cartItem.id !== product.id),
            subTotal, 
            discount,
            totalPrice
        }
        
        setCartState(cart)

        const newProducts = products.map(x=>{
            if(x.id === product.id) {
                x.cartQuantity = 0;
            }
            return x;
        });

        setProducts(newProducts)
    }

    const handleChangeCoupon = (event) =>{
        const discount = calculateDiscount(cartState.subTotal,Number(event.target.value));
        const totalPrice = cartState.subTotal - discount
        const cart = {
            ...cartState,
            selectedCoupon:event.target.value,
            discount,
            totalPrice
        }
        setCartState(cart)
    }

    const calculateDiscount=(subTotal,discount)=>{
        return subTotal*(discount/100)
    }

    return (
        <div>
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row shop-component">
                <ProductList products={products} addToCart={addToCart} removeFromCart={removeFromCart}/>
                <Cart cart={cartState} handleChangeCoupon={handleChangeCoupon}/>
            </div>
        </div>
    );
}


export default App;
