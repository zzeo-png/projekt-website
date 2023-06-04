#!/bin/sh
pip install -r requirements.txt
mkfifo pipe_node_py
mkfifo pipe_py_node