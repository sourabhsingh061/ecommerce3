import { Component } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shooping-cart',
  templateUrl: './shooping-cart.component.html',
  styleUrls: ['./shooping-cart.component.css']
})
export class ShoopingCartComponent {


  cartItems: any[] = [];
  userId: number | null = null;
  message: string = '';
  

  constructor(private httpService: HttpServiceService, private router: Router) { }

  ngOnInit() {
    this.getUserId();
    this.loadCartItems();
  }

  getUserId() {
    const userId = localStorage.getItem('userId');
    this.userId = userId ? +userId : null; // Convert string to number
  }

  loadCartItems() {
    if (!this.userId) {
      this.message = 'User not logged in.';
      return;
    }

    this.httpService.get(`http://localhost:8080/Cart/user/${this.userId}`, (res: any) => {
      console.log('API Response:', res);
      if (res.success && res.result) {
        this.cartItems = [res.result.DATA];
      } else {
        this.message = 'No items found in the cart.';
      }
    });
  }

  removeItem(productId: number) {
    console.log("inside removeItem method")
    if (!this.userId) {
      this.message = 'User not logged in.';
      return;
    }
  
    const deleteUrl = `http://localhost:8080/Cart/delete/${productId}`;
  
    this.httpService.post(deleteUrl, {}, (res: any) => {
      if (res.success) {
        console.log('Item removed successfully.');
        // Remove the item from the cartItems array after successful deletion
        this.cartItems = this.cartItems.filter(item => item.productId !== productId);
        this.message = 'Item removed successfully.';
      } else {
        console.error('Failed to remove item from the cart.');
        this.message = 'Failed to remove item.';
      }
    });
  }
  

}