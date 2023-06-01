import { 
    loginFailure, 
    loginStart, 
    loginSuccess,
    logout,
    getUsersFailure,
    getUsersStart,
    getUsersSuccess,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
    addUserFailure,
    addUserStart,
    addUserSuccess,

 } from './userRedux';
import { publicRequest, userRequest } from '../constants/requestMethods';
import { 
    getProductsFailure, 
    getProductsStart, 
    getProductsSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
    addProductFailure,
    addProductStart,
    addProductSuccess,
} from './productRedux';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
 }

export const logoutUser = async (dispatch) => {
    dispatch(logout());
}
    

export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await publicRequest.get('/users');
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
}

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await userRequest.delete(`/users/${id}`);
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
}

export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await userRequest.put(`/users/${id}`, user);
        dispatch(updateUserSuccess({id, user: res.data}));
    } catch (err) {
        dispatch(updateUserFailure());
    }
}

export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await userRequest.post('/auth/register', user);
        dispatch(addUserSuccess(res.data));
    } catch (err) {
        dispatch(addUserFailure());
    }
}

export const getProducts = async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const res = await publicRequest.get('/products');
        dispatch(getProductsSuccess(res.data));
    } catch (err) {
        dispatch(getProductsFailure());
    }
}
export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
}
export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        const res = await userRequest.put(`/products/${id}`, product);
        dispatch(updateProductSuccess({id, product: res.data}));
    } catch (err) {
        dispatch(updateProductFailure());
    }
}
export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post('/products', product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
}




