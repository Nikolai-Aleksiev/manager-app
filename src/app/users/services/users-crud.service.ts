import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Jsonp, Http, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { State, process, orderBy, filterBy } from '@progress/kendo-data-query';

@Injectable()
export class EditService extends BehaviorSubject<any> {
    constructor(private http: Http) {
        super({});
    }

    private serviceUrl: string = 'http://localhost:8080/users';

    public read(state?: State) {

        let pageString: string = "?page=" + state.skip / state.take + "&size=" + state.take;
        let sortString: string = "";

        // I have provided support for multi sort but set the template to single sort because 
        // I couldn't get it to work with the back-end. Perhaps I didn't get the syntax right

        if (state.sort && state.sort.length > 0) {
            for (let sortItem of state.sort) {

                if (sortItem.dir !== undefined) {
                    sortString = sortString + "&sort=" + sortItem.field + "," + sortItem.dir;

                }
            }
        }

        let getUrl = this.serviceUrl + pageString + sortString;

        return this.http
            .get(getUrl)
            .subscribe(response => {
                super.next(response.json());
            });
    }

    public save(data: any, isNew?: boolean, state?: State) {
        if (isNew) {

            return this.http.post(this.serviceUrl, data).subscribe(() => this.read(state), () => this.read(state));
        }
        else {

            return this.http.put(this.serviceUrl, data).subscribe(() => this.read(state), () => this.read(state));
        }
    }

    public remove(data: any, state?: State) {
        return this.http.delete(this.serviceUrl + "/" + data.id).subscribe(() => this.read(state), () => this.read(state));
    }

}
