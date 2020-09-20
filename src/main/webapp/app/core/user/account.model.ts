export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public firstName: string,
    public langKey: string,
    public lastName: string,
    public login: string,
    public image: string,
    public imageContentType: string,
    public imageUrl: string
  ) {}
}
