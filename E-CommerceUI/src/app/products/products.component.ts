import { Component } from '@angular/core';
import { AuthInterceptorService } from '../services/auth-interceptor.service';
import { HttpServiceService } from '../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  endpoint = "http://localhost:8080/Product";
  form: any = {
    data: {},
    error: false,
    id:'',
    name: '',
    description: '',
    price: '',
    dateOfPurchase: '',
    category: '',
    message: ''
  };

  inputerror: { [key: string]: string } = {}; // Define inputerror with appropriate typing
  message = '';

  constructor(private authService: AuthInterceptorService, private httpService: HttpServiceService, private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe((params: any) => {
      this.form.data.id = params["id"];
      console.log(this.form.data.id)
    })
  }
  selectedFile: File | null = null;

  ngOnInit(): void { }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];

  }
  onSubmit() {
    var self = this;
    this.httpService.post(this.endpoint + "/save", this.form.data, function (res: any) {
      self.inputerror = {};

      // Handle input errors
      if (res.result.inputerror) {
        self.inputerror = res.result.inputerror;
        self.message = ""; // Clear success message if there are input errors
        return; // Exit early if there are input errors
      }

      // Handle success case
      if (res.result.DATA) {
        //self.form.data = res.result.DATA;
        self.form.data.id=res.result.DATA;
        self.form.message = "Product added successfully!"; // Set success message
        console.log("id " , res.result.id)
        if (self.selectedFile) {
          self.uploadImage(res.result.id);
        }
      } else {
        // Handle failure case when `res.success` is false or `res.result.data` is null
        self.form.message = "Failed to add product.";

      }
    });
  }
  uploadImage(id: number) {
    const formData = new FormData();
    // formData.append('file', this.selectedFile);

    if (this.selectedFile == null) {
      console.error('No file selected for upload.');
      return;
    } else {
      formData.append('file', this.selectedFile);
    }

    this.http.post(`http://localhost:8080/Product/profile/` + this.form.data.id, formData).subscribe(
      (response: any) => {
        if (response.success) {
          this.form.message = 'Product and image added successfully!';
        }
      },
      (error) => {
        console.error('Error uploading image:', error);
        this.form.message = 'Product added but image upload failed.';
      }
    );
  }


}
