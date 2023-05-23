# Website REPO
FERI 2. Letnik - Glavni Projekt

# Navodila za uporabo
## Gradnja
Najprej navigiraj v direktorij z docker-compose.yaml datoteko, nato zaženi komando:
```docker compose up -d```
Uporaba -d (detach) priporočena, da komanda ne zaseda terminala.

## Izklapljanje
Enako iz direktorija z docker-compose.yaml zaženi komando:
```docker compose down```

## Preverjanje če docker zabojnik deluje
Če zabojnik deluje lahko preverimo s komando:
```docker ps```

## Port
Znotraj docker-compose.yaml je definirana translacija porta sledeča:
```
    ports:
      - "3000:3000"
```
Format port_a:port_b nam pove, da želimo port_a iz kontejnerja na naši napravi prevesti v port_b. Se pravi ko dostopamo do spletne strani uporabimo localhost:port_b.

## Android REPO
https://github.com/zzeo-png/projekt-android
