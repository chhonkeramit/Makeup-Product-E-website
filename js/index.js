

const apiURL = "https://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl";



$.ajax({
    type: "GET",
    url: apiURL,
    dataType: "json",
    success: fetchallProducts,
    // success: function(data){
    //     console.log("Received data : " + data);
    // },
    error: function(request, error){
        alert("Unable to fetch data " + error);
    }
});

function fetchallProducts(allProducts){
    console.log("started")
    console.log(`Country details ${allProducts[0].name}`);

    for (i=0 ; i<allProducts.length; i++){
        // console.log("Common Name : " + allProducts[i].name.common);
        // console.log("Official Name : " + allProducts[i].name.official);
        // console.log("Capital : "+ allProducts[i].capital);

        // var outputElements =  
        // `<div class="column countryCard">
        // <h4> ${allProducts[i].name} </h4>
        // <a href="countryInfo.html?name=${allProducts[i].id}" class="link">
        //     <img src = "${allProducts[i].image_link}" class = "imageCard"> 
        // </a>
        // <p>Price :$${(allProducts[i].price === undefined) ? "NA" : allProducts[i].price}</p>
        // </div><br>`;

        var outputElements =  
        `<div class="card">
        <a href="productInfo.html?name=${allProducts[i].id}" class="link">
            <img src = "${allProducts[i].image_link}" class = "imageCard"> 
        </a>
        <h1 id="fix">${allProducts[i].name.trim()}</h1>
        <p class="price">$${allProducts[i].price}.price</p>
        
        <p>
        
        <a href="productInfo.html?name=${allProducts[i].id}" class="link">
        <button>View Product</button>
        </a>
        
        </p>
      </div>`;


       

        console.log(outputElements);

        $("#data").append(outputElements);
    }
}