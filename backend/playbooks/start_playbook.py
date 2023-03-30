import ansible_runner
import pathlib
import sys

def my_status_handler(data, runner_config):
    status_tracker.append(data['status'])
    print('Status...')
    print(data['status'])
    if data['status'] == "failed":
        sys.exit(f'The installation of {filename} failed. Error occured while executing: {event_tracker[-2]}.')


def my_event_handler(data):
    event_data = data['event_data']
    if event_data.get('name'):
        event_tracker.append(event_data['name'])
        print(event_data['name'])


def main(filename):
    abs_path = pathlib.Path(__file__).parent.resolve()  # get absolute path

    # Define the path to the playbook and inventory files
    playbook_path = f"{abs_path}/{filename}.yml"
    inventory_path = f"{abs_path}/inventory"

    r = ansible_runner.run(private_data_dir='./', playbook=playbook_path, inventory=inventory_path,
                           status_handler=my_status_handler, quiet=True, event_handler=my_event_handler)
    r.s


if __name__ == '__main__':
    # Get the filename from stdin through pyshell.send
    filename = sys.stdin.readlines()[0][:-1]
    status_tracker = []
    event_tracker = []
    main(filename)
