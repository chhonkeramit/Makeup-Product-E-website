document.addEventListener('DOMContentLoaded', function() { showData();}, false);



function showData() {
    const KEY = "product_key";

    const productList = JSON.parse(localStorage.getItem(KEY));
    console.warn(productList.length)
    for (var k in productList) 
    {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        // if (cartItemNames[i].innerText == productList[i].cName) {
        //     alert('This item is already added to the cart')
        //     return
        // }
    }
           
   
        console.log(productList[k].cPrice);
        console.log("meow mewo")
    
    var cartRowContents = `
        <div class="cart-item cart-column">
        
            <img class="cart-item-image" src="${productList[k].cImage}" width="100" height="100">
            <span class="cart-item-title" id="cName">${productList[k].cName}</span>
        </div>
        <span class="cart-price cart-column">$${productList[k].cPrice}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" id="${k}" type="button">REMOVE</button>
        </div>`
    
        cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    updateCartTotal()

        document.getElementsByClassName('btn-danger')[k].addEventListener('click', removeCartItem)
        document.getElementsByClassName('cart-quantity-input')[k].addEventListener('change', quantityChanged)
    }


    }

    function removeCartItem(event) {
      
        var buttonClicked = event.target
        // console.warn(event.currentTarget.dataset);
        // console.warn(event.target.dataset);
        // console.warn(event);
        // console.warn((buttonClicked.parentElement.parentElement));
        // console.warn(event.view.localStorage);
        // console.log("dekte hai ye kisko delete kar raha h: " + buttonClicked.id)
        buttonClicked.parentElement.parentElement.remove()
        // console.log("par delete kya hua " + " " + buttonClicked.parentElement.parentElement + " " + event)

        // // Remove wala function for removing from local storage start//
        // var ProductName = $(".cart-item > #cName").text().trim();
        // console.log("~~~~~~~~~~Remove Product clicked: " +ProductName );
    
        if (KEY in localStorage){
            const productList = JSON.parse(localStorage.getItem(KEY));
            var indexOfObject = buttonClicked.id //productList.findIndex(elem => elem.cName === ProductName );

            console.log("~~~~~~~~~~~remove product inside start" + " " + indexOfObject)
            console.log(productList)
            if (indexOfObject !== -1){
                productList.splice(indexOfObject, 1);
                localStorage.setItem(KEY, JSON.stringify(productList));
                console.log("remove product inside end")
                document.location.reload(true)
                console.log(productList)
    
            }else{
                console.log("Product doesn't exist in the fav list");
            }
        }else{
            console.log("No Product added to the storage yet");
        }


        // Remove wala function for removing from local storage ends//
      
       
    
        updateCartTotal()
    }

    function quantityChanged(event) {
        var input = event.target
        console.warn(input)
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
    }

    function updateCartTotal() {
        console.log("testing total start")

        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')

        if(cartRows==null) {
            return;
        }

        var total = 0
        for (var i = 0; i < cartRows.length; i++) 
                   {
                        var cartRow = cartRows[i]
                        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
                        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
                        var price = parseFloat(priceElement.innerText.replace('$', ''))
                    // var price = priceElement.value
                    console.log("testing total Price" + price)

                        var quantity = quantityElement.value
                        console.log("testing total")

                        var Tax = 1.13
                        total = total + (price * quantity * Tax)
                        console.warn("tax lagane k bad :" + total)




            //*********** discount calculation **********
                    // 10% for order total of $75 or more
                    if (total >= 75 && total < 100) {
                        console.warn("total for 10% :" + total)
                        var discount = .9 
                        total = total * discount
                        total = Math.round(total * 100) / 100
                        alert("You are eligible for 10%")
                    document.getElementsByClassName('cart-total-price')[0].innerText =  '$' +  total
                    }
                    //  20% for order total of $100 or more
                    else if (total >= 100 && total < 150) {
                        console.warn("total for 20% :" + total)

                        var discount = .8
                        total = total * discount
                        total = Math.round(total * 100) / 100
                        alert("You are eligible for 20%")

                        document.getElementsByClassName('cart-total-price')[0].innerText = '$' +  total

                    }
                    //  30% for order total of $150 or more
                    else if (total >= 150) {
                        console.warn("total for 30% :" + total)

                        var discount = .7
                        total = total * discount
                        total = Math.round(total * 100) / 100
                        alert("You are eligible for 30%")

                        document.getElementsByClassName('cart-total-price')[0].innerText = '$' +  total

                    } else {
                            total = Math.round(total * 100) / 100
                            document.getElementsByClassName('cart-total-price')[0].innerText = '$' +  total
                        }

                    }

      
    }

   
    const KEY = "product_key";


function Buy() {
    alert("Thank You For Purchasing. Have a Good day!")
    localStorage.removeItem(KEY)
    document.location.reload(true)

}