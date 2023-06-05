#!/bin/sh
pip install -r ./prepoznava_obraza/requirements.txt
mkfifo pipe_node_py
mkfifo pipe_py_node