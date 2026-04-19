export class JwtUser {
    id:     string;
    twofa?: boolean;
}

export function newJwtUser(id: string, twofa?: boolean): JwtUser {
    twofa = twofa ? twofa : false;
    return { id, twofa };
}
