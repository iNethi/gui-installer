#!/bin/bash

# Detect OS
# 1 = LINUX
# 2 = MACOS
myos=1
res=$(echo $OSTYPE)
res3=${res:0:3}
if [ "$res3" = "dar" ]; then
    myos=2
    echo "Operating System discovered: MACOSX"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    echo "export PATH='/usr/local/opt/python/libexec/bin:$PATH'" >> ~/.bash_profile
    brew install python
else
    echo "Operating System discovered: LINUX"
    sudo apt update
    sudo apt-get install python3.11 python3-pip -y
    pip3 install -r ./backend/playbooks/requirements.txt
fi