CREATE DATABASE EVENTO_ROBOTICA;
DROP DATABASE EVENTO_ROBOTICA;
USE EVENTO_ROBOTICA;

CREATE TABLE CUENTAS(
	ID_CUENTA INT PRIMARY KEY AUTO_INCREMENT,
    CORREO VARCHAR(100),
    CONTRASENA VARCHAR(100),
    PUESTO VARCHAR(30)
);

CREATE TABLE INSTITUCION(
	NOMBRE_INSTITUCION VARCHAR(200),
    NIVEL VARCHAR(200),
    DIRECCION VARCHAR(500),
    ID_CUENTA INT,
    PRIMARY KEY(NOMBRE_INSTITUCION,NIVEL),
    CONSTRAINT FK_INSTITUCION_CUENTA FOREIGN KEY(ID_CUENTA) REFERENCES CUENTAS(ID_CUENTA)
);

CREATE TABLE CRITERIOS(
	CODIGO_CRITERIO INT PRIMARY KEY ,
    PUNTOS_TOTALES INT
);

CREATE TABLE CATEGORIA(
	ID_CATEGORIA INT PRIMARY KEY AUTO_INCREMENT,
    TIPO VARCHAR(100)
);

CREATE TABLE CONSTRUCCION(
	CODIGO_CONSTRUCCION INT PRIMARY KEY AUTO_INCREMENT,
    VELOCIDAD INT,
    SENSORES VARCHAR(70),
    ESTABILIDAD VARCHAR(50),
    PROTOTIPO VARCHAR(50),
    CODIGO_CRITERIO INT,
    CONSTRAINT FK_CONSTRUCCION_CRITERIO FOREIGN KEY(CODIGO_CRITERIO) REFERENCES CRITERIOS(CODIGO_CRITERIO)
);

CREATE TABLE PROGRAMACION(
	CODIGO_PROGRAMACION INT PRIMARY KEY AUTO_INCREMENT,
    SOFTWARE VARCHAR(50),
    COMPLEJIDAD VARCHAR(100),
    CODIGO_EFICIENTE VARCHAR(50),
    MANIPULACION VARCHAR(70),
    DOCUMENTACION VARCHAR(70),
    DEMOSTRACION VARCHAR(70),
    CODIGO_CRITERIO INT,
    CONSTRAINT FK_PROGRAMACION_CRITERIO FOREIGN KEY(CODIGO_CRITERIO) REFERENCES CRITERIOS(CODIGO_CRITERIO)
);

CREATE TABLE DISEÑO(
	CODIGO_DISEÑO INT PRIMARY KEY AUTO_INCREMENT,
    PRESENTACION VARCHAR(100),
    REDACCION VARCHAR(50),
    NOMBRE VARCHAR(70),
    MEDIO_DIGITAL VARCHAR(70),
    DIAGRAMAS VARCHAR(70),
     CODIGO_CRITERIO INT,
    CONSTRAINT FK_DISEÑO_CRITERIO FOREIGN KEY(CODIGO_CRITERIO) REFERENCES CRITERIOS(CODIGO_CRITERIO)
);

CREATE TABLE JUECES(
	CODIGO_JUECES INT PRIMARY KEY AUTO_INCREMENT,
    ID_CATEGORIA INT,
    NOMBRE VARCHAR(100),
    INSTITUCION VARCHAR(50),
    NIVEL VARCHAR(50),
    ID_CUENTA INT,
    CONSTRAINT FK_JUEZ_CUENTA FOREIGN KEY(ID_CUENTA) REFERENCES CUENTAS(ID_CUENTA),
    CONSTRAINT FK_JUECES_CATEGORIA FOREIGN KEY(ID_CATEGORIA) REFERENCES CATEGORIA(ID_CATEGORIA)
);

CREATE TABLE TIENE(
	CODIGO_JUECES INT,
    CODIGO_CRITERIO INT,
    PRIMARY KEY(CODIGO_JUECES,CODIGO_CRITERIO),
    CONSTRAINT FK_TIENE_JUECES FOREIGN KEY(CODIGO_JUECES) REFERENCES JUECES(CODIGO_JUECES),
    CONSTRAINT FK_TIENE_CRITERIOS FOREIGN KEY(CODIGO_CRITERIO) REFERENCES CRITERIOS(CODIGO_CRITERIO)
);

CREATE TABLE EVENTO(
	CODIGO_EVENTO INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(60),
	ZONA VARCHAR(70),
	FECHA DATE,
	EQUIPOS INT
);

CREATE TABLE CALIFICA(
	CODIGO_EVENTO INT,
    CODIGO_JUECES INT,
    PRIMARY KEY(CODIGO_EVENTO,CODIGO_JUECES),
    CONSTRAINT FK_CALIFICA_EVENTO FOREIGN KEY(CODIGO_EVENTO) REFERENCES EVENTO(CODIGO_EVENTO),
    CONSTRAINT FK_CALIFICA_JUECES FOREIGN KEY(CODIGO_JUECES) REFERENCES JUECES(CODIGO_JUECES)
);

CREATE TABLE ASESOR(
	ID_ASESOR INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(100),
    ID_CUENTA INT,
    NIVEL VARCHAR(100),
    CONSTRAINT FK_ASESOR_CUENTA FOREIGN KEY(ID_CUENTA) REFERENCES CUENTAS(ID_CUENTA)
);

CREATE TABLE EQUIPO(
	CODIGO_EQUIPO INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(200),
    ID_ASESOR INT,
    PUNTOS INT,
    ID_CATEGORIA INT,
    NOMBRE_INSTITUCION VARCHAR(200),
    NIVEL VARCHAR(200),
    CONSTRAINT FK_EQUIPO_CATEGORIA FOREIGN KEY(ID_CATEGORIA) REFERENCES CATEGORIA(ID_CATEGORIA),
    CONSTRAINT FK_EQUIPO_INSTITUCION FOREIGN KEY(NOMBRE_INSTITUCION,NIVEL) REFERENCES INSTITUCION(NOMBRE_INSTITUCION,NIVEL),
    CONSTRAINT FK_EQUIPO_ASESOR FOREIGN KEY(ID_ASESOR) REFERENCES ASESOR(ID_ASESOR)
);

CREATE TABLE EVALUA(
	CODIGO_JUECES INT,
	CODIGO_EQUIPO INT,
	PRIMARY KEY(CODIGO_JUECES,CODIGO_EQUIPO),
	CONSTRAINT FK_EVALUA_JUECES FOREIGN KEY(CODIGO_JUECES) REFERENCES JUECES(CODIGO_JUECES),
	CONSTRAINT FK_EVALUA_EQUIPO FOREIGN KEY(CODIGO_EQUIPO)REFERENCES EQUIPO(CODIGO_EQUIPO) 
);

CREATE TABLE PARTICIPANTES(
	NUMERO_ESCOLAR INT PRIMARY KEY,
    NOMBRE VARCHAR(200),
    EDAD INT,
    CODIGO_EQUIPO INT,
    ID_CUENTA INT,
    CONSTRAINT FK_PARTICIPANTE_CUENTA FOREIGN KEY(ID_CUENTA) REFERENCES CUENTAS(ID_CUENTA),
    CONSTRAINT FK_PARTICIPANTES_EQUIPO FOREIGN KEY(CODIGO_EQUIPO) REFERENCES EQUIPO(CODIGO_EQUIPO)
);

CREATE TABLE PROYECTO(
	CODIGO_PROYECTO INT PRIMARY KEY AUTO_INCREMENT,
    DESCRIPCION VARCHAR(300),
    NOMBRE VARCHAR(200),
    ESTADO VARCHAR(200),
    CODIGO_EQUIPO INT,
    CONSTRAINT FK_PROYECTO_EQUIPO FOREIGN KEY(CODIGO_EQUIPO) REFERENCES EQUIPO(CODIGO_EQUIPO)
);
CREATE TABLE INVOLUCRADAS(
	CODIGO_EVENTO INT,
    NOMBRE_INSTITUCION VARCHAR(200),
    NIVEL VARCHAR(200),
    PRIMARY KEY(CODIGO_EVENTO,NOMBRE_INSTITUCION,NIVEL),
    CONSTRAINT FK_INVOLUCRADAS_EVENTO FOREIGN KEY(CODIGO_EVENTO) REFERENCES EVENTO(CODIGO_EVENTO),
    CONSTRAINT FK_INVOLUCRADAS_INSTIUCION FOREIGN KEY(NOMBRE_INSTITUCION,NIVEL) REFERENCES INSTITUCION(NOMBRE_INSTITUCION,NIVEL)
);


INSERT INTO CATEGORIA(TIPO) VALUES('Primaria'),('Secundaria'),('Preparatoria'),('Universidad');
-- Super usuario 
create user 'superusuario'@'localhost' identified by 'evento';
grant select,update,insert,delete on evento_robotica.* to 'superusuario'@'localhost';
drop user 'superusuario'@'localhost';

-- Juez
create user 'juez'@'localhost' identified by 'juezEvento';
grant select on evento_robotica.califica to 'juez'@'localhost';
grant select,insert,update on evento_robotica.construccion to 'juez'@'localhost';
grant select,update,insert on evento_robotica.programacion to 'juez'@'localhost';
grant select,insert on evento_robotica.evalua to 'juez'@'localhost';
grant select on evento_robotica.criterios to 'juez'@'localhost';
grant select, update,insert on evento_robotica.diseño to 'juez'@'localhost';
grant select on evento_robotica.equipo to 'juez'@'localhost';
grant select on evento_robotica.proyecto to 'juez'@'localhost';
drop user 'juez'@'localhost';

-- Institucion
create user 'institucion'@'localhost' identified by 'institucionEvento';
grant select,insert on evento_robotica.equipo to 'institucion'@'localhost';
grant insert,delete on evento_robotica.participantes to 'institucion'@'localhost';
grant select,insert on evento_robotica.proyecto to 'institucion'@'localhost';
drop user 'institucion'@'localhost';

-- Asesor
create user 'asesor'@'localhost' identified by 'asesorEvento';
grant select on evento_robotica.participantes to 'asesor'@'localhost';
grant select on evento_robotica.proyecto to 'asesor'@'localhost';
drop user 'asesor'@'localhost';

-- Participante
create user 'participante'@'localhost' identified by 'partEvento';
grant select on evento_robotica.proyecto to 'participante'@'localhost';
grant select,update on evento_robotica.participantes to 'participante'@'localhost';
grant select on evento_robotica.equipo to 'participante'@'localhost';
drop user 'participante'@'localhost';

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE INICIAR_SESION(CORREO_INI VARCHAR(100),CONTRASENA_INI VARCHAR(100))
BEGIN
	SELECT PUESTO,ID_CUENTA FROM CUENTAS WHERE CORREO=CORREO_INI AND CONTRASENA=CONTRASENA_INI;
END//
DELIMITER ;
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE ALTA_EVENTO(NOMBRE_EVE VARCHAR(60),ZONA_EVE VARCHAR(70),DIA DATE,OUT MENSAJE VARCHAR(30))
BEGIN
	IF EXISTS(SELECT 1 FROM EVENTO WHERE NOMBRE=NOMBRE_EVE) THEN
	SET MENSAJE='EXISTE';
	ELSE
	INSERT INTO EVENTO(NOMBRE,ZONA,FECHA) VALUES(NOMBRE_EVE,ZONA_EVE,DIA);
	SET MENSAJE='AGREGADO';
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EVENTO() 
BEGIN
	SELECT CODIGO_EVENTO,NOMBRE,ZONA,DATE_FORMAT(FECHA,'%d-%m-%Y') AS FECHA FROM EVENTO;
END//
DELIMITER ;
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE ALTA_INSTITUCIONES(INST_EVENTO INT,CORREO_INST VARCHAR(100),CONTRASENA_INST VARCHAR(100),NOMBRE_INST VARCHAR(100),NIVEL_INST VARCHAR(100),DIRE VARCHAR(100),OUT MENSAJE VARCHAR(30))
BEGIN
DECLARE CODIGO_CUENTA INT;
	IF EXISTS(SELECT 1 FROM INSTITUCION WHERE NOMBRE_INSTITUCION=NOMBRE_INST AND NIVEL=NIVEL_INST) THEN
		SET MENSAJE='EXI';
    ELSE
		IF EXISTS(SELECT 1 FROM CUENTAS WHERE CORREO=CORREO_INST) THEN
			SET MENSAJE='COR';
        ELSE
			INSERT INTO CUENTAS(CORREO,CONTRASENA,PUESTO) VALUES (CORREO_INST,CONTRASENA_INST,'INSTITUCION');
			SET CODIGO_CUENTA=LAST_INSERT_ID();
			INSERT INTO INSTITUCION(NOMBRE_INSTITUCION,NIVEL,DIRECCION,ID_CUENTA) VALUES(NOMBRE_INST,NIVEL_INST,DIRE,CODIGO_CUENTA);
			INSERT INTO INVOLUCRADAS(CODIGO_EVENTO,NOMBRE_INSTITUCION,NIVEL) VALUES (INST_EVENTO,NOMBRE_INST,NIVEL_INST);
            SET MENSAJE='OK';
		END IF;
    END IF;
END//
DELIMITER ;
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE ALTA_JUECES (CATEGORIA_JUEZ INT,NOMBRE_JUEZ VARCHAR(60),INSTITUCION_JUEZ VARCHAR(100),NIVEL_JUEZ VARCHAR(100),CODIGO_EVE_JUEZ INT
,CORREO_JUEZ VARCHAR(100),CONTRASENA_JUEZ VARCHAR(100),OUT MENSAJE VARCHAR(30))
BEGIN
DECLARE CODIGO_JUEZ INT;
DECLARE CODIGO_CUENTA INT;
	IF EXISTS(SELECT 1 FROM CUENTAS WHERE CORREO=CORREO_JUEZ) THEN
		SET MENSAJE='EXI';
	ELSE
		INSERT INTO CUENTAS(CORREO,CONTRASENA,PUESTO) VALUES(CORREO_JUEZ,CONTRASENA_JUEZ,'JUEZ');
		SET CODIGO_CUENTA=LAST_INSERT_ID();
		INSERT INTO JUECES(ID_CATEGORIA,NOMBRE,INSTITUCION,NIVEL,ID_CUENTA) VALUES(CATEGORIA_JUEZ,NOMBRE_JUEZ,INSTITUCION_JUEZ,NIVEL_JUEZ,CODIGO_CUENTA);
		SET CODIGO_JUEZ=LAST_INSERT_ID();
		INSERT INTO CALIFICA(CODIGO_EVENTO,CODIGO_JUECES) VALUES(CODIGO_EVE_JUEZ,CODIGO_JUEZ);
		SET MENSAJE='OK';
END IF;
END//
DELIMITER ;
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE INSTITUCIONES_EVENTO (CODIGO_EVENTO_E INT)
BEGIN
	SELECT I.NOMBRE_INSTITUCION,I.NIVEL,I.DIRECCION FROM institucion I JOIN INVOLUCRADAS INV ON I.NOMBRE_INSTITUCION=INV.NOMBRE_INSTITUCION JOIN EVENTO E ON INV.CODIGO_EVENTO=E.CODIGO_EVENTO WHERE E.CODIGO_EVENTO=CODIGO_EVENTO_E;
END//
DELIMITER ;
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE AGREGAR_EQUIPO (NOMBRE_EQU VARCHAR(100),ASESOR_EQU VARCHAR(100),CORREO_ASE VARCHAR(100),CONTRASENA_ASE VARCHAR(100),NIVEL_ASE VARCHAR(30),CATEGORIA_EQU INT,IDENT_CUENTA INT,OUT MENSAJE VARCHAR(30))
BEGIN
DECLARE CODIGO_CUENTA INT;
DECLARE CODIGO_ASESOR INT;
	IF EXISTS(SELECT 1 FROM EQUIPO WHERE NOMBRE=NOMBRE_EQU) THEN
		SET MENSAJE='ERR';
	ELSE
		IF EXISTS(SELECT 1 FROM CUENTAS WHERE CORREO=CORREO_ASE) THEN
        SET MENSAJE='COR';
        ELSE
			INSERT INTO CUENTAS(CORREO,CONTRASENA,PUESTO) VALUES(CORREO_ASE,CONTRASENA_ASE,'ASESOR');
			SET CODIGO_CUENTA=LAST_INSERT_ID();
			INSERT INTO ASESOR(ID_CUENTA,NIVEL,NOMBRE) VALUES(CODIGO_CUENTA,NIVEL_ASE,ASESOR_EQU);
			SET CODIGO_ASESOR=LAST_INSERT_ID();
			INSERT INTO EQUIPO(NOMBRE,ID_ASESOR,PUNTOS,ID_CATEGORIA,NOMBRE_INSTITUCION,NIVEL) VALUES(NOMBRE_EQU,CODIGO_ASESOR,NULL,CATEGORIA_EQU,(SELECT I.NOMBRE_INSTITUCION FROM INSTITUCION I JOIN CUENTAS C ON I.ID_CUENTA=C.ID_CUENTA WHERE I.ID_CUENTA=IDENT_CUENTA),
			(SELECT I.NIVEL FROM INSTITUCION I JOIN CUENTAS C ON I.ID_CUENTA=C.ID_CUENTA WHERE I.ID_CUENTA=IDENT_CUENTA));
			SET MENSAJE='OK';
        END IF;
	END IF;
END//
DELIMITER ;
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE AGREGAR_PROYECTO(DESC_PRO VARCHAR(200),NOM_PRO VARCHAR(200),EST_PRO VARCHAR(100),COD_EQU INT)
BEGIN
	INSERT INTO PROYECTO(DESCRIPCION,NOMBRE,ESTADO,CODIGO_EQUIPO) VALUES(DESC_PRO,NOM_PRO,EST_PRO,COD_EQU);
END//
DELIMITER ;
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE AGREGAR_PARTICIPANTES(NUMERO INT,NOMBRE_PAR VARCHAR(300),EDAD_P INT,CORREO_PART VARCHAR(100),CON_PART VARCHAR(100),ID_EQUIPO INT,OUT MENSAJE VARCHAR(30))
BEGIN
	DECLARE CATEGORIA INT;
    DECLARE CODIGO_CUENTA INT;
    SET CATEGORIA=(SELECT ID_CATEGORIA FROM EQUIPO WHERE CODIGO_EQUIPO=ID_EQUIPO);
    
    IF EXISTS(SELECT 1 FROM PARTICIPANTES WHERE NUMERO_ESCOLAR=NUMERO) THEN
		SET MENSAJE='EXIN';
    ELSE
		IF(CATEGORIA=1) THEN
			IF(EDAD_P BETWEEN 5 AND 12) THEN
				IF EXISTS(SELECT 1 FROM CUENTAS WHERE CORREO=CORREO_PART) THEN
					SET MENSAJE='EXIC';
                ELSE
					INSERT INTO CUENTAS(CORREO,CONTRASENA,PUESTO) VALUES(CORREO_PART,CON_PART,'PARTICIPANTE');
					SET CODIGO_CUENTA=LAST_INSERT_ID();
					INSERT INTO PARTICIPANTES(NUMERO_ESCOLAR,NOMBRE,EDAD,CODIGO_EQUIPO,ID_CUENTA) VALUES(NUMERO,NOMBRE_PAR,EDAD_P,ID_EQUIPO,CODIGO_CUENTA);
					SET MENSAJE='OK';
                END IF;
			ELSE
				SET MENSAJE= 'EDAD';
			END IF;
		END IF;    
		IF(CATEGORIA=2) THEN
			IF(EDAD_P BETWEEN 12 AND 15) THEN
				IF EXISTS(SELECT 1 FROM CUENTAS WHERE CORREO=CORREO_PART) THEN
					SET MENSAJE='EXIC';
                ELSE
					INSERT INTO CUENTAS(CORREO,CONTRASENA,PUESTO) VALUES(CORREO_PART,CON_PART,'PARTICIPANTE');
					SET CODIGO_CUENTA=LAST_INSERT_ID();
					INSERT INTO PARTICIPANTES(NUMERO_ESCOLAR,NOMBRE,EDAD,CODIGO_EQUIPO,ID_CUENTA) VALUES(NUMERO,NOMBRE_PAR,EDAD_P,ID_EQUIPO,CODIGO_CUENTA);
					SET MENSAJE='OK';
                END IF;
			ELSE
				SET MENSAJE= 'EDAD';
			END IF;
		END IF;
		IF(CATEGORIA=3) THEN
			IF(EDAD_P BETWEEN 15 AND 18) THEN
				IF EXISTS(SELECT 1 FROM CUENTAS WHERE CORREO=CORREO_PART) THEN
					SET MENSAJE='EXIC';
                ELSE
					INSERT INTO CUENTAS(CORREO,CONTRASENA,PUESTO) VALUES(CORREO_PART,CON_PART,'PARTICIPANTE');
					SET CODIGO_CUENTA=LAST_INSERT_ID();
					INSERT INTO PARTICIPANTES(NUMERO_ESCOLAR,NOMBRE,EDAD,CODIGO_EQUIPO,ID_CUENTA) VALUES(NUMERO,NOMBRE_PAR,EDAD_P,ID_EQUIPO,CODIGO_CUENTA);
					SET MENSAJE='OK';
                END IF;
			ELSE
				SET MENSAJE= 'EDAD';
			END IF;
		END IF;
		IF(CATEGORIA=4) THEN
			IF(EDAD_P BETWEEN 17 AND 25) THEN 
				IF EXISTS(SELECT 1 FROM CUENTAS WHERE CORREO=CORREO_PART) THEN
					SET MENSAJE='EXIC';
                ELSE
					INSERT INTO CUENTAS(CORREO,CONTRASENA,PUESTO) VALUES(CORREO_PART,CON_PART,'PARTICIPANTE');
					SET CODIGO_CUENTA=LAST_INSERT_ID();
					INSERT INTO PARTICIPANTES(NUMERO_ESCOLAR,NOMBRE,EDAD,CODIGO_EQUIPO,ID_CUENTA) VALUES(NUMERO,NOMBRE_PAR,EDAD_P,ID_EQUIPO,CODIGO_CUENTA);
					SET MENSAJE='OK';
                END IF;
			ELSE
				SET MENSAJE= 'EDAD';
			END IF;
		END IF;
    END IF;
END//
DELIMITER ;
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE TABLA_PARTICIPANTES_INS(CODIGO_CUENTA INT,PUESTO VARCHAR(100))
BEGIN
	IF(PUESTO='INSTITUCION') THEN
		SELECT P.NUMERO_ESCOLAR,P.NOMBRE,P.EDAD,E.NOMBRE AS NOMBRE_E  FROM PARTICIPANTES P JOIN EQUIPO E ON P.CODIGO_EQUIPO=E.CODIGO_EQUIPO WHERE E.NOMBRE_INSTITUCION=(SELECT I.NOMBRE_INSTITUCION FROM INSTITUCION I JOIN CUENTAS C ON I.ID_CUENTA=C.ID_CUENTA WHERE I.ID_CUENTA=CODIGO_CUENTA);
    ELSE
		SELECT P.NUMERO_ESCOLAR,P.NOMBRE,P.EDAD,E.NOMBRE AS NOMBRE_E FROM PARTICIPANTES P JOIN EQUIPO E ON P.CODIGO_EQUIPO=E.CODIGO_EQUIPO WHERE E.ID_ASESOR=(SELECT ID_ASESOR FROM ASESOR A JOIN CUENTAS C ON A.ID_CUENTA=C.ID_CUENTA WHERE A.ID_CUENTA=CODIGO_CUENTA);
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EQUIPOS_INSTITUCION (CODIGO_CUENTA INT)
BEGIN
	SELECT * FROM EQUIPO WHERE NOMBRE_INSTITUCION=(SELECT I.NOMBRE_INSTITUCION FROM INSTITUCION I JOIN CUENTAS C ON I.ID_CUENTA=C.ID_CUENTA WHERE I.ID_CUENTA=CODIGO_CUENTA);
END//
DELIMITER ;
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE PROYECTO_INSC(CODIGO_CUENTA INT,PUESTO VARCHAR(100))
BEGIN
	IF(PUESTO='ASESOR') THEN
		SELECT P.CODIGO_PROYECTO,E.NOMBRE AS NOMBRE_EQU,P.NOMBRE,P.ESTADO,P.DESCRIPCION FROM EQUIPO E JOIN PROYECTO P ON E.CODIGO_EQUIPO=P.CODIGO_EQUIPO WHERE E.ID_ASESOR=(SELECT A.ID_ASESOR FROM ASESOR A JOIN CUENTAS C ON A.ID_CUENTA=C.ID_CUENTA WHERE A.ID_CUENTA=CODIGO_CUENTA);
    ELSEIF(PUESTO='PARTICIPANTE') THEN
		SELECT P.CODIGO_PROYECTO,E.NOMBRE AS NOMBRE_EQU,P.NOMBRE,P.ESTADO,P.DESCRIPCION FROM EQUIPO E JOIN PROYECTO P  ON E.CODIGO_EQUIPO=P.CODIGO_EQUIPO JOIN PARTICIPANTES PA ON PA.CODIGO_EQUIPO=E.CODIGO_EQUIPO WHERE PA.ID_CUENTA=CODIGO_CUENTA;
    ELSE 
		SELECT P.CODIGO_PROYECTO,E.NOMBRE AS NOMBRE_EQU,P.NOMBRE,P.ESTADO,P.DESCRIPCION FROM EQUIPO E JOIN PROYECTO P ON E.CODIGO_EQUIPO=P.CODIGO_EQUIPO WHERE E.NOMBRE_INSTITUCION=(SELECT I.NOMBRE_INSTITUCION FROM INSTITUCION I JOIN CUENTAS C ON I.ID_CUENTA=C.ID_CUENTA WHERE I.ID_CUENTA=CODIGO_CUENTA);
    END IF;
END//
DELIMITER ;  
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE EQUIPO_EVENTO(ID_EVENTO INT)
BEGIN
	SELECT E.NOMBRE,A.NOMBRE AS NOMBRE_ASE,C.TIPO,E.NOMBRE_INSTITUCION,E.NIVEL,E.CODIGO_EQUIPO FROM EVENTO EV JOIN INVOLUCRADAS INV ON EV.CODIGO_EVENTO=INV.CODIGO_EVENTO JOIN INSTITUCION I ON INV.NOMBRE_INSTITUCION=I.NOMBRE_INSTITUCION
    JOIN EQUIPO E ON E.NOMBRE_INSTITUCION=I.NOMBRE_INSTITUCION JOIN ASESOR A ON E.ID_ASESOR=A.ID_ASESOR JOIN CATEGORIA C ON E.ID_CATEGORIA=C.ID_CATEGORIA;
END//
DELIMITER ;
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE DETALLES_PROYECTO(PROYECTO INT)
BEGIN
	SELECT PRO.NOMBRE,A.NOMBRE AS NOMBRE_ASE FROM PROYECTO PRO JOIN EQUIPO E ON PRO.CODIGO_EQUIPO=E.CODIGO_EQUIPO JOIN ASESOR A ON E.ID_ASESOR=A.ID_ASESOR WHERE PRO.CODIGO_PROYECTO=PROYECTO;
    SELECT PA.NOMBRE FROM PROYECTO PRO JOIN EQUIPO E ON PRO.CODIGO_EQUIPO=E.CODIGO_EQUIPO JOIN PARTICIPANTES PA ON E.CODIGO_EQUIPO=PA.CODIGO_EQUIPO WHERE PRO.CODIGO_PROYECTO=PROYECTO;
END//
DELIMITER ;
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE PARTICIPANTES_PROYECTO(PROYECTO INT)
BEGIN
	SELECT PA.NOMBRE FROM PROYECTO PRO JOIN EQUIPO E ON PRO.CODIGO_EQUIPO=E.CODIGO_EQUIPO JOIN PARTICIPANTES PA ON E.CODIGO_EQUIPO=PA.CODIGO_EQUIPO WHERE PRO.CODIGO_PROYECTO=PROYECTO;
END//
DELIMITER ;