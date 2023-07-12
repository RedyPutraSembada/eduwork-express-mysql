const Product = require('../model/product');
const path = require('path');
//* fungsi di bawah di gunakan jika berurusan dengan file fs(file sistem)
const fs = require('fs');

const index = async (res) => {
    try {
        const result = await Product.findAll();
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}

const store = async (req, res) => {
    const { user_id, name, price, stok, status } = req.body;
    const image = req.file;
    if (image != undefined) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
    }
    let image_url = image == undefined ? null : `http://localhost:3000/public/${image.originalname}`;
    try {
        const result = await Product.create({
            user_id,
            name,
            price,
            stok,
            status,
            image_url
        });
        res.send(result);
    } catch (error) {
        res.send(error)
    }
}

const show = async (req, res) => {
    try {
        const result = await Product.findByPk(req.params.id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}

const update = async (req, res) => {
    const image = req.file;
    let target;
    if (image != undefined) {
        target = path.join(__dirname, '../../uploads', image.originalname);
    }
    const newImage = image == undefined ? null : image.originalname;
    const result = await Product.findByPk(req.params.id);
    const oldUrlImage = result.dataValues.image_url != null ? result.dataValues.image_url.split('public/') : null;
    const oldImage = oldUrlImage != null ? oldUrlImage[1] : null;
    const { user_id, name, price, stok, status } = req.body;
    let image_url;
    if (oldImage != null) {
        if (newImage != null) {
            if (oldImage != newImage) {
                fs.unlink(`uploads/${oldImage}`, () => { });
                fs.renameSync(image.path, target);
                image_url = `http://localhost:3000/public/${image.originalname}`;
                let result = await Product.update({ user_id, name, price, stok, status, image_url }, {
                    where: {
                        id: req.params.id
                    }
                });
                res.send(result);
            }
        } else {
            image_url = `http://localhost:3000/public/${oldImage}`;
            let result = await Product.update({ user_id, name, price, stok, status, image_url }, {
                where: {
                    id: req.params.id
                }
            });
            res.send(result);
        }
    } else {
        if (newImage != null) {
            fs.unlink(`uploads/${oldImage}`, () => { });
            fs.renameSync(image.path, target);
            image_url = `http://localhost:3000/public/${image.originalname}`;
            let result = await Product.update({ user_id, name, price, stok, status, image_url }, {
                where: {
                    id: req.params.id
                }
            });
            res.send(result);
        } else {
            let result = await Product.update({ user_id, name, price, stok, status }, {
                where: {
                    id: req.params.id
                }
            });
            res.send(result);
        }
    }
}

const destroy = async (req, res) => {
    const result = await Product.findByPk(req.params.id);
    const oldUrlImage = result.dataValues.image_url != null ? result.dataValues.image_url.split('public/') : null;
    const oldImage = oldUrlImage != null ? oldUrlImage[1] : null;
    if (oldImage != null) {
        fs.unlink(`uploads/${oldImage}`, () => { });
    }
    try {
        const data = Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            status: "Success",
            message: "Data Berhasil Di Hapus",
            data
        });
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
};