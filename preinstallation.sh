#!/bin/bash


#!/bin/bash

# Function to check if updates are available and perform the upgrade
perform_upgrade() {
    # Check if the package manager command exists
    if command -v $PKG_MANAGER &> /dev/null; then
        # Update package lists
        $PKG_MANAGER update

        # Check if updates are available
        updates=$($PKG_MANAGER outdated | wc -l | xargs)
        if [[ $updates -gt 0 ]]; then
            echo "There are $updates updates available."

            # Prompt user to upgrade
            read -p "Do you want to upgrade the system? (y/n): " choice
            if [[ $choice =~ ^[Yy]$ ]]; then
                echo "Upgrading the system..."
                # Perform system upgrade
                $PKG_MANAGER upgrade
                echo "System upgraded successfully."
            else
                echo "Upgrade canceled."
            fi
        else
            echo "The system is up to date. No updates available."
        fi
    else
        echo "Package manager ($PKG_MANAGER) not found. Please update the system manually."
    fi
}

# Determine the package manager based on the operating system
OS=$(uname -s)
PKG_MANAGER=""

case $OS in
    Linux*)
        PKG_MANAGER=$( command -v apt-get || command -v yum || command -v dnf || command -v zypper )
        ;;
    Darwin*)
        PKG_MANAGER=$( command -v brew )
        ;;
    *)
        echo "Unsupported operating system."
        exit 1
        ;;
esac

perform_upgrade



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