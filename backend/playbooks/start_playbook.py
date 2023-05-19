import configparser
import os
import ansible_runner
import pathlib
import sys

def my_status_handler(data, runner_config):
    status_tracker.append(data['status'])
    print(f"Status: {data['status']}")
    if data['status'] == "failed":
        sys.exit(f'The installation of {filename} failed. Error occured while executing: {event_tracker[-1]}.')


def my_event_handler(data):
    if data.get('event_data'):
        event_data = data['event_data']
        if event_data.get('name'):
            event_tracker.append(event_data['name'])


def main(filename):
    print(f"Python version: {sys.version}")
    abs_path = pathlib.Path(__file__).parent.resolve()  # get absolute path
    parent_dir = os.path.abspath(os.path.join(abs_path, '..'))
    # Define the path to the playbook and inventory files
    playbook_path = f"{abs_path}/{filename}.yml"
    inventory_path = f"{private_dir}/inventory"
    # update the inventory file
    config = configparser.ConfigParser()
    try:
        config.read(os.path.join(private_dir, 'credentials.env'))
        cred_ip_address = config['LOCAL_SERVER']['CRED_IP_ADDRESS'].strip()
        cred_username = config['LOCAL_SERVER']['CRED_USERNAME'].strip()
        cred_password = config['LOCAL_SERVER']['CRED_PASSWORD'].strip()
    except Exception as error:
        print(f"An Ansible related error has occured: {error}")
    # Update the inventory file with the variables
    with open(inventory_path, 'w') as f:
        f.write(
            f"[localserver]\n{cred_ip_address} ansible_user='{cred_username}' ansible_password='{cred_password}' ansible_ssh_common_args='-o StrictHostKeyChecking=no' ansible_become_pass='{cred_password}'\n")

    r = ansible_runner.run(private_data_dir=private_dir, playbook=playbook_path, inventory=inventory_path,
                           status_handler=my_status_handler, quiet=False, event_handler=my_event_handler)


if __name__ == '__main__':
    # Get the filename from stdin through pyshell.send
    args_str = sys.stdin.readlines()[0][:-1]
    args = args_str.split('===')
    private_dir, filename = args[0], args[-1]
    status_tracker = []
    event_tracker = []
    main(filename)
