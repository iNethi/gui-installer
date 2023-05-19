# Check if Chocolatey is installed
if (-not (Get-Command choco.exe -ErrorAction SilentlyContinue)) {
    Write-Output "Chocolatey is not installed."
    Write-Output "Installing Chocolatey..."
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    Write-Output "Chocolatey installed successfully."
} else {
    Write-Output "Chocolatey is already installed."
}


# Check if Python 3 is installed
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Output "Python 3 is not installed."
    Write-Output "Installing Python 3..."
    $url = "https://www.python.org/ftp/python/3.9.7/python-3.9.7-amd64.exe"
    $output = "python-3.9.7-amd64.exe"
    Invoke-WebRequest -Uri $url -OutFile $output
    Start-Process $output -ArgumentList "/quiet InstallAllUsers=1 PrependPath=1" -Wait
    Remove-Item $output
    Write-Output "Python 3 installed successfully."
} else {
    Write-Output "Python 3 is already installed."
}



# Check if pip3 is installed
if (-not (Get-Command pip3 -ErrorAction SilentlyContinue)) {
    Write-Output "pip3 is not installed."
    Write-Output "Installing pip3..."
    # Download and install get-pip.py
    $url = "https://bootstrap.pypa.io/get-pip.py"
    $output = "get-pip.py"
    Invoke-WebRequest -Uri $url -OutFile $output
    # Install pip3 using the downloaded script
    Start-Process "python" -ArgumentList $output -Wait
    Remove-Item $output
    Write-Output "pip3 installed successfully."
} else {
    Write-Output "pip3 is already installed."
}



# Check if Ansible is installed
if (-not (Get-Command ansible -ErrorAction SilentlyContinue)) {
    Write-Output "Ansible is not installed."
    Write-Output "Installing Ansible..."
    choco install -y openssl
    choco install -y ansible
    Write-Output "Ansible installed successfully."
} else {
    Write-Output "Ansible is already installed."
}



# Check if Ansible Runner is installed
if (-not (Get-Command ansible-runner -ErrorAction SilentlyContinue)) {
    Write-Output "Ansible Runner is not installed."
    Write-Output "Installing Ansible Runner..."
    choco install -y ansible-runner
    Write-Output "Ansible Runner installed successfully."
} else {
    Write-Output "Ansible Runner is already installed."
}


# Check if OpenSSH server is installed
if (-not (Get-Command sshd -ErrorAction SilentlyContinue)) {
    Write-Output "OpenSSH server is not installed."
    Write-Output "Installing OpenSSH server..."
    choco install openssh -y
    Write-Output "OpenSSH server installed successfully."
} else {
    Write-Output "OpenSSH server is already installed."
}


# Check if plink is installed
if (-not (Test-Path "C:\Program Files (x86)\PuTTY\plink.exe")) {
    Write-Output "plink is not installed."
    Write-Output "Installing plink..."
    Invoke-WebRequest "https://the.earth.li/~sgtatham/putty/latest/w64/plink.exe" -OutFile "C:\Program Files (x86)\PuTTY\plink.exe"
    Write-Output "plink installed successfully."
} else {
    Write-Output "plink is already installed."
}
