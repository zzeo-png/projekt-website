import os
import stat
from deepface import DeepFace as df
import pandas as pd
import select
import json

IPC_FIFO_NAME_IN = "pipe_node_py"
IPC_FIFO_NAME_OUT = "pipe_py_node"

#Vgrajena meja je 0.6. Nižja cifra je boljše ujemanje.
MEJA_VERIFIKACIJE = 0.52

def opozorilo(str):
    print(f"prepoznava_obraza.py: {str}")

# Moznosti:
#     - unidentified
#     - verified -> identiteta
def verifikacija(slika):
    dfs=""
    try:
        dfs = df.find(img_path = f"./slike/{slika}", db_path = "./shranjene_osebe", distance_metric="euclidean")[0].to_dict('dict')
    except:
        return "unidentified"
        print("Na sliki ni bil najden obraz.")
    
    best_match_index = min(dfs['VGG-Face_euclidean'], key=dfs['VGG-Face_euclidean'].get)
    print("")
    if(dfs['VGG-Face_euclidean'][best_match_index] <= MEJA_VERIFIKACIJE):
        return dfs['identity'][best_match_index]
    return "unidentified"

# Moznosti:
#     - added
#     - rejected
#     - multiple
def dodaj_uporabnika(slika):
    dfs = df.extract_faces(slika)
    match len(dfs):
        case 0:
            return "rejected"
        case 1:
            os.remove("./shranjene_osebe/representations_vgg_face.pkl")
            os.rename(f"./slike/{slika}", f"./shranjene_slike/{slika}")
            return "added"
        case _:
            os.remove(f"./slike/{slika}")
            return "multiple"


def medprocesna_komunikacija():
    try:
        os.mkfifo(IPC_FIFO_NAME_IN)
    except:
        pass

    try:
        os.mkfifo(IPC_FIFO_NAME_OUT)
    except:
        pass

    while True:
        try:
            with open(IPC_FIFO_NAME_IN, 'r') as fifo_in:
                data = fifo_in.read()
                print(data)
        except Exception as error:
            print(error)
        
        node_request = json.loads(data)
        node_response = {"res": ""}
        print(node_request)
        try:
            match node_request['req']:
                case "verify":
                    node_response['res'] = verifikacija(node_request["path"])
                case "add":
                    node_response['res'] = dodaj_uporabnika(node_request["path"])
                case _:
                    node_response['res'] = "unknown"
        except:
            node_response['res'] = "unknown"
        try:
            with open(IPC_FIFO_NAME_OUT, 'w') as fifo_out:
                fifo_out.write(json.dumps(node_response))
        except Exception as error:
            print(error)


if __name__ == "__main__":
    while True:
        try:
            opozorilo("Zaganjanje medprocesne komunikacije.")
            medprocesna_komunikacija()
        except:
            opozorilo("Medprocesna komunikacija je padla.")