let productNameInput = document.getElementById('productName');
let productPriceInput = document.getElementById('productPrice');
let productCategoryInput = document.getElementById('productCategory');
let productDecInput = document.getElementById('productDec');
let productSearchInput = document.getElementById('productSearch')
let addProductBtn = document.getElementById('addProduct');
let ubdateProductBtn = document.getElementById('ubdateProduct');
let alertName = document.getElementById('alertName')
let alertPrice = document.getElementById('alertPrice')
let alertCategory = document.getElementById('alertCategory')
let alertDec = document.getElementById('alertDec')
let exiteAlert = document.getElementById('exiteAlert')
let buttonClose = document.getElementById('buttonClose')
let buttomAdd = document.getElementById('buttomAdd')
let FormAdd = document.getElementById('FormAdd')


function closeProduct() {
    FormAdd.classList.add('d-none')
    buttomAdd.classList.remove('d-none')
}
function formAddProduct() {
    buttomAdd.classList.add('d-none')
    FormAdd.classList.remove('d-none')
}

let productContainer = [];
indexUbdate = 0;
if (localStorage.getItem('proudects') != null) {
    productContainer = JSON.parse(localStorage.getItem('proudects'));
    disblayData(productContainer);
} else {

}

function addProduct() {

    if (valdationName() === true && valdationPrice() === true && valdationDec() === true && valdationCate() === true) {
        let product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            cat: productCategoryInput.value,
            dec: productDecInput.value,
        } 
        productContainer.push(product)
    console.log(productContainer);
    localStorage.setItem('proudects', JSON.stringify(productContainer))
    disblayData(productContainer);
    claerForm();
    }


}

function disblayData(arr) {

    let cartona = '';
    for (let i = 0; i < arr.length; i++) {

        cartona += `
        <tr>
        <td class="rounded-start">${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].cat}</td>
        <td>${arr[i].dec}</td>
        <td><a  onclick="setForm(${i})"> <i class="fa-solid fs-3 fa-pen-to-square cursor" style="color: #008a10;"></i></a></td>
        <td class="rounded-end"><a onclick="deletProduct(${i})"><i class="fa-solid fs-3 fa-trash-can  cursor" style="color: #c73d3d;"></i></a></td>
    </tr>
        `

        document.getElementById('tableBody').innerHTML = cartona;

    }

}


function claerForm() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDecInput.value = '';
}

function deletProduct(productIndex) {

    productContainer.splice(productIndex, 1),
        console.log(productContainer);
    localStorage.setItem('proudects', JSON.stringify(productContainer));
    disblayData(productContainer);
}

function searchProduct(term) {
    let matceadProduct = [];
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            matceadProduct.push(productContainer[i])
            disblayData(matceadProduct)
        }
    }
    console.log(matceadProduct);
}

function setForm(index) {
    indexUbdate = index;
    addProductBtn.classList.replace('d-flex', 'd-none')
    ubdateProductBtn.classList.replace('d-none', 'd-flex')
    productNameInput.value = productContainer[index].name;
    productPriceInput.value = productContainer[index].price;
    productCategoryInput.value = productContainer[index].cat;
    productDecInput.value = productContainer[index].dec;
    buttomAdd.classList.add('d-none')
    FormAdd.classList.remove('d-none')
}


function ubdateProduct() {

    let product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        cat: productCategoryInput.value,
        dec: productDecInput.value,
    }

    productContainer.splice(indexUbdate, 1, product)
    localStorage.setItem('proudects', JSON.stringify(productContainer))
    disblayData(productContainer);
    claerForm();
    addProductBtn.classList.replace('d-none', 'd-flex')
    ubdateProductBtn.classList.replace('d-flex', 'd-none')
   
}


// ------------------valdation--------------

function valdationName() {

    if (productNameInput.value === '') {
        alertName.classList.remove('d-none')
        return false;
    } else {

        let isExit = false; 
        for (let i = 0; i < productContainer.length; i++) {
            if (productContainer[i].name === productNameInput.value) {
                isExit = true;
                break;
            }
            
        }
        if (isExit === true) {
            exiteAlert.classList.remove('d-none')
        }else{
            exiteAlert.classList.add('d-none')
            return true;
        }
        alertName.classList.add('d-none')
        
    }



}

function valdationPrice() {
    if (productPriceInput.value === '') {
        alertPrice.classList.remove('d-none')
        return false
    } else {
        alertPrice.classList.add('d-none')
         return true
    }
}
function valdationDec() {
    if (productCategoryInput.value === '') {
        alertCategory.classList.remove('d-none')
        return false
    } else {
        alertCategory.classList.add('d-none')
        return true
    }
}
function valdationCate() {
    if (productDecInput.value === '') {
        alertDec.classList.remove('d-none')
        return false 
    } else {
        alertDec.classList.add('d-none')
        return true
    }
}
