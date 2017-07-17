pragma solidity ^0.4.11;

contract Transfer {

    address seller;
    address buyer;
    uint asset;

    // establishes stages on state
    enum State { Created, Confirmed, Disabled }
    // saves instantiated state into a variable
    State state;

    modifier correctValue(bool c) {
        require(c);
        _;
    }
    modifier currentState(State s) {
        require(state == s);
        _;
    }
    modifier onlyBuyer() {
        require(msg.sender == buyer);
        _;
    }
    modifier onlySeller() {
        require(msg.sender == seller);
        _;
    }

    event TransferConfirmed(address buyer, uint datePurchased);
    event TransferReceived(address buyer, address seller, uint assetPrice, uint dateTransfered);
    event Refund(address buyer, address seller, uint refundAmount, uint dateRefunded);

    function Transfer() correctValue(msg.value % 2 == 0) payable {
        // contains the address of the one who calls the function
        seller = msg.sender;
        // has to send 2x as a deposit so the asset is adjusted
        asset = msg.value / 2;
    }

    // can only be called in Created State and if the value is double
    function confirmPurchase() currentState(State.Created)  {
        buyer = msg.sender;
        //changes state to Confirmed
        state = State.Confirmed;
        // event
        TransferConfirmed(buyer, now);
    }

    // can only be called in Confirmed State by the buyer
    function confirmRecieved() currentState(State.Confirmed) onlyBuyer {
        buyer.transfer(asset);
        // anything left after the the buyer is confirmed will go back to the seller
        seller.transfer(this.balance);
        state = State.Disabled;
        // event
        TransferReceived(buyer, seller, asset, now);
    }

    // // can only be called in Confirmed State by the seller
    function refundBuyer() currentState(State.Confirmed) onlySeller {
        buyer.transfer(2 * asset);
        seller.transfer(this.balance);
        state = State.Disabled;
        // event
        Refund(buyer, seller, 2 * asset, now);
    }

}
