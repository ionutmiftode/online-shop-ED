document.addEventListener("DOMContentLoaded", function() {
	init();
});

function init(){
	var arrayP=getProducts();
	var length=getProducts().length;
	for (var i=0; i < length; i++) {
		var product=arrayP[i];
		renderProduct(product,i);
	}
}


function getProducts(){
	var arrayProduse=[{
		id:0,
		nume:"Ceai Ghimbir",
		cantitate:"20plicuri",
		producator:"Pro Natura",
		pretIntreg:4.00,
		pretRedus:0,
		imagine:"../images/ceai-ghimbir.png",
		categorie:"CEAIURI"
	},{
		id:1,
		nume:"Argila pulbere",
		cantitate:"100 g",
		producator:"Favisan",
		pretIntreg:5.50,
		pretRedus:0,
		imagine:"../images/argila-pulbere.jpg",
		categorie:"SUPLIMENTE"
	},{
		id:2,
		nume:"Extract din muguri de Smochin",
		cantitate:"50 ml",
		producator:"Plant Extrakt",
		pretIntreg:18.00,
		pretRedus:16.00,
		imagine:"../images/extract-din-muguri-de-smochin.jpg",
		categorie:"ANTIOXIDANTI"
	},{
		id:3,
		nume:"Zink 10 + C",
		cantitate:"20 comprimate efervescente",
		producator:"Worwag Pharma",
		pretIntreg:20.00,
		pretRedus:17.00,
		imagine:"../images/zink-10-c.jpg",
		categorie:"SUPLIMENTE"
	},{
		id:4,
		nume:"Extract din seminte de vita-de-vie",
		cantitate:"50 ml",
		producator:"Plant Extrakt",
		pretIntreg:18.00,
		pretRedus:0,
		imagine:"../images/extract-din-seminte-de-vita-de-vie.jpg",
		categorie:"ANTIOXIDANTI"
	},{
		id:5,
		nume:"Vitamina E lichida",
		cantitate:"59.2 ml",
		producator:"Solgar",
		pretIntreg:56.50,
		pretRedus:0,
		imagine:"../images/vitamina-e-lichida.jpeg",
		categorie:"ANTIOXIDANTI"
	},{
		id:6,
		nume:"Ceai Gastric",
		cantitate:"50 g",
		producator:"Fares",
		pretIntreg:5.50,
		pretRedus:0,
		imagine:"../images/ceai-gastric.jpg",
		categorie:"CEAIURI"
	},{
		id:7,
		nume:"Ceai Verde",
		cantitate:"20 plicuri",
		producator:"Larix",
		pretIntreg:1.50,
		pretRedus:0,
		imagine:"../images/ceai-verde.JPG",
		categorie:"CEAIURI"
	},{
		id:8,
		nume:"Ceai negru",
		cantitate:"20 plicuri",
		producator:"Vedda",
		pretIntreg:2.00,
		pretRedus:0,
		imagine:"../images/ceai-negru.jpg",
		categorie:"CEAIURI"
	},{
		id:9,
		nume:"DVR Stem glicemo",
		cantitate:"60 capsule",
		producator:"DVR Pharm",
		pretIntreg:29.50,
		pretRedus:0,
		imagine:"../images/dvr-stem-glicemo.jpg",
		categorie:"SUPLIMENTE"
	},{
		id:10,
		nume:"Afin",
		cantitate:"60 comprimate",
		producator:"Dacia Plant",
		pretIntreg:18.00,
		pretRedus:0,
		imagine:"../images/afin.jpg",
		categorie:"SUPLIMENTE"
	}];

	return arrayProduse;
}

function renderProduct(product,i){
	var newDiv=document.createElement("div");
	var image=document.createElement("img");
	var info=document.createElement("h4");
	var pretRedus=document.createElement("p");
	var pretIntreg=document.createElement("p");
	var adauga=document.createElement("button");
	var newBreak=document.createElement("br");
	var comparaCheckbox=document.createElement("input");
	var textCheckBox=document.createElement("p");
	image.src=product.imagine;
	image.alt=product.nume;
	image.className="prodImage";
	info.innerHTML=product.nume+", "+product.cantitate+", "+product.producator;
	if(product.pretRedus==0){
		pretRedus.innerHTML="";
		pretIntreg.innerHTML=(product.pretIntreg).toFixed(2) +" Lei";
		pretRedus.id="nouPretRedus";
		pretIntreg.id="nouPretIntreg";
	}
	else{
		pretRedus.innerHTML=(product.pretRedus).toFixed(2) + " Lei";
		pretIntreg.innerHTML=(product.pretIntreg).toFixed(2);
		pretRedus.id="promPretRedus";
		pretIntreg.id="promPretInreg";
	}
	adauga.innerHTML="Adauga in cos";
	adauga.className="addButton";
	comparaCheckbox.type="checkbox";
	comparaCheckbox.name="compara";
	comparaCheckbox.className="comparaCheckBox";
	comparaCheckbox.id="product"+i;
	textCheckBox.innerHTML="Compara";
	textCheckBox.className="textCheckBox";
	
    newDiv.className="renderedProduct";
	newDiv.id="product"+i;
	newDiv.appendChild(textCheckBox);
	newDiv.appendChild(comparaCheckbox);
	newDiv.appendChild(newBreak);
	newDiv.appendChild(image);
	newDiv.appendChild(info);
	newDiv.appendChild(pretIntreg);
	newDiv.appendChild(pretRedus);
	newDiv.appendChild(newBreak);
	newDiv.appendChild(adauga);
	document.getElementById("produseRandate").appendChild(newDiv);
	document.getElementById("main").addEventListener("click", addToBagButton2);
	comparaCheckbox.addEventListener('change', compara);
	document.getElementById("select").addEventListener('change', sortProducts); 
}

var bagCounter=0; 

function addToBagButton2(event){
	if(event.target && event.target.className == "addButton"){
		bagCounter++;
		document.getElementById("productsCounter").className="counter";
		document.getElementById("productsCounter").textContent = bagCounter;
	}
}

function compara(event){
	var myDiv=document.getElementById("compareContainer");
	var image=document.createElement("img");
	var target = event.target;
  	var parent = target.parentElement;
  	if (event.target.checked){
		if(myDiv.style.visibility != 'visible'){
			myDiv.className = "visibleClass";
			myDiv.style.visibility = 'visible';
		}
		image.src=document.getElementById(parent.id).getElementsByTagName("img")[0].src;
		image.className="productImage";
		image.id=parent.id;
		myDiv.appendChild(image);
		
	}
    else{
		var divChildren=myDiv.children.length;
		var i;
		for( i = 0; i < divChildren; i++ ){
			if(myDiv.childNodes[i].id == parent.id){
				myDiv.removeChild(myDiv.childNodes[i]);
				if(myDiv.childNodes[0] == null){
					myDiv.style.visibility='hidden';
				}
			}
		}
		
	}
}

function sortByPriceUp(products){
	var length=products.length;
	var check;
    do {
        check = false;
		for(var i = 0; i < length-1; i++){
			if(products[i].pretIntreg > products[i+1].pretIntreg){
				var aux = products[i];
				products[i] = products[i+1];
				products[i+1] = aux;
				check = true; 
			}
		}
	} while (check);
return products;
}
function sortByPriceDown(products){
	var length=products.length;
	var check;
    do {
        check = false;
		for(var i = 0; i < length-1; i++){
			if(products[i].pretIntreg < products[i+1].pretIntreg){
				var aux = products[i];
				products[i] = products[i+1];
				products[i+1] = aux;
				check = true;
			}
		}
	} while (check);
return products;
}
function sortAlfab(products){
	var length=products.length;
	var check;
    do {
        check = false;
		for(var i=0; i<length-1;i++){
			if((products[i].nume).localeCompare(products[i+1].nume) !== -1){
				var aux = products[i];
				products[i] = products[i+1];
				products[i+1] = aux;
				check = true;
			}
		}
	} while (check);
return products;
}

function deleteProducts(){
  	var parent = document.getElementById("produseRandate");
 	while (parent.firstChild) {
    	parent.removeChild(parent.firstChild);
  }
}

function sortProducts(event){
	var products=getProducts();
	var sortedProducts=[];
	var i=0;
	var mySelect=document.getElementById("select"); 
	var optionSelected = mySelect.options[mySelect.selectedIndex].value;
	switch(optionSelected){
		case "alfabetic":
			deleteProducts();
			sortedProducts = sortAlfab(products);
			break;
		case "pretUp":
			deleteProducts();
			sortedProducts = sortByPriceUp(products);
			break;
		case "pretDown":
			deleteProducts();
			sortedProducts = sortByPriceDown(products);
			break;
		default:
			break;
	}
	sortedProducts.forEach(function(product){
		renderProduct(product,i);
		i++;
	});
}