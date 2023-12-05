export class UserRegisterModel {
    constructor({username, password, email, bankcard}) {
      this.username = username;
      this.password = password;
      this.email = email;
      this.bankcard = bankcard;
    }


    toObj() {
      //get serialisible fields
      const {username, password, email, bankcard} = this;
      
      //return plain object 
      return {
        username, password, email, bankcard
      }
    }
    
    serialise() {
      return JSON.stringify(this.toObj());
    }
    
    static deserialise(json) {
      return A.from(JSON.parse(json));
    }
}