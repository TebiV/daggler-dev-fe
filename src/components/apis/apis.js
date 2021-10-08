//* ------- LOGIN Y AUTENTICACION
export const apiLogin = `https://sod-daggler-be.herokuapp.com/api/auth/login`;
export const apiVerifyToken = `https://sod-daggler-be.herokuapp.com/api/auth/middleware/verifyToken`;


//* ------- CATEGORIAS Y ALBUMES
//ver todas las categorias
export const apiAllCategory = `https://sod-daggler-be.herokuapp.com/api/category/allCategory`;

//ver todos los albumes de una categoria
export const apiAlbumesCategoria = (categoria) =>  `https://sod-daggler-be.herokuapp.com/api/album/${categoria}`;

//ver data de album en especifico
export const apiAlbumId = (id) => `https://sod-daggler-be.herokuapp.com/api/album/${id}`;

export const apiDeleteAlbumId = (id) => `https://sod-daggler-be.herokuapp.com/api/album/${id}/delete`;

//* ------- ABMC CUPONES
export const apiGetCupones = 'https://sod-daggler-be.herokuapp.com/api/coupon/get';
export const apiCreateCupon = 'https://sod-daggler-be.herokuapp.com/api/coupon/new';
export const apiEditCupon = (albumId) => `https://sod-daggler-be.herokuapp.com/api/coupon/update/${albumId}`
export const apiDeleteCupon = (albumId) => `https://sod-daggler-be.herokuapp.com/api/coupon/update/${albumId}`


//* ------- ABMC CATEGORIAS
export const apiGetCategories = 'https://sod-daggler-be.herokuapp.com/api/category/allCategory';
export const apiCreateCategory = 'https://sod-daggler-be.herokuapp.com/api/category/newcategory';
export const apiEditCategory = (albumId) => `https://sod-daggler-be.herokuapp.com/api/category/${albumId}`;
export const apiDeleteCategory = (albumId) => `https://sod-daggler-be.herokuapp.com/api/category/${albumId}`;


//* ------- ABMC PRECIOS
export const apiGetPrices = 'https://sod-daggler-be.herokuapp.com/api/price';
export const apiCreatePrice = 'https://sod-daggler-be.herokuapp.com/api/price';
export const apiEditPrice = (precioId) => `https://sod-daggler-be.herokuapp.com/api/price/${precioId}`;
export const apiDeletePrice = (precioId) => `https://sod-daggler-be.herokuapp.com/api/price/${precioId}`;

