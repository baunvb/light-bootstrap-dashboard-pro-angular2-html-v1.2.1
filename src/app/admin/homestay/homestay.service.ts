import { Injectable, Inject, Optional } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable} from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../interface/user';
import {Homestay} from '../interface/homestay';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HomestayService {

    private homestayApiUrl = 'http://localhost:4000/api/data';  // URL to web api

    constructor(
        private http: HttpClient) { }

    /** GET heroes from the server */
    getHomestay (): Observable<any> {
        return this.http.get(this.homestayApiUrl, {responseType: 'json'});

    }

   }
