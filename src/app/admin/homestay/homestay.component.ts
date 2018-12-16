import { Component, OnInit } from '@angular/core';
import {HomestayService} from './homestay.service';
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs/Observable';
import {User} from '../interface/user';

@Component({
  selector: 'app-homestay',
  templateUrl: './homestay.component.html',
  styleUrls: ['./homestay.component.scss']
})
export class HomestayComponent implements OnInit {
  title: User;
  constructor(private homestayService: HomestayService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {

      this.homestayService.getData().subscribe(
          data => {
              console.log(data);
              this.title = data;
          }
      );
  }
}
