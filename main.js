
let title= document.getElementById("title");
let price= document.getElementById("price");
let taxes= document.getElementById("taxes");
let ads= document.getElementById("ads");
let discount= document.getElementById("discount");
let total= document.getElementById("total");
let count= document.getElementById("count");
let category= document.getElementById("category");
let submit= document.getElementById("submit");

let mood= 'create';
let tmp;

//function to get total

function getTotal(){
  if(+price.value != ' ')
  {
    //to convert input data from string to int may do +variable
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML= result;
    total.style.background= 'green';
  }
  else
  {
   total.innerHTML= '';
   total.style.background= 'tomato';
  }
}

//function to create product
let dataProduct;
if(localStorage.product !=null)
{
   dataProduct= JSON.parse(localStorage.product);
}
else
{
    dataProduct=[];

}

submit.onclick= function(){
    let newProduct
    ={
       title: title.value.toLowerCase(),
       price: price.value,
       taxes: taxes.value,
       ads: ads.value,
       discount: discount.value,
       total: total.innerHTML,
       count: count.value,
       category: category.value.toLowerCase(),

    }
    // count of product 
   if(title.value !='' && price.value!='' && category.value!='' && newProduct.count < 100){
    if(mood === 'create'){
      if(newProduct.count > 1){
        for(let i=0;i < newProduct.count;i++){
          dataProduct.push(newProduct);
        }
        }
        else{
          dataProduct.push(newProduct);
        }
    }
    else{
      dataProduct[tmp]= newProduct;
      mood='craete';
      submit.innerHTML='Create';
      count.style.display='none';
    }
    clearData();
   }
  
  
    localStorage.setItem("product", JSON.stringify(dataProduct));

    showData();
     
    
}

//save data in localStorage 

//function to clear inputs 

function clearData(){
  title.value= '';
  price.value='';
  taxes.value='';
  ads.value='';
  discount.value='';
  total.innerHTML='';
  count.value='';
  category.value='';
}

//function to read data
function showData(){
  getTotal();
  let table='';
 for(let i=0; i< dataProduct.length; i++){
  table += ` <tr>
  <td>${i+1}</td>
  <td>${dataProduct[i].title}</td>
  <td>${dataProduct[i].price}</td>
  <td>${dataProduct[i].taxes}</td>
  <td>${dataProduct[i].ads}</td>
  <td>${dataProduct[i].discount}</td>
  <td>${dataProduct[i].total}</td>
  <td>${dataProduct[i].category}</td>
  <td><button id="btnUpdate" onclick="updateData(${i})">update</button></td>
  <td><button onclick="deleteData(${i})" id="btnDelete">delete</button></td>
</tr>`
 }
 
  document.getElementById('tbody').innerHTML=table;
  let btnDelet = document.getElementById("deleteAll");
  if(dataProduct.length > 0){
    btnDelet.innerHTML= 
    `<button onclick="deleteAllProduct()">Delete All ${dataProduct.length}</button>`
  }
  else {
    btnDelet.innerHTML='';
  }
}
showData();



//delete product or more

function  deleteData(i){
  dataProduct.splice(i,1 );
  localStorage.product=JSON.stringify(dataProduct);
  showData();
}
 

function deleteAllProduct(){
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}
//update product 
function updateData(i){
  title.value=dataProduct[i].title;
  price.value=dataProduct[i].price;
  taxes.value=dataProduct[i].title;
  ads.value=dataProduct[i].ads;
  discount.value=dataProduct[i].discount;
  getTotal();
  count.style.display='none';
  category.value=dataProduct[i].category;
  submit.innerHTML= 'Update';
  mood='Update';
  tmp=i;
  scroll({
    top:0,
    behavior:'smooth'
  })
}


//search 
let searchMood= 'title';
function getSearchMood(id){
  let search= document.getElementById('search')
   if(id== "searchTitle"){
   searchMood = 'title';
   }
   else{
    searchMood = 'category';
    
    }
    search.placeholder= "Search By " + searchMood;
    search.focus()
      search.value='';
      showData();
    
}

function searchData(value){
  let table= '';
  for(let i=0; i< dataProduct.length ; i++){
    
     if(searchMood == 'title'){
      if(dataProduct[i].title.includes(value)){
        table += ` <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button id="btnUpdate" onclick="updateData(${i})">update</button></td>
        <td><button onclick="deleteData(${i})" id="btnDelete">delete</button></td>
      </tr>`
       }
     }
     else{
      if(dataProduct[i].title.includes(value)){
        table += ` <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button id="btnUpdate" onclick="updateData(${i})">update</button></td>
        <td><button onclick="deleteData(${i})" id="btnDelete">delete</button></td>
      </tr>`
       }
   }
    }
 
  document.getElementById('tbody').innerHTML=table;
  }
  
  

//clean data
