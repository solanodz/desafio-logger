// services/cart.service.js
import CartMongoDao from "../dao/cart.mongo.dao.js";
import Exception from "../utils.js";

export default class cartService {
    static async getCarts(query) {
        try {
            return await CartMongoDao.get(query);
        } catch (error) {
            throw new Exception(error.message, error.status);
        }
    }

    static async getOneCart(query) {
        try {
            const cart = await CartMongoDao.getOne(query);
            if (!cart) throw new Exception("No existe el Carrito", 404);
            return cart;
        } catch (error) {
            throw new Exception(error.message, error.status);
        }
    }

    static async getCartById(cid) {
        try {
            const cart = await CartMongoDao.getById(cid);
            if (!cart) throw new Exception("No existe el Carrito", 404);
            return cart;
        } catch (error) {
            throw new Exception(error.message, error.status);
        }
    }

    static async createCart(cartData) {
        try {
            const {
                userId,
                items: [{ pid, quantity }],
            } = cartData;

            const cartExist = await CartMongoDao.getOne({ userId });

            if (!cartExist) throw new Exception("No existe el Carrito", 404);

            if (cartExist) {
                const existingItem = cartExist.items.find((item) => {
                    const id = item.pid._id.toString();
                    return id === pid;
                });

                if (existingItem) {
                    await CartMongoDao.findOneAndUpdate(userId, pid, quantity);
                    console.log("Cantidad actualizada en el carrito");
                    return { message: "Cantidad actualizada en el carrito" };
                } else {
                    cartExist.items.push({ pid, quantity: quantity });
                    await cartExist.save();
                    console.log("Producto agregado al carrito");
                    return { message: "Producto agregado al carrito" };
                }
            } else {
                return await CartMongoDao.create(cartData);
            }
        } catch (error) {
            throw new Exception(error.message, error.status);
        }
    }

    static async updateCartById(uid, data) {
        try {
            const cart = await CartMongoDao.getById(uid);
            if (!cart) throw new Exception("Carrito no encontrado", 401);
            return await CartMongoDao.updateById(uid, data);
        } catch (error) {
            throw new Exception(error.message, error.status);
        }
    }

    static async findOneAndUpdateCart(userId, pid, data) {
        try {
            return await CartMongoDao.findOneAndUpdate(userId, pid, data);
        } catch (error) {
            throw new Exception(error.message, error.status);
        }
    }

    static async deleteCartById(cid) {
        try {
            const cart = await CartMongoDao.getById(cid);
            if (!cart) throw new Exception("Carrito no encontrado", 401);
            return await CartMongoDao.deleteById(cid);
        } catch (error) {
            throw new Exception(error.message, error.status);
        }
    }

    static async findByIdAndUpdateCart(cid, data) {
        try {
            return await CartMongoDao.findByIdAndUpdate(cid, data);
        } catch (error) {
            throw new Exception(error.message, error.status);
        }
    }

    static async deleteOneCart(criterio) {
        try {
            return await CartMongoDao.deleteOne(criterio);
        } catch (error) {
            throw new Exception(error.message, error.status);
        }
    }
}