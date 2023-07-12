const express = require('express');
const path = require('path');
const logger = require('morgan');
const router = require('./app/routes/routes');
const app = express();

//* memberi tahu dalam mode development
app.use(logger('dev'));
//* agar bisa membaca request body
app.use(express.urlencoded({ extended: true }));
//* agar bisa membaca request json
app.use(express.json());
//* membuat fungsi untuk url agar bisa menampilkan gambar pada web
app.use('/public', express.static(path.join(__dirname, 'uploads')));
//* memanggil fungsi router untuk mencegah url yang di panggil, memanggil ke dalam folder router
app.use('/api/', router);
//* fungsi di bawah intuk mengatur halaman url yang tidak terdaftar
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'failed',
        message: `Resource ${req.originalUrl} Not Found`
    });
});
//* membuat localhost server 3000
app.listen(3000, () => console.log(`Server: http://localhost:3000`));