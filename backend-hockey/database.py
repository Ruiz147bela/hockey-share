from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Reemplaza los valores según tu configuración de RDS:
DB_USER = "admin"
DB_PASS = "tu_contraseña"
DB_HOST = "tu-endpoint-rds.amazonaws.com"
DB_PORT = "3306"
DB_NAME = "hockey"

SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
