from pydantic import BaseModel

class ImplementoCreate(BaseModel):
    nombre: str
    descripcion: str
    estado: int
    tipo: str
    pista: str
    imagen_url: str
    contacto: str
    id_usuario: int
    club: str

class ResenaCreate(BaseModel):
    id_implemento: int
    id_usuario: int
    contenido: str

class LoginRequest(BaseModel):
    email: str
    password: str
