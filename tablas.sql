CREATE DATABASE IF NOT EXISTS hockeyshare CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE hockeyshare;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  contraseña VARCHAR(100) NOT NULL,
  rol ENUM('jugador', 'admin') DEFAULT 'jugador'
);

CREATE TABLE clubes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE implementos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT NOT NULL,
  estado INT NOT NULL CHECK (estado BETWEEN 1 AND 5),
  tipo ENUM('cascos', 'sticks', 'guantes') NOT NULL,
  pista VARCHAR(100),
  imagen_url TEXT,
  contacto VARCHAR(255),
  id_usuario INT,
  id_club INT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_club) REFERENCES clubes(id)
);

CREATE TABLE resenas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_implemento INT NOT NULL,
  id_usuario INT NOT NULL,
  contenido TEXT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_implemento) REFERENCES implementos(id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

INSERT INTO clubes (nombre) VALUES ('Avalancha'), ('Raptors'), ('Rinos');
