//use "export" to reuse component in another file
export interface AppProps {
    title: string;
  }
  
  export interface Name {
    first: string;
    last: string;
  }
  
  export interface Login {
    uuid: string;
  }
  
  export interface Users {
    name: Name;
    login: Login;
    email: string;
  }