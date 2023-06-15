import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-work-add',
  templateUrl: './work-add.component.html',
  styleUrls: ['./work-add.component.css']
})
export class WorkAddComponent implements OnInit {



  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  @ViewChild('inputImg') inputImg: ElementRef;

  work = {
    workName: '',
    clientName: '',
    description: '',
    image:'',
    published: false
  };
  submitted = false;

  constructor(private portfolioService: PortfolioService,
    private toastr:ToastrService) {}

  ngOnInit(): void {

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
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

  saveWork(): void {

      if(_.isEmpty(this.work.workName) || _.isEmpty(this.work.clientName) ||_.isEmpty(this.work.description)) {
        this.toastr.error("","Fields can't be empty",{timeOut:2500,progressBar:true,closeButton:true})
        return;
      }

      if(this.imageError) {
        this.toastr.error(this.imageError,"Upload Image Error",{timeOut:2500,progressBar:true,closeButton:true})
        return;
      }


    const data = {
      workName: this.work.workName,
      clientName: this.work.clientName,
      description: this.work.description,
      image:this.cardImageBase64
    };

    console.log(data)

    this.portfolioService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
  }

  newWork(): void {
    this.submitted = false;
    this.work = {
      workName: '',
      clientName: '',
      description: '',
      image:'',
      published: false,
    };
  }

  remove(){
    this.inputImg.nativeElement.value = '';
  }
}
