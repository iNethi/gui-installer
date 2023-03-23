import os.path
from ansible_runner import Runner, RunnerConfig


def main():
    # Define the path to the playbook and inventory files
    playbook_path = "peertube.yml"
    inventory_path = "inventory"

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
