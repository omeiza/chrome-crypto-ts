// C H R O M E  C R Y P T O
// Chrome extension that lists popular crypto, their prices and volume
var cryptoChromeExtension = {
    objectToArray: undefined,
    initCrypto: undefined
};
cryptoChromeExtension.objectToArray = function (thisObject) {
    return Object.keys(thisObject).map(function (k) {
        return thisObject[k];
    });
};
cryptoChromeExtension.initCrypto = function () {
    // @ts-ignore
    var tableRowTemplate = document.getElementById('table__row--template').content.querySelector('tr'), table = document.querySelector('.crypto__list'), tableRowBody = table.querySelector('.crypto__list--body'), cryptoObject = JSON.parse('[{"Bitcoin": "BTC","Ethereum": "ETH","Ripple": "XRP","Bitcoin Cash": "BCH","Cardano": "ADA","Litecoin": "LTC","Dash": "DASH","Monero": "XHR","Bitcoin Gold": "BTG","Ethereum Classic": "ETC","Zcash": "ZEC"}]');
    var cryptoArray = cryptoChromeExtension.objectToArray(cryptoObject[0]), cryptoList = [];
    for (var a = 0; a <= cryptoArray.length - 1; a++) {
        cryptoList.push(cryptoArray[a]);
    }
    var allCryptoList = cryptoList.join(",");
    // Fetch API
    fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=".concat(allCryptoList, "&tsyms=USD"))
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        var dataArray = cryptoChromeExtension.objectToArray(data['DISPLAY']);
        if (dataArray.length > 0) {
            // @ts-ignore
            table.style.display = 'table';
            // @ts-ignore
            document.querySelector('.credit').style.display = 'block';
        }
        for (var z = 0; z <= dataArray.length - 1; z++) {
            var clone = tableRowTemplate.cloneNode(true);
            tableRowBody.appendChild(clone);
            var x = clone.querySelector('[data-role=numbering]');
            if (x)
                x.innerHTML = "".concat(z + 1);
            x = clone.querySelector('[data-role=symbol]');
            if (x)
                x.innerHTML = dataArray[z]["USD"]["FROMSYMBOL"];
            x = clone.querySelector('[data-role=price]');
            if (x)
                x.innerHTML = dataArray[z]["USD"]["PRICE"];
            x = clone.querySelector('[data-role=volume]');
            if (x)
                x.innerHTML = dataArray[z]["USD"]["SUPPLY"];
            x = clone.querySelector('[data-role=change]');
            if (x)
                x.innerHTML = dataArray[z]["USD"]["CHANGE24HOUR"];
        }
    })["catch"](function (err) {
        console.error('Error loading crypto data:' + err);
    });
};
cryptoChromeExtension.initCrypto();
