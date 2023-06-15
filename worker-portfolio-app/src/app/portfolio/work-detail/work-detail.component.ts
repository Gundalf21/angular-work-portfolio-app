import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.css']
})
export class WorkDetailComponent implements OnInit   {

  currentWork = null;
  message = '';

  hidden:boolean = false;

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  @ViewChild('inputImg') inputImg: ElementRef;
    @ViewChild('img') img: ElementRef;

  constructor(
    private portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.message = '';
    this.getWork(this.route.snapshot.paramMap.get('id'));
  }

  getWork(id): void {
    this.portfolioService.get(id)
      .subscribe(
        data => {
          this.currentWork = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {

    const data = {
      published:status
    };

    this.portfolioService.update(this.currentWork.id, data)
      .subscribe(
        response => {
          this.currentWork.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  showData() {
    console.log('el is not hidden');
    return (!this.hidden);
  }
  hideData() {
    console.log('el was hidden');
    return (this.hidden);
  }

  updateWork(): void {

    if(_.isEmpty(this.currentWork.workName) || _.isEmpty(this.currentWork.clientName) ||_.isEmpty(this.currentWork.description)) {
      this.toastr.error("","Fields can't be empty",{timeOut:2500,progressBar:true,closeButton:true})
      return;
    }

    if(this.imageError) {
      this.toastr.error(this.imageError,"Upload Image Error",{timeOut:2500,progressBar:true,closeButton:true})
      return;
    }

    const data = {
      workName: this.currentWork.workName,
      clientName: this.currentWork.clientName,
      description: this.currentWork.description,
      image:this.cardImageBase64
    };

    this.portfolioService.update(this.currentWork.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.toastr.success("Entry Updated","Success",{timeOut:2500,progressBar:true,closeButton:true})
          this.message = 'Entry updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteWork(): void {
    this.portfolioService.delete(this.currentWork.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/works']);
        },
        error => {
          console.log(error);
        });
  }


   //@ts-ignore
   fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 51200;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is 50KB';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            //@ts-ignore
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    this.img.nativeElement.src = imgBase64Path;

                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);

    }
}

remove(){
  this.inputImg.nativeElement.value = '';
  this.img.nativeElement.src='';
}

}
