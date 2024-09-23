import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  endpoint = "http://localhost:8080/Product/search";
  categoriesEndpoint = "http://localhost:8080/Product/preload";
  form: any = {
    data: {},
    pageNo: 0,
    searchParams: { name: '', category: '' },
    list: [],
    categories: [],
    next: 0
  };
  inputerror: { [key: string]: string } = {};
  message = '';
  userId: number | null = null;

  constructor(private httpService: HttpServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadCategories();
    this.search();
    this.getUserId(); // Retrieve user ID on initialization
  }

  loadCategories() {
    this.httpService.get(this.categoriesEndpoint, (res: any) => {
      if (res.result && res.result.categories) {
        this.form.categories = res.result.categories;
        console.log("form.category", this.form.categories);
      }
    });
  }

  getUserId() {
    const userId = localStorage.getItem('userId'); // Update to match your storage key
    console.log('Retrieved userId from localStorage:', userId); // Debug log
    this.userId = userId ? +userId : null; // Convert string to number
  }
  

  search() {
    const searchParams = {
      name: this.form.searchParams.name.trim(),
      category: this.form.searchParams.category
    };

    this.httpService.post(this.endpoint + "/" + this.form.pageNo, searchParams, (res: any) => {
      if (res.result.inputerror) {
        this.inputerror = res.result.inputerror;
      }
      if (res.result.DATA) {
        this.form.list = res.result.DATA;
        this.form.nextList = res.result.nextList;
      }
    });
  }

  viewDetails(productId: number) {
    console.log('View details for product ID:', productId);
  }

  addToCart(productId: number) {
    if (!this.getUserId) {
      console.error('User not logged in');
      return;
    }

    const payload = {
      userId: this.userId,      // User ID from local storage
      productId: productId,     // The ID of the product to be added to the cart
      quantity: 1                // Default quantity set to 1
    };

    this.httpService.post("http://localhost:8080/Cart/add", payload, (res: any) => {
      if (res.success) {
        
        console.log('Product added to cart:', res.data);
        // Optionally, you could show a success message or navigate to the cart
      } else {
        console.error(res.message); // Handle error case
      }
    });
  }

  previousPage() {
    if (this.form.pageNo > 0) {
      this.form.pageNo--;
      this.search();
    }
  }

  nextPage() {
    this.form.pageNo++;
    this.search();
  }
}
