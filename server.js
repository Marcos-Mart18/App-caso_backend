const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "root",
    database: "bdnoder",
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

// Escuchar el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error('Error no capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada sin manejar:', promise, 'Razón:', reason);
});

// CRUD DE PRODUCTOS
app.get("/api/producto", (req, res) => {
    const sql = "SELECT * FROM producto";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error al obtener productos:", err);
            return res.status(500).send("Error del servidor al obtener productos");
        }
        res.send(result);
    });
});

app.post("/api/producto", (req, res) => {
    const { nombre, precio, cantidad } = req.body;
    const sql = "INSERT INTO producto (nombre, precio, cantidad) VALUES (?, ?, ?)";
    db.query(sql, [nombre, precio, cantidad], (err, result) => {
        if (err) {
            console.error("Error al crear producto:", err);
            return res.status(500).send("Error del servidor al crear producto");
        }
        res.send({ id: result.insertId, nombre, precio, cantidad });
    });
});

app.put("/api/producto/:id", (req, res) => {
    const { nombre, precio, cantidad } = req.body;
    const { id } = req.params;
    const sql = "UPDATE producto SET nombre = ?, precio = ?, cantidad = ? WHERE id_producto = ?";
    db.query(sql, [nombre, precio, cantidad, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar producto:", err);
            return res.status(500).send("Error del servidor al actualizar producto");
        }
        res.send({ id, nombre, precio, cantidad });
    });
});

app.delete("/api/producto/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM producto WHERE id_producto = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar producto:", err);
            return res.status(500).send("Error del servidor al eliminar producto");
        }
        res.send({ message: "Producto eliminado", id });
    });
});

// CRUD DE CLIENTES
app.get("/api/cliente", (req, res) => {
    const sql = "SELECT * FROM cliente";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error al obtener clientes:", err);
            return res.status(500).send("Error del servidor al obtener clientes");
        }
        res.send(result);
    });
});

app.post("/api/cliente", (req, res) => {
    const { nombre, apellido, dni } = req.body;
    const sql = "INSERT INTO cliente (nombre, apellido, dni) VALUES (?, ?, ?)";
    db.query(sql, [nombre, apellido, dni], (err, result) => {
        if (err) {
            console.error("Error al crear cliente:", err);
            return res.status(500).send("Error del servidor al crear cliente");
        }
        res.send({ id: result.insertId, nombre, apellido, dni });
    });
});

app.put("/api/cliente/:id", (req, res) => {
    const { nombre, apellido, dni } = req.body;
    const { id } = req.params;
    const sql = "UPDATE cliente SET nombre = ?, apellido = ?, dni = ? WHERE id_cliente = ?";
    db.query(sql, [nombre, apellido, dni, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar cliente:", err);
            return res.status(500).send("Error del servidor al actualizar cliente");
        }
        res.send({ id, nombre, apellido, dni });
    });
});

app.delete("/api/cliente/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM cliente WHERE id_cliente = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar cliente:", err);
            return res.status(500).send("Error del servidor al eliminar cliente");
        }
        res.send({ message: "Cliente eliminado", id });
    });
});
