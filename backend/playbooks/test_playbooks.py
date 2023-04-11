
import ansible_runner
import pathlib
import sys


def my_status_handler(data, runner_config):
    print('Status...')
    print(data['status'])


def my_event_handler(data):
    if data.get('event_data'):
        event_data = data['event_data']
        # print(event_data)
        if event_data.get('name'):
            print(event_data['name'])



def main():
    abs_path = pathlib.Path(__file__).parent.resolve()  # get absolute path
    test_server = "test_server_connection"
    system_requirements = "system_requirements"
    traefik = 'traefik'
    wordpress = 'wordpress'

    # Define the path to the playbook and inventory files
    playbook_path = f"{abs_path}/{wordpress}.yml"
    inventory_path = f"{abs_path}/inventory"

    r = ansible_runner.run(private_data_dir='./', playbook=playbook_path, inventory=inventory_path,
                           status_handler=my_status_handler, quiet=False, event_handler=my_event_handler)


if __name__ == '__main__':
    main()