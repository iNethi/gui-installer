import sys, json
from time import sleep

# def read_in():
#     lines = sys.stdin.readlines()
#     return json.loads(lines[0])

def main():

    lines = sys.stdin.readlines()
    data = json.loads(lines[0])

    for key, value in data.items():
        for key, value in data[key].items():
            print(f'{key}: {value}', flush=True)
            sleep(3)

main()