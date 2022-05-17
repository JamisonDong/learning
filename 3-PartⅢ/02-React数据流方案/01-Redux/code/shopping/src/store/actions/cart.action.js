import { createAction } from "redux-actions";


// 1.向服务端发送请求  告诉服务端将哪一个商品添加到购物车中
export const addProductToCart = createAction("addProductToCart")

// 2.将商品添加到本地的购物车数据中 
export const addProductToLocalCart = createAction("addProductToLocalCart")

// 3.向服务端发送请求 获取购物车列表数据
export const loadCarts = createAction("loadCarts")

// 4.将服务端返回的购物车列表数据同步到本地的购物车中
export const saveCarts = createAction("saveCarts")

// 5.向服务器发送请求 告诉服务器我们要删除哪一个商品
export const deleteProductFromCart = createAction("deleteProductFromCart")

// 6.删除本地购物车中商品
export const deleteProductFromLocalCart = createAction("deleteProductFromLocalCart")

// 7.修改服务端商品数量
export const changeServiceProductNumber = createAction("changeServiceProductNumber")

// 8.更新本地商品数量
export const changeLocalProductNumber = createAction("changeLocalProductNumber")