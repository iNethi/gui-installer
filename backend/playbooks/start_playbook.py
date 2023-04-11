import configparser
import os

import ansible_runner
import pathlib
import sys

def my_status_handler(data, runner_config):
    status_tracker.append(data['status'])
    print('Status...')
    print(data['status'])
    if data['status'] == "failed":
        sys.exit(f'The installation of {filename} failed. Error occured while executing: {event_tracker}.')


def my_event_handler(data):
    if data.get('event_data'):
        event_data = data['event_data']
        # print(event_data)
        if event_data.get('name'):
            event_tracker.append(event_data['name'])
            print(event_data['name'])


def main(filename):
    abs_path = pathlib.Path(__file__).parent.resolve()  # get absolute path
    parent_dir = os.path.abspath(os.path.join(abs_path, '..'))
    # Define the path to the playbook and inventory files
    playbook_path = f"{abs_path}/{filename}.yml"
    inventory_path = f"{abs_path}/inventory"
    # update the inventory file
    config = configparser.ConfigParser()
    try:
        config.read(os.path.join(parent_dir, 'credentials.env'))
        cred_ip_address = config['LOCAL_SERVER']['CRED_IP_ADDRESS'].strip()
        cred_username = config['LOCAL_SERVER']['CRED_USERNAME'].strip()
        cred_password = config['LOCAL_SERVER']['CRED_PASSWORD'].strip()
    except Exception as e:
        print(e)
    # Update the inventory file with the variables
    with open(inventory_path, 'w') as f:
        f.write(
            f"[localserver]\n{cred_ip_address} ansible_user='{cred_username}' ansible_password='{cred_password}' ansible_ssh_common_args='-o StrictHostKeyChecking=no' ansible_become_pass='{cred_password}'\n")

    r = ansible_runner.run(private_data_dir='./', playbook=playbook_path, inventory=inventory_path,
                           status_handler=my_status_handler, quiet=True, event_handler=my_event_handler)


if __name__ == '__main__':
    # Get the filename from stdin through pyshell.send
    filename = sys.stdin.readlines()[0][:-1]
    status_tracker = []
    event_tracker = []
    main(filename)
