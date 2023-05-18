#!/bin/bash

# Function to update system packages
update_packages() {
    # Check if the package manager command exists
    if command -v $PKG_MANAGER &> /dev/null; then
        echo "Updating system packages..."

        # Perform system package update
        case $PKG_MANAGER in
            apt-get)
                sudo $PKG_MANAGER update
                sudo $PKG_MANAGER upgrade -y
                ;;
            yum)
                sudo $PKG_MANAGER update -y
                ;;
            brew)
                brew update
                brew upgrade
                ;;
            *)
                echo "Unsupported package manager ($PKG_MANAGER). Please update the system packages manually."
                exit 1
                ;;
        esac

        echo "System packages updated successfully."
    else
        echo "Package manager ($PKG_MANAGER) not found. Please update the system packages manually."
    fi
}

# Determine the package manager based on the operating system
OS=$(uname -s)
PKG_MANAGER=""

case $OS in
    Linux*)
        if [ -n "$(command -v apt-get)" ]; then
            PKG_MANAGER="apt-get"
        elif [ -n "$(command -v yum)" ]; then
            PKG_MANAGER="yum"
        elif [ -n "$(command -v dnf)" ]; then
            PKG_MANAGER="dnf"
        elif [ -n "$(command -v zypper)" ]; then
            PKG_MANAGER="zypper"
        else
            echo "No supported package manager found on the system."
            exit 1
        fi
        ;;
    Darwin*)
        if [ -n "$(command -v brew)" ]; then
            PKG_MANAGER="brew"
        else
            echo "Homebrew package manager is not installed on the system."
            exit 1
        fi
        ;;
    *)
        echo "Unsupported operating system."
        exit 1
        ;;
esac

update_packages




if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Installing now..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if [[ -n $(command -v apt-get) ]]; then
            sudo apt-get update
            sudo apt-get install -y python3
        elif [[ -n $(command -v dnf) ]]; then
            sudo dnf install -y python3
        elif [[ -n $(command -v yum) ]]; then
            sudo yum install -y python3
        else
            echo "Package manager not found. Please install Python 3 manually."
            exit 1
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        brew install python
    else
        echo "Unsupported operating system: $OSTYPE"
        exit 1
    fi
    echo "Python 3 has been installed."
else
    echo "Python 3 is already installed."
fi



if ! command -v pip3 &> /dev/null; then
    echo "pip3 is not installed. Installing now..."

    if [ "$(uname)" == "Darwin" ]; then
        if ! command -v brew &> /dev/null; then
            echo "Homebrew is not installed. Installing now..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        brew install python
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        if [ -f /etc/os-release ]; then
            . /etc/os-release
            if [ "$ID" == "ubuntu" ] || [ "$ID" == "debian" ]; then
                sudo apt-get update
                sudo apt-get install -y python3-pip
            elif [ "$ID" == "centos" ] || [ "$ID" == "rhel" ]; then
                sudo yum install -y epel-release
                sudo yum install -y python3-pip
            else
                echo "Your operating system is not supported by this script."
                exit 1
            fi
        else
            echo "Your operating system is not supported by this script."
            exit 1
        fi
    else
        echo "Your operating system is not supported by this script."
        exit 1
    fi

    echo "pip3 has been installed."
else
    echo "pip3 is already installed."
fi



if ! command -v ansible &> /dev/null; then
    echo "Ansible is not installed. Installing now..."

    if [ "$(uname)" == "Darwin" ]; then
        if ! command -v brew &> /dev/null; then
            echo "Homebrew is not installed. Installing now..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        brew install ansible
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        if [ -f /etc/os-release ]; then
            . /etc/os-release
            if [ "$ID" == "ubuntu" ] || [ "$ID" == "debian" ]; then
                sudo apt-get update
                sudo apt-get install -y ansible
            elif [ "$ID" == "centos" ] || [ "$ID" == "rhel" ]; then
                sudo yum install -y epel-release
                sudo yum install -y ansible
            else
                echo "Your operating system is not supported by this script."
                exit 1
            fi
        else
            echo "Your operating system is not supported by this script."
            exit 1
        fi
    else
        echo "Your operating system is not supported by this script."
        exit 1
    fi

    echo "Ansible has been installed."
else
    echo "Ansible is already installed."
fi



if ! python3 -c "import ansible_runner" &> /dev/null; then
    echo "ansible-runner is not installed. Installing now..."
    if ! command -v pip3 &> /dev/null; then
        echo "pip3 is not installed. Please install pip3 manually."
        exit 1
    else
        pip3 install ansible-runner
        echo "ansible-runner has been installed."
    fi
else
    echo "ansible-runner is already installed."
fi



if ! command -v sshd &> /dev/null; then
    echo "OpenSSH server is not installed. Installing..."

    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get install openssh-server -y
        sudo apt-get install openssh-server -y
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        sudo systemsetup -setremotelogin on
    fi
    
    echo "OpenSSH server installed successfully."
else
    echo "OpenSSH server is already installed."
fi



if ! command -v sshpass &> /dev/null; then
    echo "sshpass is not installed. Installing now..."

    if [ "$(uname)" == "Darwin" ]; then
        if ! command -v brew &> /dev/null; then
            echo "Homebrew is not installed. Installing now..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        brew install https://raw.githubusercontent.com/kadwanev/bigboybrew/master/Library/Formula/sshpass.rb
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        if [ -f /etc/os-release ]; then
            . /etc/os-release
            if [ "$ID" == "ubuntu" ] || [ "$ID" == "debian" ]; then
                sudo apt-get update
                sudo apt-get install -y sshpass
            elif [ "$ID" == "centos" ] || [ "$ID" == "rhel" ]; then
                sudo yum install -y epel-release
                sudo yum install -y sshpass
            else
                echo "Your operating system is not supported by this script."
                exit 1
            fi
        else
            echo "Your operating system is not supported by this script."
            exit 1
        fi
    else
        echo "Your operating system is not supported by this script."
        exit 1
    fi

    echo "sshpass has been installed."
else
    echo "sshpass is already installed."
fi