import requests
import json
from datetime import datetime

REQ_ENDPOINT = "activity-controller-app.azurewebsites.net/api/reservations"
RSTR = "\033[91m"
GSTR = "\033[92m"
CEND = "\033[0m"

def validateTime(date, time):
    #Parsing datetime string to a datetime object and checking its validity. 
    try:
        datetimeObject = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
        return datetimeObject.strftime("%Y-%m-%dT%H:%M:%S")
    except ValueError:
        print(RSTR + "Invalid date and/or time format. Use YYYY-MM-DD for dates, HH:MM on starting and ending time." + CEND)

def makeReservation():
    title = input("Input title: ")
    user = input("Input name: ")
    description = input("Input description: ")
    date = input("Input date for reservation (YYYY-MM-DD): ")
    startTime = input("Input starting time for reservation (HH:MM): ")
    endTime = input("Input ending time for reservation (HH:MM): ")

    startDateTime = validateTime(date, startTime)
    if not startDateTime: # Ensuring no bad or nonexisting data is sent
        return
    endDateTime = validateTime(date, endTime)

    if not endDateTime: # Ensuring no bad or nonexisting data is sent
        return
    
    data = {
        "title": title,
        "user": user,
        "description": description,
        "startDateTime": startDateTime,
        "endDateTime": endDateTime
    }

    # dict to json object and sending it to the server endpoint
    response = requests.post(REQ_ENDPOINT, json=data)
    if response.status_code != 200:
        print(RSTR + f"Reservation failed:{CEND} {response.text}")
    else:
        print(GSTR + "Reservation created." + CEND)


def listReservations():
    response = requests.get(REQ_ENDPOINT)
    if response.status_code != 200:
        print(RSTR + f"Failed to list reservations:{CEND} {response.text}")
    else:
        data = json.loads(response.text)
        reservations = data["reservations"]
        for reservation in reservations:
            print("Title:", reservation["title"])
            print("User:", reservation["user"])
            print("Description:", reservation["description"])
            print("Start DateTime:", reservation["startDateTime"])
            print("End DateTime:", reservation["endDateTime"])
            print()


def main():
    while True:
        print("\n1. Make a reservation")
        print("2. List reservations")
        print("3. Exit\n")

        choice = input("Enter choice: ")
        print()

        match choice:
            case "1":
                makeReservation()
            case "2":
                listReservations()
            case "3":
                print("Exiting...\n")
                break
            case _:
                print(RSTR + "Invalid input. Try 1-3." + CEND)

if __name__ == "__main__":
    main()