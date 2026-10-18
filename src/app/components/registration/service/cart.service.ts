import { Injectable } from '@angular/core';
import { Product, ProductType } from '../product/model/product.model';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cart: any[] = [];

    constructor() {
        this.loadCart();
    }

    loadCart() {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            const savedItems = JSON.parse(savedCart);
            this.cart = savedItems.filter((item: any) => {
                return !this.isChildEntryTicket(item.product) ||
                    this.hasAdultEntryTicket(savedItems);
            });
            if (this.cart.length !== savedItems.length) {
                this.saveCart();
            }
        }
    }

    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.cart));
    }

    addToCart(product: any): boolean {
        this.loadCart();
        if (this.isChildEntryTicket(product) && !this.hasAdultEntryTicket(this.cart)) {
            return false;
        }

        // Check if the product already exists in the cart
        const existingProduct = this.cart.find((item: any) => item.product.id === product.id);
        console.log('existingProduct', existingProduct);

        if (existingProduct) {
            existingProduct.quantity += product.quantity; // Increment quantity if the product exists
        } else {
            // Add new product with a quantity from product object
            this.cart.push({ product, quantity: product.quantity });
        }

        // Update the cart in localStorage
        localStorage.setItem('cartItems', JSON.stringify(this.cart));
        return true;
    }

    removeFromCart(productId: number): boolean {
        this.loadCart();
        const removedParentTicket = this.cart.some((item: any) =>
            item.product.id === productId && this.isAdultEntryTicket(item.product)
        );
        this.cart = this.cart.filter((item: any) => item.product.id !== productId);
        const removedChildTicket = removedParentTicket &&
            this.cart.some((item: any) => this.isChildEntryTicket(item.product));
        if (removedChildTicket) {
            this.cart = this.cart.filter((item: any) => !this.isChildEntryTicket(item.product));
        }
        this.saveCart();
        return removedChildTicket;
    }

    isChildEntryTicket(product: any): boolean {
        const name = this.normalizeProductName(product?.name);
        return name.includes('kannada rajyotsava 2026 - entry ticket (0y-10y)');
    }

    hasAdultEntryTicket(items: any[] = this.cart): boolean {
        return items.some((item: any) => this.isAdultEntryTicket(item.product));
    }

    private isAdultEntryTicket(product: any): boolean {
        const name = this.normalizeProductName(product?.name);
        return name.includes('kannada rajyotsava 2026 - entry (10y+)');
    }

    private normalizeProductName(name: unknown): string {
        return typeof name === 'string' ? name.toLowerCase().replace(/^#+\s*/, '').trim() : '';
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    getCart() {
        this.loadCart();
        return this.cart;
    }

    getCartTotal() {
        this.loadCart();
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItemCount(): number {
        this.loadCart();
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    getGroupedCartItems() {
        this.loadCart();
        const groupedItems: { [key: number]: { product: Product; quantity: number } } = {};

        this.cart.forEach((item: any) => {
            const productId = item.product.id;
            if (!groupedItems[productId]) {
                groupedItems[productId] = {
                    product: item.product,
                    quantity: 0
                };
            }
            groupedItems[productId].quantity += item.quantity;
        });

        return Object.values(groupedItems);
    }


    calculateCartTotal() {
        return this.getGroupedCartItems().reduce((total, item) => {
            const price = parseFloat(item.product.price); // Use the price property directly
            return total + (price * item.quantity);
        }, 0).toFixed(2);
    }

    // Get cart items by product type
    getCartItemsByType(productType: ProductType): any[] {
        this.loadCart();
        return this.cart.filter((item: any) => {
            const hasMatchingType = item.product.attributes?.some(
                (attr: any) =>
                    attr.name.toLowerCase() === "product_type" &&
                    attr.options.some((option: string) => option.toLowerCase() === productType)
            );
            return hasMatchingType;
        });
    }

    // Get the total cost of cart items by product type
    getCartTotalByType(productType: ProductType): number {
        const filteredItems = this.getCartItemsByType(productType);
        return filteredItems.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }

    // Get the total quantity of cart items by product type
    getCartItemCountByType(productType: ProductType): number {
        const filteredItems = this.getCartItemsByType(productType);
        return filteredItems.reduce((total, item) => total + item.quantity, 0);
    }
}
