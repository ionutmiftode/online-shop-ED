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
	var arrayProduse=[
	{
		nume:"Ceai Ghimbir",
		cantitate:"20plicuri",
		producator:"Pro Natura",
		pretIntreg:4.00,
		pretRedus:0,
		imagine:"../images/ceai-ghimbir.png"
	},
	{
		nume:"Argila pulbere",
		cantitate:"100 g",
		producator:"Favisan",
		pretIntreg:5.50,
		pretRedus:0,
		imagine:"../images/argila-pulbere.jpg"
	},
	{
		nume:"Extract din muguri de Smochin",
		cantitate:"50 ml",
		producator:"Plant Extrakt",
		pretIntreg:18.00,
		pretRedus:16.00,
		imagine:"../images/extract-din-muguri-de-smochin.jpg"
	},
	{
		nume:"Zink 10 + C",
		cantitate:"20 comprimate efervescente",
		producator:"Worwag Pharma",
		pretIntreg:20.00,
		pretRedus:17.00,
		imagine:"../images/zink-10-c.jpg"
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
		pretRedus.id="pretRedus"+i;
		pretIntreg.id="pretIntreg"+i;
		pretRedus.className="nouPretRedus";
		pretIntreg.className="nouPretIntreg";
	}
	else{
		pretRedus.innerHTML=(product.pretRedus).toFixed(2) + " Lei";
		pretIntreg.innerHTML=(product.pretIntreg).toFixed(2);
		pretRedus.id="pretRedus"+i;
		pretIntreg.id="pretIntreg"+i;
		pretRedus.className="promPretRedus";
		pretIntreg.className="promPretIntreg";
	}
	adauga.innerHTML="Adauga in cos";
	adauga.className="addButton";
	//adauga.addEventListener('click', addToBagButton); //a fost pentru tema3
	
	comparaCheckbox.type="checkbox";
	comparaCheckbox.name="compara";
	comparaCheckbox.className="comparaCheckBox";
	comparaCheckbox.id="product"+i;
	textCheckBox.innerHTML="Compara";
	textCheckBox.className="textCheckBox";
	
    newDiv.className="addProducts";
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
	if(product.pretRedus==0){
		document.getElementById("produse_noi").appendChild(newDiv);
	}
	else{
		document.getElementById("produse_promotii").appendChild(newDiv);
	}
	//Tema4 -Use event delegation and compare Products
	document.getElementById("main").addEventListener("click", addToBagButton2);
	comparaCheckbox.addEventListener('change', compara);
	//end for Tema4

	//Tema8
	document.getElementById("shopCtx").addEventListener("click", visibleBagPopup);
}

var bagCounter=0; 
//a fost pentru tema3
/*function addToBagButton(){ 
	bagCounter++;
	document.getElementById("productsCounter").className="counter";
	document.getElementById("productsCounter").textContent = bagCounter;
};*/
var total = 0;
//Tema4
function addToBagButton2(event) {
	var target = event.target;
  	var parent = target.parentElement;
  	var pretRedus = 0;
  	var pretIntreg = 0;
	if (event.target && event.target.className == "addButton") {
		bagCounter++;
		document.getElementById("productsCounter").className="counter";
		document.getElementById("productsCounter").textContent = bagCounter;
		var parentId = (parent.id).substr(7, 4);
		pretRedus = parseFloat(document.getElementById("pretRedus"+parentId).innerHTML.substr(0, 4));
		pretIntreg = parseFloat(document.getElementById("pretIntreg"+parentId).innerHTML.substr(0, 4));
		if (pretRedus !== 0 && !isNaN(pretRedus)) {
			total += pretRedus;
			document.getElementById("totalPrice").textContent = total;
		}else if(pretRedus === 0 || isNaN(pretRedus) ) {
			total += pretIntreg;
			document.getElementById("totalPrice").textContent = total;
		}
		
	}
}

function visibleBagPopup(event) {
	var ignore = document.getElementById("bagIconContainer");
	var bagPopup = document.getElementById("bagPopup");
	var target = event.target;
	if ( target == ignore || ignore.contains(target)) {
		if(bagPopup.style.visibility != 'visible') {
			bagPopup.className = "visibleClassPopUp";
			bagPopup.style.visibility = 'visible';
		} 
	} else {
		bagPopup.className = "";
		bagPopup.style.visibility = 'hidden';
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
			myDiv.style.visibility='visible';
		}
		image.src=document.getElementById(parent.id).getElementsByTagName("img")[0].src;
		image.className="productImage";
		image.id=parent.id;
		myDiv.appendChild(image);
		
	}
    else{
		if(myDiv.childNodes[0] == null){
			myDiv.style.visibility='hidden';
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
}

