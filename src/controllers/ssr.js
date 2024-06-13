//SSR - SERVER SIDE RENDER

// - - - - - - - - - HEAD - - - - - - - - - 
function baseHtmlHead(){
    const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" type="image/x-icon" href="./images/favicon.ico">
            <link rel="stylesheet" href="/normalize.css">
            <link rel="stylesheet" href="/styles.css">
            <title>Ropa epica</title>
        </head>
        <body>
            <div id="header"> 
                <h1>Catálogo epico</h1>
            </div>  
    `;
    
    return html;
}
// - - - - - - - - - FOOT - - - - - - - - - 
function baseHtmlFoot(){
    const html = `
        </body>
        </html>    
    `;
    
    return html;
}
// - - - - - - - - - NAVEGATION BAR - - - - - - - - - 
function getNavBar(route,category){
    let createProd='<a href="/auth/login">LOGIN</a>';
    let catTitle='';
    if(route==='dashboard') 
        createProd = `
            <a href="/auth/logout">LOGOUT</a>
            <a href="/dashboard/new">CREAR</a>
        `;

    if(category)
        catTitle=`
            <div id="catTitle">
                <h2>${category}</h2>
            </div>
        `;

    let html = ` 
        <nav>
            <a href="/${route}/?cat=Camisetas">Camisetas</a>
            <a href="/${route}/?cat=Pantalones">Pantalones</a>
            <a href="/${route}/?cat=Zapatos">Zapatos</a>
            <a href="/${route}/?cat=Accesorios">Accesorios</a>
            ${createProd}
            <a href="/${route}">HOME</a>
        </nav>
        ${catTitle}
    `;
    return html;
}
// - - - - - - - - - PRODUCT DETAILS - - - - - - - - - 
function getProductDetails(product,admin){
    let adminDetails = '';
    let html = '<main>';

    const sizes = product.size;
    let sizesDom ='';

    if(sizes)sizes.forEach(s => sizesDom += `${s} `);

        
    if(admin)
        adminDetails=`
            <button class="cardButtons" onclick="location.href='/dashboard/${product._id}/edit';">
                Modificar
            </button>
            <form onsubmit="return confirm('Seguro que quieres borrarlo?')" action="/dashboard/${product._id}/delete" method="POST">
                <input type="hidden" name="_method" value="DELETE">
                <input class="cardButtons" type="submit" value="Eliminar">
            </form>   
        `;

    html += `
        <div class="product-detaill">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <h3>${product.category}</h3>
        <p>${product.price}€</p>
        <p>${product.description}</p>
        <p>${sizesDom}</p>
        ${adminDetails}
        </div>
    `;
    

    html += '</main>';
    return html;
}
// - - - - - - - - - PRODUCT CARDS - - - - - - - - - 
function getProductCards(products,admin) {
    let adminDetails = '';
    let details = 'products';
    let html = '<main>';

    for (let product of products) {
        
        if(admin){
            details = 'dashboard';
            adminDetails=`
                <button class="cardButtons" onclick="location.href='/dashboard/${product._id}/edit';">
                    Modificar
                </button>
                <form action="/dashboard/${product._id}/delete" method="POST">
                    <input type="hidden" name="_method" value="DELETE">
                    <input class="cardButtons" type="submit" value="Eliminar">
                </form>   
            `;
        }

        html += `
            <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <a class="cardButtons" href="/${details}/${product._id}">Ver detalle</a>
            ${adminDetails}
            </div>
        `;
    }

    html += '</main>';
    return html;
}
// - - - - - - - - - CREATE FORM - - - - - - - - - 
function getCreateForm(){
    const html = `
        <form class="formAdmin" action="/dashboard" method="post">
            <label for="name">Nombre producto :</label><br>
            <input type="text" id="name" name="name" value="Gorrocóptero" required><br>
            
            <label for="description">Descripción :</label><br>
            <textarea id="description" name="description">
                Breve descripción del producto...
            </textarea><br>
            
            <label for="category">Categoría :</label><br>
            <input list="category" name="category" required>
            <datalist id="category">
                <option value="Camisetas">
                <option value="Pantalones">
                <option value="Zapatos">
                <option value="Accesorios">
            </datalist><br>

            <input type="checkbox" id="sizeXS" name="sizeXS" value="XS">
            <label for="sizeXS"> XS</label><br>
            <input type="checkbox" id="sizeS" name="sizeS" value="S">
            <label for="sizeS"> S</label><br>
            <input type="checkbox" id="sizeM" name="sizeM" value="M">
            <label for="sizeM"> M</label><br>
            <input type="checkbox" id="sizeLS" name="sizeLS" value="LS">
            <label for="sizeLS"> LS</label><br>
            <input type="checkbox" id="sizeXL" name="sizeXL" value="XL">
            <label for="sizeXL"> XL</label><br>

            <label for="price">Precio :</label>
            <input type="number" id="price" name="price" step=".01" required>

            <br>
            
            <input class="cardButtons" type="submit" value="Crear">
        </form>
    `;
    
    return html;
}
// - - - - - - - - - UPDATE FORM - - - - - - - - - 
function getUpdateForm(product,id){
    let XS,S,M,LS,XL = '';
    if(product.size.includes('XS'))XS = 'checked';
    if(product.size.includes('S'))S = 'checked';
    if(product.size.includes('M'))M = 'checked';
    if(product.size.includes('LS'))LS = 'checked';
    if(product.size.includes('XL'))XL = 'checked';

    const html = `
        <form class="formAdmin" action="../${id}" method="post">
        <input type="hidden" name="_method" value="PUT">
            <label for="name">Nombre producto :</label><br>
            <input type="text" id="name" name="name" value="${product.name}" required><br>
            
            <label for="description">Descripción :</label><br>
            <textarea id="description" name="description">
                ${product.description}
            </textarea><br>
            
            <label for="category">Categoría :</label><br>
            <input list="category" name="category" value="${product.category}" required>
            <datalist id="category">
                <option value="Camisetas">
                <option value="Pantalones">
                <option value="Zapatos">
                <option value="Accesorios">
            </datalist><br>

            <input type="checkbox" id="sizeXS" name="sizeXS" value="XS" ${XS}>
            <label for="sizeXS"> XS</label><br>
            <input type="checkbox" id="sizeS" name="sizeS" value="S" ${S}>
            <label for="sizeS"> S</label><br>
            <input type="checkbox" id="sizeM" name="sizeM" value="" ${M}>
            <label for="sizeM"> M</label><br>
            <input type="checkbox" id="sizeLS" name="sizeLS" value="LS" ${LS}>
            <label for="sizeLS"> LS</label><br>
            <input type="checkbox" id="sizeXL" name="sizeXL" value="XL" ${XL}>
            <label for="sizeXL"> XL</label><br>

            <label for="price">Precio :</label>
            <input type="number" id="price" name="price" value="${product.price}" step=".01" required>

            <br>
            
            <input class="cardButtons" type="submit" value="Actualizar">
        </form>
    `;
    
    return html;
}

module.exports = {
    baseHtmlHead,
    baseHtmlFoot,
    getNavBar,
    getProductDetails,
    getProductCards,
    getCreateForm,
    getUpdateForm
}