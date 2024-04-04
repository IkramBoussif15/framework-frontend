export class JwtResponse {
    jwt!: string;
    id!: number;
    userName!: string;
    refreshToken!: string;
    email!: string;
    roles!: string[];
    hasAsp!: boolean;
    expiryDate: any
    timersession: any;


}
