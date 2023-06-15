import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Work } from './work.model';
import * as _ from 'lodash';

const baseUrl = 'http://localhost:8080/api/works';

@Injectable({
  providedIn: 'root'
})


export class ImageStorageService {

  imageListKeyValue:UploadImage[] = [];

  getImageById(id:number){
    _.find(this.imageListKeyValue, {id});
  }

  addImageToStorage(image:UploadImage){
    this.imageListKeyValue.push(image);
  }

}

interface UploadImage{
id:number,
path:string
}
