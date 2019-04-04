import {Injectable} from '@angular/core';
import {User} from '../models/user.model.client';
import {HttpClient, HttpResponse} from '@angular/common/http';
import 'rxjs';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


@Injectable()
export class UserService {
    constructor(private _http: HttpClient) {}

    baseUrl = environment.baseUrl;


    users = [
        new User('001', 'alice', 'alice', 'Alice', 'Wonder', '123@gmail.com'),
        new User('002', 'bob', 'bob', 'Bob', 'Carley', '456@neu.edu')
    ];

    api = {
        'createUser' : this.createUser,
        'findUserById' : this.findUserById,
        'findUserByUsername' : this.findUserByUserName,
        'findUserByCredentials' : this.findUserByCredentials,
        'updateUser': this.updateUser,
        'deleteUser': this.deleteUser
    };

    createUser(user: User) {
        return this._http.post(this.baseUrl + '/api/user', user);
    }

    findUserById(userId: string): Observable<User> {
        return this._http.get<User>(this.baseUrl + '/api/user/' + userId);
    }

    findUserByUserName(username: string) {
        return this._http.get(this.baseUrl + '/api/user?' + 'username=' + username);
    }

    findUserByCredentials(username: string, password: string): Observable<User> {
        return this._http.get<User>(this.baseUrl + '/api/user?' + 'username=' + username + '&' + 'password=' + password);
    }

    updateUser(userId: string, user: User) {
        return this._http.put(this.baseUrl + '/api/user/' + userId, user);
    }

    deleteUser(userId: string) {
        return this._http.delete(this.baseUrl + '/api/user/' + userId);
    }
    // createUser(user: User): Observable<User[]> {
    //     return this._http.post<User[]>(this.baseUrl + '/api/user/', JSON.stringify(user)).pipe(
    //         catchError((error: any) => Observable.throw(error))
    //     );
    // }
    //
    // findUserById(userId: string): Observable<User> {
    //     return this._http.get<User>(this.baseUrl + '/api/user/' + userId).pipe(
    //         catchError((error: any) => Observable.throw(error))
    //     );
    // }
    //
    // findUserByUserName(username: string): Observable<User> {
    //     return this._http.get<User>(this.baseUrl + '/api/user').pipe(
    //         catchError((error: any) => Observable.throw(error))
    //     );
    // }
    //
    // findUserByCredentials(username: string, password: string): Observable<User>{
    //     return this._http.get<User>(this.baseUrl + '/api/user').pipe(
    //         catchError((error: any) => Observable.throw(error))
    //     );
    // }
    //
    // updateUser(userId: string, user: User): Observable<User[]>{
    //     return this._http.put<User[]>(this.baseUrl + '/api/user/' + userId, JSON.stringify(user)).pipe(
    //         catchError((error: any) => Observable.throw(error))
    //     );
    // }
    //
    // deleteUser(userId: string): Observable<User[]> {
    //     return this._http.delete<User[]>(this.baseUrl + '/api/user').pipe(
    //         catchError((error: any) => Observable.throw(error))
    //     );
    // }
}
