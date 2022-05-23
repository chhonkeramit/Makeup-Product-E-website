
    const queryString = location.search;    
    console.log("Query String : ", queryString);

    const selectedProducts = queryString.substring(queryString.indexOf("=")+1);
    console.log(`Selected Product ${selectedProducts}`);

    const ProductURL = `https://makeup-api.herokuapp.com/api/v1/products/${selectedProducts}.json`;

    console.log(ProductURL);


    $.ajax({
        type: "GET",
        url: ProductURL,
        dataType: "json",
        success: fetchProductDetails,
        error: function(request, error){
            console.error("Unable to fetch Product details ", error);
        }
    });


class Product{
    constructor(name, brand, price, description, image_link){
        this.cName = name;
        this.cBrand = brand;
        this.cPrice = price;
        this.cDescription = description;
        this.cImage = image_link;
    }
}

var favProductList = new Array();
const KEY = "product_key";

function addProductToFavorites(newProduct){
    console.log(`Product to add to fav ${newProduct}`);
    // localStorage.setItem(newProduct.cName, JSON.stringify(newProduct));

    if (KEY in localStorage){
        //KEY exist in local storage

        //get a copy of the data from local storage
        //alter the data and then set the data back to the local storage

        //when receiveing the data from local storgae, the data willbe in string format
        //convert the string into JS objects using JSON.parse()
        const productList = JSON.parse(localStorage.getItem(KEY));
        console.log(`Exisiting list ${productList}`);

        //check if the Product to add is already in the list

        //some() - will check if any of the array element matches the given condition
        //if matches, return true; otherwise , return false

        // var isExist = productList.some(elem => elem.cName === newProduct.cName);

        //findIndex() - will check if any of the array element matches the given condition
        //if matches, returns the index of the element; otherwise, return -1
        var indexOfObject = productList.findIndex(elem => elem.cName === newProduct.cName);

        // if (isExist){
        if (indexOfObject !== -1){
            alert("The Product is already added to Your Cart");
            //Increase the priority of the Product of the existing object and write it to local storage
            var objectToUpdate = productList[indexOfObject];

            if (objectToUpdate.priority > 1){
                objectToUpdate.priority -= 1;
            }

            productList[indexOfObject] = objectToUpdate;
        }else{
            //Add newProduct into existing list (temporary) and write it to local storage
            productList.push(newProduct);
        }
        localStorage.setItem(KEY, JSON.stringify(productList));
        console.log("mark1")
        // showData();

    }else{
        //KEY doesn't exist...create a new one

        favProductList.push(newProduct);

        //when sending the data to localstorage, the data needs to be in string format
        //convert the JS object into string using JSON.stringify()
        localStorage.setItem(KEY, JSON.stringify(favProductList));
        console.log("mark2")

        // showData();


    }

}

function removeProduct(){
    var ProductName = $("#cName").text().trim();
    console.log("Remove Product clicked " +ProductName );

    if (KEY in localStorage){
        const productList = JSON.parse(localStorage.getItem(KEY));
        var indexOfObject = productList.findIndex(elem => elem.cName === ProductName );
        console.log("remove product inside start" + " "+ indexOfObject)
        console.log(productList)
        if (indexOfObject !== -1){
            productList.splice(indexOfObject, 1);
            localStorage.setItem(KEY, JSON.stringify(productList));
            // console.log("remove product inside end")
            alert("Prodcut is Removed from the cart")
            document.location.reload(true)


            // console.log(productList)
        }else{
            console.log("Product doesn't exist in the fav list");
            alert("Prodcut is already Removed from the cart. Please Check Your View Cart!")
        }
    }else{
        console.log("No Product added to the storage yet");
    }
}



function fetchProductDetails(data){
    console.log("started");

    

    console.log(`Product details ${data.name}`);

    var ProductHTML = `
        <img src="${data.image_link}">
        <h1 id="cName" style="font-family: 'Lobster', cursive;"> ${data.name} </h1>
        <h2><font color = "gray"> Price</font> : $${data.price} </h2>
        <h3><font color = "gray"> Brand</font> : ${data.brand} </h3>
        <h3 style="color: cadetblue;"> <font color = "gray"> Description</font> : ${data.description} </h3>
        <br><br>
        <button id="addButton" class="btn_style"> Add To Cart </button>
        <br><br>
        <button onClick="removeProduct()" class="btn_style_red"> Remove from Cart </button>
    `;

    $("#Product").append(ProductHTML);
   
    // var capital = (data[0].capital === undefined) ? "NA" : data[0].capital[0];
   

    $("#addButton").on("click", function(){
        console.log("Add to favourite clicked");
        document.location.reload(true)

        alert("Product is Added To Your Cart")
        var newFav = new Product(data.name, data.brand, data.price,data.description , data.image_link);
        addProductToFavorites(newFav);

/********** */

    });
}

