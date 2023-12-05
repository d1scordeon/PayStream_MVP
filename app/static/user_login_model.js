export class UserLoginModel {
    constructor({username, password}) {
      this.username = username;
      this.password = password;
    }

    toObj() {
        //get serialisible fields
        const {username, password} = this;
        
        //return plain object 
        return {
          username, password
        }
      }
      
      serialise() {
        return JSON.stringify(this.toObj());
      }
      
      static deserialise(json) {
        return A.from(JSON.parse(json));
      }
  }