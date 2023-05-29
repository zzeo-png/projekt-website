# Website REPO
FERI 2. Letnik - Glavni Projekt

# Navodila za uporabo
## Gradnja
Najprej navigiraj v direktorij z docker-compose.yaml datoteko, nato zaženi komando:
```
docker compose up -d
```
Uporaba -d (detach) priporočena, da komanda ne zaseda terminala.

## Izklapljanje
Enako iz direktorija z docker-compose.yaml zaženi komando:
```
docker compose down
```

## Preverjanje če docker zabojnik deluje
Če zabojnik deluje lahko preverimo s komando:
```
docker ps
```

## Port
Znotraj docker-compose.yaml so definirane translacije portov sledeče:
```
    ports:
      # NodeJS
      - "3001:3001"
      # React
      - "80:3000"
```
Format port_a:port_b nam pove, da želimo port_b iz kontejnerja na naši napravi prevesti v port_a. Se pravi ko dostopamo do spletne strani uporabimo localhost:port_a.

## Za lažji razvoj
Se lahko node strežnik zažene tudi lokalno iz zbirke ./node_server s komando
```
npm run test
```
Za debug je nujen ```nodemon```.

## Android REPO
https://github.com/zzeo-png/projekt-android
