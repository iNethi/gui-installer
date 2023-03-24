from ansible_runner import Runner, RunnerConfig
import pathlib
import sys


def main():
    abs_path = pathlib.Path(__file__).parent.resolve()  # get absolute path

    filename = sys.stdin.readlines()[0][:-1]

    # Define the path to the playbook and inventory files
    playbook_path = f"{abs_path}/{filename}.yml"
    inventory_path = f"{abs_path}/inventory"

    # Define the Ansible Runner configuration
    runner_config = RunnerConfig(
        inventory=inventory_path,
        private_data_dir="./",
        playbook=playbook_path,
    )

    # Run the playbook with Ansible Runner
    runner_config.prepare()
    runner = Runner(
        config=runner_config,
    )
    runner.run()
    # Print the results
    print(runner.stats)
    print(runner.events)


if __name__ == '__main__':
    main()
