type Product = {
  name: string, // IMDSC1 | STOCKCOD
  sku: string,  // IMLITM
  available: number, // STOCKCANT
  price: number, // ?
  image?: string, // Se va a eliminar porque obtendrá en una carpeta local dependiendo del sku del producto
  quantity: number, // Se setea desde la app
  details: {
    IBITM: number,
    UMCONV: number,
    IMSRP1: string,
    IMSRP2: string,
    IMSRP3: string,
    IMSRP4: string,
  }
}

type User = {
  id: number,
  nombre: string,
  email: string,
  password: string,
  ficha: string,
  two_factor_auth: string,
  is_admin: boolean,
  password_login_available: boolean,
}

type AuthCredentials = {
  user: User,
  token: string,
}

type Employee = {
  name: string;
  CI: string;
  ficha: number;
  zone: string;
  clientType: string;
  address: string;
  birthState: string;
  birthNeighborhood: string;
  type: string;
}

type Purchase = {
  id: string,
  order: string;
  date: string;
  details: string;
}

type Bill = {
  number: number,
  purchase: Purchase,
  employee: Employee,
  products: Product[],
}

type Bulletin = {
  number: number,
  name: string;
  user: string;
  ficha: number;
  address: string;
  zone: string;
  clientType: string;
  order: string;
  store: string;
  details: string;
  date: string;
}

type BulletinHeader = {
  ODJOBN: string;
  ODUSER: string;
  ODEDOC: number;
  ODLITM: string;
  ODDSC1: string;
  ODSOQS: number;
  ODUPRC: number;
  ODAMXT: number;
  ODEDCT: string;
  ODEKCO: string;
  ODMCU:  string;
  ODLTTR: string;
  ODNXTR: string;
  ODTMST: string; // Date String
  ODAN8:  number;
  ODAC03: string;
  ODITM:  number;
  ODCONV: number;
  ODSRP1: string;
  ODSRP2: string;
  ODSRP3: string;
  ODSRP4: string;
  ODPRGR: string;
  ODZON:  string;
  ODASN:  string;
  ODFVTR: number;
}

type BulletinInfo = {
  WOJOBN:  string;
  WOUSER:  string;
  WOEDOC:  number;
  WOAN8:   number;
  WOALPH:  string;
  WOADD1:  string;
  WOAC03:  string;
  WOAC05:  string;
  WOVR01:  string;
  WODEL1:  string;
  WOTRDJ:  string; // Date string
  WOURDT:  string; // Date string
  WOTMSTP: string; // Date string
  WODRQJ:  string;
  WOMCU:   string;
  WOEDCT:  string;
  WOEKCO:  string;
  WOASN:   string;
  WOAAT1:  string;
  WOCPGP:  string;
  WOZON:   string;
}