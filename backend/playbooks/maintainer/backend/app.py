import yaml
from flask import Flask, jsonify, request
import docker
from flask_cors import CORS
import subprocess
import os

os.environ['ANSIBLE_HOST_KEY_CHECKING'] = 'False'

SERVICE_MAPPING = {
    'inethi-mysql-keycloak': 'Keycloak Database',
    'inethi-keycloak': 'Keycloak',
    'inethi-nginx-splash': 'Splash Page',
    'inethi-traefikssl': 'Traefik Reverse Proxy',
    'inethi-jellyfin': 'Jellyfin',
    'inethi-wordpress': 'Wordpress',
    'inethi-wordpress-adminer': 'Wordpress Database UI',
    'inethi-wordpress-mariadb': 'Wordpress Database',
    'inethi-user-management': 'User Management',
    'inethi-user-management-mysql': 'User Management Database',
    'inethi-radio': 'iNethi Radio',
    'redis': 'iNethi Radio Database Cache',
    'inethi-peertube': 'PeerTube',
    'inethi-peertube-postgress': 'PeerTube Database',
    'inethi-nextcloud': 'Nextcloud',
    'inethi-nextcloud-mysql': 'Nextcloud Database',
    'inethi-kiwix': 'Kiwix',
    'inethi-radiusdesk': 'Radiusdesk',
    'inethi-radiusdesk-mariadb': 'Radiusdesk Database',
    'inethi-maintainer': 'Maintainer Backend API',
    'inethi-maintainer-front-end': 'Maintainer Web Portal'
}
PASSWORD_PROTECTED_SERVICES = {
    'inethi-nextcloud',
    'inethi-wordpress',
    'inethi-peertube',
    'inethi-keycloak'
}
app = Flask(__name__)
CORS(app)
client = docker.from_env()


@app.route('/')
def hello():
    return 'Hello from the iNethi Updater'


@app.route('/install-service', methods=['POST'])
def install_service():
    env_file_written = False
    ip_address = '10.00.0.22'

    application_name = request.json.get('application_name')

    if not application_name:
        return jsonify({'Error': 'Application cannot be established'}), 400
    if application_name in PASSWORD_PROTECTED_SERVICES:
        password = request.json.get('password')
    else:
        password = "no_password_required"
    if not password:
        return jsonify({'Error': 'Error: password is a required field'}), 400
    username = request.json.get('username')

    if not username:
        return jsonify({'Error': 'Error: Username is a required field'}), 400

    server_password = request.json.get('server_password')

    if not server_password:
        return jsonify({'Error': 'Error: Server password is a required field'}), 400
    if application_name == 'User Management':
        price30Min = int(request.json.get('price30Min'))
        price60Min = int(request.json.get('price60Min'))
        price1Day = int(request.json.get('price1Day'))
        price1Gb = int(request.json.get('price1Gb'))
        if not price30Min and not price60Min and not price1Day and not price1Gb:
            print(price1Gb, price1Day, price60Min, price30Min)
            return jsonify({'Error': 'Error: Please fill in all prices'}), 400
        with open('variables.yml', 'w') as file:
            yaml.dump({'CONF_MASTER_PASSWORD': password, 'PAUM_COST_30': price30Min, 'PAUM_COST_60': price60Min,
                       'PAUM_COST_24': price1Day, 'PAUM_COST_1GB': price1Gb}, file)
        env_file_written = True

    with open('inventory.ini', 'w') as file:
        file.write('[localserver]\n')
        file.write(
            "{} ansible_user='{}' ansible_password='{}' ansible_ssh_common_args='-o StrictHostKeyChecking=no' ansible_become_pass='{}'\n".format(
                ip_address, username, server_password, server_password))

    # Save the password in a yaml file
    if not env_file_written:
        with open('variables.yml', 'w') as file:
            yaml.dump({'CONF_MASTER_PASSWORD': password}, file)
    key = [k for k, v in SERVICE_MAPPING.items() if v == application_name]
    print(key[0])
    playbook_file = f'{key[0]}.yml'
    inventory_file = "inventory.ini"

    # Use the subprocess.run() function to run the Ansible playbook
    cmd = ['ansible-playbook', '-i', inventory_file, playbook_file]
    result = subprocess.run(cmd, capture_output=True)
    print(result)
    if result.returncode == 0:
        return jsonify({'message': application_name + ' has been installed.'}), 200
    else:
        return jsonify({'Error': 'Failed to install ' + application_name}), 500


@app.route('/containers')
def list_containers():
    containers = client.containers.list(all=True)
    running_services = []
    available_services = []
    other_containers = []

    for container in containers:
        if container.status == 'running':
            container_data = {
                'id': container.id,
                'name': container.name,
                'status': container.status,
                'image': container.image.tags,
            }
            service_name = SERVICE_MAPPING.get(container.name, container.name)
            running_services.append(service_name)
        else:
            container_data = {
                'id': container.id,
                'name': container.name,
                'status': container.status,
                'image': container.image.tags
            }
            service_name = SERVICE_MAPPING.get(container.name, container.name)
            other_containers.append(service_name)

    for service in SERVICE_MAPPING.values():
        if service not in running_services and 'Keycloak' not in service and 'Maintain' not in service and 'Traefik' not in service:
            available_services.append(service)

    return jsonify({
        'running_services': running_services,
        'available_services': available_services,
        'other_containers': other_containers
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
