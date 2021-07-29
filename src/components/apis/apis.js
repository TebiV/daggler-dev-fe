//* ------- LOGIN Y AUTENTICACION
export const apiLogin = `https://sod-daggler-be.herokuapp.com/api/auth/login`
export const apiVerifyToken = `https://sod-daggler-be.herokuapp.com/api/auth/middleware/verifyToken`


//* ------- CATEGORIAS Y ALBUMES
//ver todas las categorias
export const apiAllCategory = `https://sod-daggler-be.herokuapp.com/api/category/allCategory`

//ver todos los albumes de una categoria
export const apiAlbumesCategoria = (categoria) =>  `https://sod-daggler-be.herokuapp.com/api/album/${categoria}`

//ver data de album en especifico
export const apiAlbumId = (id) => `https://sod-daggler-be.herokuapp.com/api/album/${id}`

