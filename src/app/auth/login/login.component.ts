import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, finalize, takeUntil, tap } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginRequest } from '../ModelsAuth/login-request';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../ServicesAuth/auth-service.service';
import { UpdateContextDtoService } from 'src/app/services/update-context-dto-service';
import Swal from 'sweetalert2';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    isLoggedIn$!: Observable<boolean>;
    errors: any = [];
    existSecretCode: boolean = false;
    loginRequest!: LoginRequest;
    submitted = false;
    messageErreur = false;
    motdepasseinvalid = false;
    err: any;
    message: any;
    token: any;

    private unsubscribe: Subject<any>;
    private returnUrl: any;
    rememberMe: boolean = false;

    constructor(private layoutService: LayoutService,
        private router: Router,
        private auth: AuthServiceService,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
        public _updateContextDtoService: UpdateContextDtoService
    ) {
        this.unsubscribe = new Subject();
    }

    ngOnInit(): void {
        this.initLoginForm();
        console.log("prod Branch");
    }

    initLoginForm() {
        this.loginForm = this.fb.group({
            email: [DEMO_PARAMS.EMAIL, Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(320)
            ])
            ],
            password: [DEMO_PARAMS.PASSWORD, Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)
            ])
            ],
            code: [''],
        });
    }

    submit() {
        this.messageErreur = false;
        this.motdepasseinvalid = false;
        const controls = this.loginForm.controls;
        /** check form */
        console.log(this.loginForm);
        if (this.loginForm.invalid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        this.loading = true;

        const authData = {
            email: controls['email'].value,
            password: controls['password'].value,
            secretCode: controls['code'].value

        };
        console.log("Data for login ", authData)
        console.log("secret code");
        if (this.existSecretCode == false) {
            authData.secretCode = null;
        }
        console.log(authData.secretCode);
        console.log("auth data:");
        console.log(authData);
        console.log("DATA--------------");
        this.loginRequest = new LoginRequest(authData.email, authData.password, authData.secretCode);
        console.log("login request :");
        console.log(this.loginRequest);
        this.auth.login(this.loginRequest)
            .pipe(
                tap(user => {
                    console.log("user-------", user)
                    this._updateContextDtoService.setUserCurrent(user)
                    if (this._updateContextDtoService.getuserCureent().userProfile != null) {
                        console.log("_getuserCureent", this._updateContextDtoService.getuserCureent().userProfile)
                        localStorage.setItem("currency", this._updateContextDtoService.getuserCureent().userProfile.amountFormat);
                    }


                    if (user) {
                        var a = 1;
                        console.log("user")
                        console.log("user---------" + user.hasAsp);
                        localStorage.setItem("username", controls['email'].value);
                        console.log("userJwt---------" + user.jwt);
                        console.log(" token---------" + "token")
                        localStorage.setItem("token", user.jwt);
                        localStorage.setItem("refreshToken", user.refreshToken);
                        localStorage.setItem("timersession", JSON.stringify(user.timersession));
                        localStorage.setItem("opentabs", a.toString());
                        console.log("timer session :", localStorage.getItem("timersession"))
                        console.log(localStorage.getItem("token"));
                        //this.token=localStorage.getItem("token");

                        this.token = localStorage.getItem("token");
                        if (user.hasAsp == true) {
                            //  	this.router.navigateByUrl('asp');
                            localStorage.setItem("hasAsp", 'true');


                        }
                        else {
                            localStorage.setItem("hasAsp", 'false');

                        }
                        //   else{
                        //  	this.router.navigateByUrl(this.returnUrl);
                        //  	console.log("url-------",this.returnUrl)
                        //    }
                        this.router.navigateByUrl('auth/asp')

                    }
                }),
                takeUntil(this.unsubscribe),
                finalize(() => {
                    this.loading = false;
                    this.cdr.markForCheck();
                })
            )
            .subscribe((succes) => {

			},
            (error: HttpErrorResponse) => {
                console.log('error');
                console.log(error);
                if (error.status.toString() == "406") {
                    console.log("error bad request");
                    this.existSecretCode = true;
                    this.messageErreur = true;
                    this.motdepasseinvalid = false;
                    console.log(error.error.message)
                    this.message = error.error.message;
                }
                if (error.status.toString() == "403") {
                    this.messageErreur = false;
                    this.motdepasseinvalid = true;
                    console.log(error.status.toString())

                }

                this.toast('warning', true, error.error.message);


            });


    }

    toast(typeIcon: any, timerProgressBar: boolean = false, titleNotif: any) {
        Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            icon: typeIcon,
            timerProgressBar,
            timer: 5000,
            title: titleNotif
        });
    }

    /**
     * Checking control validation
     *
     * @param controlName: string => Equals to formControlName
     * @param validationType: string => Equals to valitors name
     */
    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.loginForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }

    get dark(): boolean {
        return this.layoutService.config().colorScheme !== 'light';
    }

}
const DEMO_PARAMS = {
    EMAIL: 'admin@demo.com',
    PASSWORD: 'demo'

}
