#!/bin/bash

git push
ssh micropython.pythoncanarias.es "cd ~/micropython2018; git pull"
