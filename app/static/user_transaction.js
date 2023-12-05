export class MyTransaction {
    constructor(sender, receiver, amount, description) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.description = description;
    }

    logTransaction() {
        console.log(`${this.sender} sent $${this.amount} to ${this.receiver}, description:${this.description}.`);
    }

    toObj() {
        //get serialisible fields
        const {sender, receiver, amount, description} = this;

        //return plain object
        return {
            sender, receiver, amount, description
        }
      }

      serialise() {
        return JSON.stringify(this.toObj());
      }

      static deserialise(json) {
        return A.from(JSON.parse(json));
      }
  }