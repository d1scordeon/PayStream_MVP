export class BankCard {
    constructor({cardnumber, expdate, cvv}) {
      this.cardnumber = cardnumber;
      this.expdate = expdate;
      this.cvv = cvv;
    }


    toObj() {
      //get serialisible fields
      const {cardnumber, expdate, cvv} = this;
      
      //return plain object 
      return {
       cardnumber, expdate, cvv
      }
    }
    
    serialise() {
      return JSON.stringify(this.toObj());
    }
    
    static deserialise(json) {
      return A.from(JSON.parse(json));
    }
}