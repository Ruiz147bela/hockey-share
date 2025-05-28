from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
import models, schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Permitir acceso desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia a tu dominio en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency para obtener sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --------- IMPLEMENTOS ---------
@app.get("/implementos")
def get_implementos(club: str = None, tipo: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Implemento)
    if club:
        query = query.filter(models.Implemento.club == club)
    if tipo:
        query = query.filter(models.Implemento.tipo == tipo)
    return query.all()

@app.get("/implementos/{nombre}")
def get_implemento_por_nombre(nombre: str, db: Session = Depends(get_db)):
    impl = db.query(models.Implemento).filter(models.Implemento.nombre == nombre).first()
    if not impl:
        raise HTTPException(status_code=404, detail="Implemento no encontrado")
    return impl

@app.post("/implementos")
def crear_implemento(implemento: schemas.ImplementoCreate, db: Session = Depends(get_db)):
    nuevo = models.Implemento(**implemento.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# --------- LOGIN ---------
@app.post("/login")
def login(datos: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.Usuario).filter(models.Usuario.email == datos.email, models.Usuario.contraseña == datos.password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return user

# --------- RESEÑAS ---------
@app.get("/resenas")
def get_resenas(id_implemento: int, db: Session = Depends(get_db)):
    return db.query(models.Resena).filter(models.Resena.id_implemento == id_implemento).all()

@app.post("/resenas")
def crear_resena(resena: schemas.ResenaCreate, db: Session = Depends(get_db)):
    nueva = models.Resena(**resena.dict())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva
