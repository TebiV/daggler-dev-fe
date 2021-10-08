const urlHeroku = 'https://sod-daggler-be.herokuapp.com/api'
const urlTebi = 'http://192.168.0.6:9000/api'
const urlBase = urlTebi;

//* ------- LOGIN Y AUTENTICACION
export const apiLogin = `${urlBase}/auth/login`;
export const apiVerifyToken = `${urlBase}/auth/middleware/verifyToken`;


//* ------- CATEGORIAS Y ALBUMES
//ver todas las categorias
export const apiAllCategory = `${urlBase}/category/allCategory`;

//ver todos los albumes de una categoria
export const apiAlbumesCategoria = (categoria) =>  `${urlBase}/album/${categoria}`;

//ver data de album en especifico
export const apiAlbumId = (id) => `${urlBase}/album/${id}`;

export const apiDeleteAlbumId = (id) => `${urlBase}/album/${id}/delete`;

//* ------- ABMC CUPONES
export const apiGetCupones = `${urlBase}/coupon/get`;
export const apiCreateCupon = `${urlBase}/coupon/new`;
export const apiEditCupon = (albumId) => `${urlBase}/coupon/update/${albumId}`
export const apiDeleteCupon = (albumId) => `${urlBase}/coupon/update/${albumId}`


//* ------- ABMC CATEGORIAS
export const apiGetCategories = `${urlBase}/category/allCategory`;
export const apiCreateCategory = `${urlBase}/category/newcategory`;
export const apiEditCategory = (albumId) => `${urlBase}/category/${albumId}`;
export const apiDeleteCategory = (albumId) => `${urlBase}/category/${albumId}`;


//* ------- ABMC PRECIOS
export const apiGetPrices = `${urlBase}/price`;
export const apiCreatePrice = `${urlBase}/price`;
export const apiEditPrice = (precioId) => `${urlBase}/price/${precioId}`;
export const apiDeletePrice = (precioId) => `${urlBase}/price/${precioId}`;

