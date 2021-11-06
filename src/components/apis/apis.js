const urlHeroku = 'https://sod-daggler-be.herokuapp.com/api'
const urlTebi = 'http://192.168.0.6:9000/api'
const urlBase = urlHeroku;

//* ------- LOGIN Y AUTENTICACION
export const apiLogin = `${urlBase}/auth/login`;
export const apiVerifyToken = `${urlBase}/auth/middleware/verifyToken`;


//* ------- CATEGORIAS Y ALBUMES

//ver todos los albumes de una categoria
export const apiAlbumesCategoria = (categoria) =>  `${urlBase}/album/${categoria}`;

//ver data de album en especifico
export const apiGetAlbumData = (albumId) => `${urlBase}/album/specificAlbum/${albumId}`;

export const apiDeleteAlbum = (albumId) => `${urlBase}/album/${albumId}/delete`;
export const apiGetPhotosFromAlbum = (albumId) => `${urlBase}/album/${albumId}/photos`;
export const apiDeleteAlbumPhotos = (albumId) => `${urlBase}/album/${albumId}/deletePhotos`


//* ------- ABMC CUPONES
export const apiGetCupones = `${urlBase}/coupon/get`;
export const apiCreateCupon = `${urlBase}/coupon/new`;
export const apiEditCupon = (cuponId) => `${urlBase}/coupon/update/${cuponId}`
export const apiDeleteCupon = (cuponId) => `${urlBase}/coupon/delete/${cuponId}`
export const apiGetCuponById = (cuponId) => `${urlBase}/coupon/getSpecific/${cuponId}`


//* ------- ABMC CATEGORIAS
export const apiGetCategories = `${urlBase}/category/allCategory`;
export const apiCreateCategory = `${urlBase}/category/newcategory`;
export const apiEditCategory = (categoryId) => `${urlBase}/category/${categoryId}`;
export const apiDeleteCategory = (categoryId) => `${urlBase}/category/${categoryId}`;


//* ------- ABMC PRECIOS
export const apiGetPrices = `${urlBase}/price`;
export const apiCreatePrice = `${urlBase}/price`;
export const apiEditPrice = (precioId) => `${urlBase}/price/${precioId}`;
export const apiDeletePrice = (precioId) => `${urlBase}/price/${precioId}`;

