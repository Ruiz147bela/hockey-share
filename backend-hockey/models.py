from sqlalchemy import Column, Integer, String
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    email = Column(String(100), unique=True)
    contraseña = Column(String(100))
    rol = Column(String(50))

class Implemento(Base):
    __tablename__ = "implementos"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True)
    descripcion = Column(String(500))
    estado = Column(Integer)
    tipo = Column(String(50))
    pista = Column(String(100))
    imagen_url = Column(String(500))
    contacto = Column(String(200))
    id_usuario = Column(Integer)
    club = Column(String(100))

class Resena(Base):
    __tablename__ = "resenas"
    id = Column(Integer, primary_key=True, index=True)
    id_implemento = Column(Integer)
    id_usuario = Column(Integer)
    contenido = Column(String(500))
