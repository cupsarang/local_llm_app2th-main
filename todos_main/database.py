from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# sqlite 시 설정
'''
# DB_URL = 'sqlite:///todos.sqlite3'

# 데이터베이스에 연결하는 엔진을 생성하는 함수
# engine = create_engine(DB_URL, connect_args={'check_same_thread': False})
'''
# sqlite 시 설정

# mysql 시 설정
from db_env import user, password, host, db_name

# DATABASE_URL=mysql+pymysql://joy:12345678@127.0.0.1:3306/service_db?charset=utf8mb4
DB_URL = f"mysql+pymysql://{user}:{password}@{host}:3306/{db_name}"
engine = create_engine(DB_URL)
# mysql 시 설정

# 데이터베이스와 상호 작용하는 세션을 생성하는 클래스
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# SQLAlchemy의 선언적 모델링을 위한 기본 클래스
Base = declarative_base()