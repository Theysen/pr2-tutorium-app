import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SlotService {

  uri: String = environment.baseAPIUrl + '/slots';

  constructor(private http: HttpClient) {}

  getIndex() {
    return this.http.get(`${this.uri}`);
  }
}
