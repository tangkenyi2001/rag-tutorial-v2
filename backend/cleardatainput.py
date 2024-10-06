import os
import shutil

DATA_PATH = "data"

def main():
    try:
        if os.path.exists(DATA_PATH):  # Check if the data directory exists
            shutil.rmtree(DATA_PATH)    # Remove the directory and all its contents
            os.makedirs(DATA_PATH)       # Recreate the data directory
            os.system('python populate_database.py --reset')
            print(f"Cleared data from {DATA_PATH} and recreated the directory.")
        else:
            print(f"{DATA_PATH} does not exist. No action taken.")
    except Exception as e:
        print(f" An error occurred: {e}")

if __name__ == "__main__":
    main()
