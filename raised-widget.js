var RaisedWidget = class RaisedWidget {
    constructor(progressBarID, address) {
        this.contractAddress = address;
        this.progressID = progressBarID;
        this.web3Provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/Nl4i6Kxw0VMwcAuG4aLj");
        this.web3 = new Web3(this.web3Provider);

        $.getJSON('http://api.etherscan.io/api?module=contract&action=getabi&address=' + this.contractAddress, (data) => {
            this.contractABI = JSON.parse(data.result);
            if (this.contractABI != ''){
                this.contract = this.web3.eth.contract(this.contractABI).at(this.contractAddress);
                this.setRefreshInterval();
            } else {
                console.error("Error");
            }            
        });
    }

    setRefreshInterval() {
        this.getRaised();
        this.refreshInterval = setInterval(() => {
            this.getRaised();
        }, 5000);
    }

    getRaised(){
        var weiRaised = this.contract.weiRaised();
        var tokensSold = this.contract.tokensSold();
        var tokenCap = this.contract.tokenCap();
        this.percentageRaised = (tokensSold / tokenCap) * 100;
        if (isNaN(this.percentageRaised.valueOf())) {
            this.percentageRaised = 0;
        }
        $(this.progressID).css("width", this.percentageRaised + '%');
        console.log(this.percentageRaised + '%');
    }
};